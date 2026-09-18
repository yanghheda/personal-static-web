# 基础设施层部署说明（infra）

服务器部署位置：`/opt/infra`。由「边缘 nginx + MySQL + Redis + Qdrant」组成，是所有业务项目共享的基础设施。

## 组件与版本（截至 2026-09）

| 组件   | 镜像                    | 说明                      |
| ------ | ----------------------- | ------------------------- |
| nginx  | `nginx:1.30-alpine`     | 1.30 稳定线，边缘统一入口 |
| MySQL  | `mysql:8.4`             | 8.4 LTS，支持到 ~2032     |
| Redis  | `redis:8-alpine`        | 8.x 最新稳定              |
| Qdrant | `qdrant/qdrant:v1.19.0` | 最新稳定                  |

> 选型原则：选「LTS / 稳定线」而非「创新版」，兼顾多项目长期复用。
> 如需锁死补丁版本，可自行改为如 `mysql:8.4.x`、`redis:8.10-alpine` 的具体 tag。
> 首次部署前建议先 `docker pull` 一遍，确认 tag 真实存在（尤其 `nginx:1.30-alpine`、`qdrant/qdrant:v1.19.0`）：
>
> ```bash
> docker pull nginx:1.30-alpine && docker pull mysql:8.4 && docker pull redis:8-alpine && docker pull qdrant/qdrant:v1.19.0
> ```

## 一、服务器初始化（首次部署，只做一次）

```bash
# 1) 确认 Docker 环境（腾讯云 Docker 镜像自带 29 + Compose v2）
docker --version
docker compose version

# 2) 镜像加速：大陆节点直连 Docker Hub 很慢甚至超时。
#    腾讯云内网镜像源（仅腾讯云机器可用）。先确认已有配置，避免覆盖：
cat /etc/docker/daemon.json 2>/dev/null || echo "（当前无该文件，可直接写入）"
cat > /etc/docker/daemon.json <<'EOF'
{
  "registry-mirrors": ["https://mirror.ccs.tencentyun.com"],
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" }
}
EOF
systemctl daemon-reload && systemctl restart docker

# 3) 装 rsync —— CI 靠它同步静态文件，Ubuntu 镜像不保证预装
apt update && apt install -y rsync

# 4) 时区
timedatectl set-timezone Asia/Shanghai

# 5) 4GB 内存建议加 4G swap，防止 MySQL / Qdrant 峰值被 OOM 杀掉
fallocate -l 4G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
free -h
```

## 二、创建 CI 部署用户（首次部署，只做一次）

GitHub Actions 用 `deploy` 用户 SSH 登录（**不要用 root**）。本地先生成一对专用密钥：

```bash
# 本地执行（不要在服务器上生成，私钥只留在你电脑里）
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/yjxai_deploy -N ""
cat ~/.ssh/yjxai_deploy.pub
```

然后在服务器上：

```bash
# 1) 建用户 + 装公钥（<公钥内容> 换成上面 cat 的输出）
useradd -m -s /bin/bash deploy
mkdir -p /home/deploy/.ssh && chmod 700 /home/deploy/.ssh
echo '<公钥内容>' > /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh

# 2) 加入 docker 组：CI 需要 docker compose exec 来重载 nginx
usermod -aG docker deploy

# 3) 站点目录：必须 chown，否则 CI 的 rsync 会 Permission denied
mkdir -p /var/www/yjxai
chown -R deploy:deploy /var/www/yjxai
```

> 加入 docker 组等价于 root 权限（能挂载宿主机目录），仅用于你自己的服务器。
> 验证（在本地执行，应输出 `OK`）：
>
> ```bash
> ssh -i ~/.ssh/yjxai_deploy deploy@<服务器IP> 'id && touch /var/www/yjxai/.probe && rm /var/www/yjxai/.probe && echo OK'
> ```

## 三、部署基础设施

```bash
# 1. 上传本目录内容到服务器 /opt/infra（在本地执行，注意末尾斜杠）
ssh root@<服务器IP> 'mkdir -p /opt/infra'
rsync -av deploy/infra/ root@<服务器IP>:/opt/infra/

# 2. 服务器上：进入目录、生成密码文件
ssh root@<服务器IP>
cd /opt/infra
cp .env.example .env
vi .env   # 填入 MYSQL_ROOT_PASSWORD / REDIS_PASSWORD / QDRANT_API_KEY 三个强随机密码
#          生成：openssl rand -base64 24（base64 不含 $，可安全放进 .env）

# 3. 创建共享网络
docker network create infra-net

# 4. 准备静态站点目录（CI 会 rsync 写入）与证书目录
mkdir -p /var/www/yjxai /var/www/certbot
mkdir -p /opt/infra/certbot/conf /opt/infra/certbot/www

# 5. 启动
docker compose up -d

# 6. 查看状态
docker compose ps
docker compose logs -f nginx     # 或 mysql / redis / qdrant
```

## 四、HTTPS 证书（Let's Encrypt，免费）

nginx 容器已占用 80 端口，所以**不能用 certbot 的 standalone 模式**，必须走 **webroot 模式**：
nginx 负责响应 `http://域名/.well-known/acme-challenge/xxx`（目录已挂载为 `/var/www/certbot`），
certbot 往这个目录写验证文件，Let's Encrypt 回访读取。

前置条件：域名 A 记录已解析到本机、**已完成 ICP 备案**（大陆节点必须，否则验证请求会被拦截）。

```bash
# 1) 签发（nginx 必须先跑着；把邮箱换成你自己的）
cd /opt/infra
docker run --rm \
  -v /opt/infra/certbot/conf:/etc/letsencrypt \
  -v /opt/infra/certbot/www:/var/www/certbot \
  certbot/certbot certonly \
  --webroot -w /var/www/certbot \
  -d yjxai.cloud -d www.yjxai.cloud \
  --email <你的邮箱> --agree-tos --no-eff-email

# 成功后会生成：
#   /opt/infra/certbot/conf/live/yjxai.cloud/fullchain.pem
#   /opt/infra/certbot/conf/live/yjxai.cloud/privkey.pem
```

```bash
# 2) 启用 443：编辑 nginx/conf.d/yjxai.cloud.conf
#    a) 取消文件末尾「HTTPS 入口」整段 server 块的注释
#    b) 把 80 块里 location / 的 try_files 那行换成：
#         return 301 https://$host$request_uri;
#       （并删除 80 块里的 location /assets/ 和 location = /index.html，跳转后不再需要）
#    c) 保留 80 块的 ACME location，否则续期会失败
docker compose exec nginx nginx -t          # 先验语法，通过再 reload
docker compose exec nginx nginx -s reload
```

```bash
# 3) 自动续期：Let's Encrypt 证书 90 天有效，certbot 会在到期前 30 天自动续
crontab -e   # root 的 crontab，加一行（每天凌晨 3 点尝试续期并重载 nginx）
0 3 * * * cd /opt/infra && docker run --rm -v /opt/infra/certbot/conf:/etc/letsencrypt -v /opt/infra/certbot/www:/var/www/certbot certbot/certbot renew --webroot -w /var/www/certbot --quiet && docker exec infra-nginx nginx -s reload

# 演练一次，确认续期链路通（不会真的续期）
docker run --rm -v /opt/infra/certbot/conf:/etc/letsencrypt -v /opt/infra/certbot/www:/var/www/certbot certbot/certbot renew --webroot -w /var/www/certbot --dry-run
```

## 五、验证

```bash
docker compose ps                                                      # 四个容器都应为 running / healthy
docker compose exec mysql mysql -uroot -p"$MYSQL_ROOT_PASSWORD" -e "SELECT VERSION();"
docker compose exec redis redis-cli -a "$REDIS_PASSWORD" ping          # 返回 PONG
curl -s http://127.0.0.1/                                              # nginx 返回页面
docker compose exec qdrant curl -s http://127.0.0.1:6333/healthz       # 返回 ok
docker compose exec nginx nginx -t                                     # 配置语法检查
```

## 六、对接 GitHub Actions（让 CI 能 rsync + reload）

仓库 Settings → Secrets and variables → Actions，配置：

| Secret            | 值                                                  |
| ----------------- | --------------------------------------------------- |
| `SSH_HOST`        | 服务器公网 IP                                       |
| `SSH_USER`        | `deploy`                                            |
| `SSH_PRIVATE_KEY` | 本地 `~/.ssh/yjxai_deploy` 的**完整内容**（含头尾） |
| `SSH_PORT`        | 可选，默认 22                                       |
| `DEPLOY_PATH`     | `/var/www/yjxai`                                    |

依赖已由「第二节」的 `usermod -aG docker deploy` 和 `chown /var/www/yjxai` 满足。

## 七、防火墙

腾讯云控制台 → 轻量应用服务器 → 实例 → 「防火墙」标签页 → 添加规则，放行：`22`、`80`、`443`（协议 TCP，来源 `0.0.0.0/0`，策略「允许」）。

**不要放行** `3306` / `6379` / `6333` / `2375` —— 这些服务只走 Docker 内网。

> 云防火墙只是「门开不开」，服务器上还得真有服务在监听才通。配完 80/443 仍然访问不了是正常的，部署完 infra 才会通。

## 八、以后新增业务项目怎么接入

新项目放独立目录（如 `/opt/forgeai`），写自己的 `docker-compose.yml`，关键是**挂到 `infra-net` 并声明网络别名**：

```yaml
# /opt/forgeai/docker-compose.yml（示例）
services:
  backend:
    image: your/backend:latest
    networks:
      infra-net:
        aliases:
          - forgeai-backend # 边缘 nginx 可用 http://forgeai-backend:8080 反代
networks:
  infra-net:
    external: true # 复用已有的共享网络
```

业务容器可直接连 `mysql:3306`、`redis:6379`、`qdrant:6333`（密码从各自 `.env` 注入）。
建议每个项目自建数据库账号，不要直接复用 root。

## 九、备份

数据都在 named volume（`mysql_data` / `redis_data` / `qdrant_data`）里：

```bash
# 备份 MySQL
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup.sql
```

## 十、注意事项

- `.env` 含密码，**不要提交到 git**；仓库里只保留 `.env.example`。
- 4GB 内存下本套基础设施空载约占用数百 MB，余量充足；跑重负载时再调优。
- 升级镜像：改 tag 后 `docker compose pull && docker compose up -d`。
- 日志已统一限制（单文件 10MB × 3 个），不会涨满磁盘。
- 证书目录 `certbot/conf` 含私钥，注意权限与备份。
