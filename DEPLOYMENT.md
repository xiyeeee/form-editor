# 部署指南

本文档介绍如何将 lemon-form-react 应用部署到阿里云服务器。

## 📋 前置要求

- Docker 和 Docker Compose 已安装
- 已开通阿里云容器镜像服务
- 云服务器安全组已开放 80 端口
- GitHub 仓库已配置相关密钥

## 🚀 快速开始

### 1. 本地测试

```bash
# 构建并启动服务
docker-compose up --build

# 或者直接使用 Docker
docker build -t lemon-form-react .
docker run -p 80:80 lemon-form-react
```

### 2. 服务器部署

```bash
# 克隆代码（或直接下载部署脚本）
git clone <your-repo-url>
cd lemon-form-react

# 运行部署脚本
chmod +x deploy.sh
./deploy.sh [version]

# 示例：部署特定版本
./deploy.sh 1.2.3
```

## 🔄 自动部署流程

### Git 标签触发规则

| 标签格式 | 生成镜像版本 | 示例 |
|---------|-------------|------|
| `release-v1.2.3` | `1.2.3` | `release-v1.2.3` → `my-docker:1.2.3` |
| `v1.2.3` | `1.2.3` | `v1.2.3` → `my-docker:1.2.3` |
| 手动触发 | 自定义版本 | 通过 GitHub Actions 手动指定 |

### 自定义构建规则

当存在代码标签为 `1.2.3` 的自定义构建规则时，优先使用自定义规则：

```bash
# 方式1：推送标签触发
git tag release-v1.2.3
git push origin release-v1.2.3

# 方式2：GitHub Actions 手动触发
# 在 GitHub Actions 页面手动运行 workflow，并指定版本号
```

## 🔐 GitHub Secrets 配置

在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加：

```
ALICLOUD_USERNAME=xiyeeee
ALICLOUD_PASSWORD=<your-password>
SERVER_HOST=<your-server-ip>
SERVER_USERNAME=<server-username>
SERVER_SSH_KEY=<private-ssh-key>
SERVER_PORT=22  # 可选，默认22
```

## 📁 项目结构

```
lemon-form-react/
├── Dockerfile              # Docker 镜像构建文件
├── docker-compose.yml      # Docker Compose 配置
├── nginx.conf             # Nginx 配置
├── deploy.sh              # 部署脚本
├── .dockerignore          # Docker 忽略文件
└── .github/
    └── workflows/
        └── docker-deploy.yml  # GitHub Actions 工作流
```

## 🛠️ 手动部署步骤

### 阿里云服务器配置

1. **安装 Docker**
   ```bash
   # CentOS/RHEL
   sudo yum update -y
   sudo yum install -y docker
   sudo systemctl start docker
   sudo systemctl enable docker

   # Ubuntu/Debian
   sudo apt update
   sudo apt install -y docker.io
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

2. **配置防火墙**
   ```bash
   # 开放 80 端口
   sudo firewall-cmd --permanent --add-port=80/tcp
   sudo firewall-cmd --reload
   ```

3. **登录阿里云容器镜像服务**
   ```bash
   docker login --username=xiyeeee crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com
   ```

### 部署命令

```bash
# 1. 拉取镜像
docker pull crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker:1.2.3

# 2. 停止旧容器
docker stop lemon-form-react || true
docker rm lemon-form-react || true

# 3. 启动新容器
docker run -d \
  --name lemon-form-react \
  --restart unless-stopped \
  -p 80:80 \
  crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker:1.2.3

# 4. 检查状态
docker ps
curl http://localhost/health
```

## 🔍 监控和维护

### 查看日志
```bash
# 查看容器日志
docker logs lemon-form-react

# 实时查看日志
docker logs -f lemon-form-react
```

### 更新应用
```bash
# 重新部署
./deploy.sh

# 或使用 docker-compose
docker-compose down
docker-compose pull
docker-compose up -d
```

### 回滚版本
```bash
# 停止当前容器
docker stop lemon-form-react

# 启动指定版本
docker run -d \
  --name lemon-form-react \
  --restart unless-stopped \
  -p 80:80 \
  crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker:1.2.2
```

## 🚨 故障排除

### 常见问题

1. **镜像拉取失败**
   ```bash
   # 检查登录状态
   docker login --username=xiyeeee crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com

   # 检查网络连接
   ping crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com
   ```

2. **容器启动失败**
   ```bash
   # 查看详细日志
   docker logs lemon-form-react

   # 检查端口占用
   netstat -tulpn | grep :80
   ```

3. **应用无法访问**
   ```bash
   # 检查防火墙
   sudo firewall-cmd --list-ports

   # 检查容器状态
   docker ps -a
   docker inspect lemon-form-react
   ```

## 📊 性能优化

- 使用 Nginx 进行静态文件服务和缓存
- 启用 Gzip 压缩
- 配置适当的缓存头
- 使用 Docker 层缓存优化构建速度

## 🔒 安全建议

- 定期更新 Docker 镜像
- 使用非 root 用户运行容器
- 配置 HTTPS（推荐使用阿里云负载均衡）
- 定期备份数据和配置文件
- 监控容器资源使用情况

---

如有问题，请查看 [GitHub Issues](../../issues) 或联系维护者。
