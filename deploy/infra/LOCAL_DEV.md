# 本地共享基础设施接入说明（LOCAL_DEV）

本机已有一套所有项目共用的本地基础设施（Docker），当前已在运行。
**新项目直接复用，不要再自己起 MySQL / Redis / Qdrant。**

本文档可以直接整份交给另一个项目/另一个会话的 AI，让它按此接入。

---

## 一、位置与启动

| 项 | 值 |
| --- | --- |
| 编排文件 | `/Users/ruicheng/Documents/code/personal-static-web/deploy/infra/docker-compose.local.yml` |
| 运行中的容器 | `infra-mysql` / `infra-redis` / `infra-qdrant` |
| 共享网络 | `infra-net`（已存在） |

重新启动（例如重启电脑后，Docker Desktop 未设置开机自启）：

```bash
cd /Users/ruicheng/Documents/code/personal-static-web/deploy/infra
docker compose -f docker-compose.local.yml up -d
docker compose -f docker-compose.local.yml ps
```

停止（数据在 named volume 里，不会丢）：

```bash
cd /Users/ruicheng/Documents/code/personal-static-web/deploy/infra
docker compose -f docker-compose.local.yml down
```

## 二、密码

读 `/Users/ruicheng/Documents/code/personal-static-web/deploy/infra/.env`：

- `MYSQL_ROOT_PASSWORD`
- `REDIS_PASSWORD`
- `QDRANT_API_KEY`

另外有一个本地通用 MySQL 账号：`dev` / `dev123456`
（拥有全库权限，可 `CREATE DATABASE`、建账号、授权；仅本地生效）。

> 若接收方会话被限制在它自己的项目目录、读不到上述文件，
> 由项目负责人把对应值贴给它，或写进该项目自己的 `.env`。

## 三、连接方式

### 1) 项目在宿主机终端启动（IDEA / Spring Boot / pnpm dev）

最常见的情况，直接连回环地址：

| 服务 | 地址 |
| --- | --- |
| MySQL | `127.0.0.1:3306` |
| Redis | `127.0.0.1:6379`（已开 `requirepass`，必须配密码） |
| Qdrant REST / Dashboard | `http://127.0.0.1:6333`，面板 `/dashboard` |
| Qdrant gRPC | `127.0.0.1:6334` |

Spring Boot 示例：

```yaml
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/<本项目库名>?allowPublicKeyRetrieval=true&useSSL=false
    username: <本项目账号>
    password: <密码>
  data:
    redis:
      host: 127.0.0.1
      port: 6379
      password: <REDIS_PASSWORD>
```

Qdrant 请求需带请求头 `api-key: <QDRANT_API_KEY>`。

前端不需要任何改动：浏览器 / vite dev server 不直连数据库，只通过 HTTP 调本机后端接口。

### 2) 项目容器化启动（docker compose）

加入已有的外部网络 `infra-net`，通过服务别名访问：

```yaml
services:
  your-api:
    networks:
      - infra-net

networks:
  infra-net:
    external: true
```

服务名即 `mysql:3306` / `redis:6379` / `qdrant:6333`。

## 四、给项目建库和账号

每个项目建自己的库和账号，不要共用 schema、不要复用 root：

```bash
mysql -h 127.0.0.1 -udev -p'dev123456' -e "
CREATE DATABASE IF NOT EXISTS <库名> DEFAULT CHARACTER SET utf8mb4;
CREATE USER IF NOT EXISTS '<账号>'@'%' IDENTIFIED BY '<密码>';
GRANT ALL PRIVILEGES ON <库名>.* TO '<账号>'@'%';
FLUSH PRIVILEGES;"
```

## 五、隔离要求（必须遵守）

- **MySQL**：每个项目独立 database + 独立账号，禁止跨项目共用 schema 或共用 root。
- **Redis**：每个项目使用独立的 key 前缀。
- **Qdrant**：每个项目使用独立的 collection 前缀。

## 六、注意事项

- 不要启动服务器版 `deploy/infra/docker-compose.yml`：它包含 nginx 边缘入口，
  本机没有 `yjxai.cloud` 证书和 `/var/www/yjxai`，容器会启动失败。
- 端口只绑定在 `127.0.0.1`（回环）：本机进程可访问，同局域网 / 公网访问不到。
- 若项目自带的 compose 里也有独立的 MySQL / Redis 且占用 `3306` / `6379`，
  先停掉它再连这套，两者不能同时启动。直接接入 `infra-net` 共享设施的项目
  （如 `mealmind`）不受影响，它不再自建存储。
- JDBC 连 MySQL 8.4 且未启用 TLS 时，连接串必须带 `allowPublicKeyRetrieval=true`，
  否则报 `Public Key Retrieval is not allowed`。
- 各项目的库和账号需要自行创建，本套基础设施只提供 `dev` 通用账号，不预建任何业务库。

## 七、已实测验证

以下均为在宿主机终端直接验证通过的结果：

| 验证项 | 结果 |
| --- | --- |
| `mysql -h 127.0.0.1 -udev` | `dev@%`，MySQL 8.4.11 |
| `mysql -h 127.0.0.1 -uroot` | `root@%` |
| `redis-cli -h 127.0.0.1 -a <密码> ping` | `PONG` |
| `curl http://127.0.0.1:6333/collections` | `{"status":"ok"}` |
| `dev` 账号建库 / 建账号 / 授权 | 成功 |
| 容器内通过 `mysql` / `redis` / `qdrant` 别名访问 | 成功 |
