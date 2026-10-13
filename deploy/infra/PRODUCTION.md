# 生产环境部署说明（PRODUCTION）

新项目上线到共享服务器时看这份文档。**本文档可以整份交给另一个项目/另一个会话的 AI，让它按此部署。**

前提：服务器上的共享基础设施 `/opt/infra` 已部署并正在运行，本项目**只接入，不部署、不重启、不升级它**。

---

## 一、服务器与现状

| 项 | 值 |
| --- | --- |
| 服务器 | 腾讯云轻量应用服务器，4 核 4GB，Ubuntu 24.04 + Docker 29 |
| 公网 IP | `115.159.84.51` |
| 域名 | `yjxai.cloud`（已 ICP 备案，A 记录已指向服务器） |
| 共享基础设施 | `/opt/infra`，含边缘 nginx + MySQL 8.4 + Redis 8 + Qdrant v1.19.0 |
| 共享网络 | `infra-net`（external，所有项目挂在这张网上） |
| 部署用户 | `deploy`（已加入 docker 组，拥有 `/var/www/yjxai` 与 `/opt/infra`） |
| 部署私钥 | 本地 `~/.ssh/yjxai_deploy`（GitHub Actions 也用同一把） |

线上已确认状态（curl 实测）：

- `http://yjxai.cloud` → `301` → `https://yjxai.cloud` → `200`
- `server: nginx/1.30.5`
- Let's Encrypt 证书有效期至 `2026-12-17`，由 cron 每天 03:00 自动续期

## 二、拓扑（必须先理解）

```
公网 ──► 边缘 nginx（infra-nginx，唯一占用 80/443）
            │
            ├─ 静态项目：直接读 /var/www/<project> 的构建产物
            └─ 容器项目：按 location 反代到 <project>-api:8080
                              │
                    ┌─────────┴──────────┐
                    │   infra-net（共享）  │
                    │  mysql / redis /    │
                    │  qdrant（仅内网）    │
                    └────────────────────┘
```

关键点：

- **MySQL / Redis / Qdrant 不映射宿主机端口**，只在 `infra-net` 内网可达。
- 业务容器**不得映射任何宿主机端口**（80/443 已被 nginx 占用）。
- 云防火墙只放行 `22` / `80` / `443`。

## 三、硬性规则

1. **不要重启或重建 `/opt/infra`**。它是所有项目共用的；重启 MySQL/Redis 会中断全部在线项目。
2. **不要修改共享 MySQL 的 root、不要复用 root 建库**。每个项目独立 database + 独立账号。
3. **不要提交任何密码到 git**。密码只存在于服务器的 `.env`（不提交）与 GitHub Secrets。
4. **不要放行云防火墙的 `3306` / `6379` / `6333` / `2375`**。
5. **不要执行 `docker system prune -a`**，会删掉其它项目的镜像。
6. 二进制/数据只在服务器落地；服务器上不构建源码（CI 构建好镜像再 pull）。
7. 每个项目使用**独立的 Redis key 前缀**与**独立的 Qdrant collection 前缀**。

## 四、目录与命名约定

| 路径 | 用途 | 归属 |
| --- | --- | --- |
| `/opt/infra` | 共享基础设施 | 全局，新项目不改 |
| `/opt/<project>` | 本项目 compose 与 `.env` | 本项目 |
| `/var/www/<project>` | 静态站点构建产物（CI rsync 写入） | 本项目 |
| `/var/www/certbot` | ACME 挑战目录 | 全局，**不要动** |
| `/opt/infra/nginx/conf.d/yjxai.cloud.conf` | 域名入口配置 | 全局，**新项目在此追加 location** |

新项目目录需 `chown deploy:deploy`，否则 CI 的 rsync 会 Permission denied。

## 五、部署方式

### 方式 A：静态站点（本项目 personal-static-web 用的方式）

CI 构建出 `dist/`，rsync 到 `/var/www/<project>`，nginx 直接托管。

1. 服务器建目录：

```bash
ssh root@115.159.84.51
mkdir -p /var/www/<project>
chown -R deploy:deploy /var/www/<project>
```

2. 在 `/opt/infra/nginx/conf.d/yjxai.cloud.conf` 的 443 server 块里加一个站点段（见第六节）。

3. GitHub 仓库配置 Secrets 后，push 到 `main` 即自动部署：

| Secret | 值 |
| --- | --- |
| `SSH_HOST` | `115.159.84.51` |
| `SSH_USER` | `deploy` |
| `SSH_PRIVATE_KEY` | `~/.ssh/yjxai_deploy` 的完整内容（含头尾） |
| `SSH_PORT` | 默认 `22`，可省 |
| `DEPLOY_PATH` | `/var/www/<project>` |

CI 最后一步会 reload nginx 使配置生效：

```bash
ssh deploy@115.159.84.51 "cd /opt/infra && docker compose exec -T nginx nginx -s reload"
```

### 方式 B：容器化应用（forge-ai 用的方式）

CI 构建镜像推到 GHCR，服务器只 pull + up。项目 compose 挂在 `infra-net` 上。

1. 服务器准备目录并放置 compose 文件：

```bash
ssh root@115.159.84.51
mkdir -p /opt/<project>
chown -R deploy:deploy /opt/<project>
# 把项目的 compose.yml 与 .env.example 同步过去（rsync 或 scp）
```

2. 项目 compose 的关键写法：

```yaml
name: <project>

services:
  <project>-api:
    image: ghcr.io/<owner>/<project>-api:${IMAGE_TAG:-latest}
    environment:
      MYSQL_URL: jdbc:mysql://mysql:3306/<project>?useUnicode=true&characterEncoding=utf8
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      REDIS_URL: redis://:${REDIS_PASSWORD}@redis:6379/0
      QDRANT_URL: http://qdrant:6333
    networks:
      infra-net:
        aliases:
          - <project>-api        # 边缘 nginx 用这个别名反代
    restart: unless-stopped
    logging:
      driver: json-file
      options: { max-size: "10m", max-file: "3" }

networks:
  infra-net:
    external: true
```

3. 创建独立数据库与账号（在服务器上执行，MySQL 不对外开放）：

```bash
ssh root@115.159.84.51
cd /opt/infra
# 密码用 openssl rand -base64 24 生成，base64 不含 $，可安全放进 .env
docker compose exec -T mysql mysql -uroot -p"$MYSQL_ROOT_PASSWORD" -e "
CREATE DATABASE IF NOT EXISTS <project> DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '<project>'@'%' IDENTIFIED BY '<强随机密码>';
GRANT ALL PRIVILEGES ON <project>.* TO '<project>'@'%';
FLUSH PRIVILEGES;"
```

> 账号主机必须是 `%`（或 `172.%`），因为业务容器从 Docker 内网连进来，不是 localhost。

4. 在 nginx 加反代（第六节），然后启动项目：

```bash
cd /opt/<project>
docker compose --env-file .env up -d --wait
docker compose ps
```

## 六、接入边缘 nginx

编辑 `/opt/infra/nginx/conf.d/yjxai.cloud.conf`。文件顶部放 upstream，443 server 块里放 location：

```nginx
# 文件顶部（server 块外）
upstream <project>_api {
    server <project>-api:8080;
    keepalive 16;
}
```

```nginx
# 443 server 块内
location /<project>/ {
    proxy_pass http://<project>_api/;
    proxy_http_version 1.1;
    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # SSE / 流式接口必须关闭缓冲，否则前端收不到流式输出
    proxy_buffering off;
    proxy_read_timeout 300s;
}
```

改完**必须验证语法再 reload**，写错会导致所有站点 502/不可用：

```bash
cd /opt/infra
docker compose exec nginx nginx -t          # 必须先通过
docker compose exec nginx nginx -s reload
```

注意事项：

- `location ^~ /.well-known/acme-challenge/` 那段**不要删**，删了证书无法续期。
- 静态站点的 `try_files $uri $uri/ /index.html;` 是 SPA 回退，新项目若是独立域名需另开 server 块。
- 同一域名下的多个项目按子路径区分（如 `/lab/`、`/api/`），端口冲突由容器内网规避。

## 七、首次上线检查清单

```bash
# 1) 基础设施健康（应全部 running/healthy）
cd /opt/infra && docker compose ps

# 2) 本项目容器
cd /opt/<project> && docker compose ps

# 3) 容器内能否连上共享服务
docker compose exec <project>-api <连接测试命令>

# 4) nginx 配置语法
cd /opt/infra && docker compose exec nginx nginx -t

# 5) 从公网访问（在本地执行）
curl -I https://yjxai.cloud/<project>/

# 6) 容器日志
docker logs -f <project>-api
```

## 八、备份与数据

数据都在 named volume（`mysql_data` / `redis_data` / `qdrant_data`）：

```bash
cd /opt/infra
docker compose exec -T mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

只导出本项目：

```bash
docker compose exec -T mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" <project> > <project>-$(date +%F).sql
```

## 九、已知的坑

1. **ACME 挑战目录必须独立于站点根目录**。CI 用 `rsync --delete` 同步站点，挑战文件若放在站点目录里会被每次发版删掉，导致证书续期失败——所以是 `/var/www/certbot`，不是 `/var/www/<project>`。
2. **certbot 续期有"假卡死"**。非交互环境下它会先随机睡 0~8 分钟再动手，只打印一行 `Non-interactive renewal: random delay of ...`，之后长时间无输出属正常设计。手工演练时加 `--no-random-sleep-on-renew`；cron 任务保持默认。
3. **Web 终端里粘贴 heredoc（`<< 'EOF'`）可能因换行被压缩而失败**，改用单行 `echo` 或 `printf`。
4. **服务器 SSH 有登录保护**（本机直连会弹微信扫码）。GitHub Actions 走密钥不受影响；运维时需要人工扫码。
5. **4GB 内存**，基础设施空载约数百 MB；新项目上线前先 `free -h` 看余量，必要时先给 swap 扩容。
6. **证书目录权限**：`certbot/conf` 是 `700 root:root`，`deploy` 用户 `ls` 会 Permission denied 属正常（nginx 容器内是 root，能正常读）。
7. **nginx 容器只读挂载了 conf.d**，容器内 `nginx -s reload` 是生效的，但配置文件要用宿主机编辑器改。

## 十、运维速查

```bash
ssh -i ~/.ssh/yjxai_deploy deploy@115.159.84.51      # 登录（需微信扫码）
docker compose -f /opt/infra/docker-compose.yml ps    # 基础设施状态
docker logs -f infra-nginx                            # 边缘 nginx 日志
docker logs -f infra-mysql                            # 共享 MySQL 日志
cd /opt/<project> && docker compose logs -f           # 本项目日志
fail2ban-client status sshd                           # SSH 封禁情况（需 root）
```

## 十一、与本地开发的关系

本地开发用 `personal-static-web/deploy/infra/docker-compose.local.yml`（不含 nginx），
接入方式见同目录 [LOCAL_DEV.md](./LOCAL_DEV.md)。

两地差异只有两处，项目代码只需保证 host 可配即可：

| 项 | 本地 | 生产 |
| --- | --- | --- |
| 宿主机直连 | `127.0.0.1:3306` | 不通（仅内网） |
| 容器内连接 | `mysql:3306` | `mysql:3306`（相同） |
| 边缘入口 | 无，各跑各的 dev server | 共享 nginx，唯一 80/443 |