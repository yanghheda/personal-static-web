#!/bin/bash
# 本地开发专用：MySQL 数据目录首次初始化时执行，创建「可从宿主机与任意容器连接」的账号。
#
# 只建账号、不建库：各项目的库由项目自己按需 CREATE DATABASE。
# 服务器版 docker-compose.yml 不挂载本目录，线上权限模型不受影响。
#
# 说明：MySQL 官方镜像默认只创建 root@'localhost'，
#       宿主机通过 127.0.0.1:3306 连进来时来源 IP 是 Docker 网关而非 localhost，
#       所以必须额外建 root@'%' 才能用 GUI 客户端（DataGrip / Navicat）连。
set -eu

dev_user="${MYSQL_DEV_USERNAME:-dev}"
dev_password="${MYSQL_DEV_PASSWORD:-dev123456}"

mysql --protocol=socket -uroot -p"${MYSQL_ROOT_PASSWORD}" <<SQL
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY '${MYSQL_ROOT_PASSWORD}';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

CREATE USER IF NOT EXISTS '${dev_user}'@'%' IDENTIFIED BY '${dev_password}';
GRANT ALL PRIVILEGES ON *.* TO '${dev_user}'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
SQL

echo "[infra-local] MySQL 已创建本地开发账号：root@'%' / ${dev_user}@'%'"
