# 完整部署指南 - Lemon Form React 应用

本文档详细记录从零开始部署 lemon-form-react 应用到阿里云服务器的完整流程。

---

## 📋 目录

1. [环境准备](#环境准备)
2. [GitHub配置](#github配置)
3. [阿里云配置](#阿里云配置)
4. [代码部署配置](#代码部署配置)
5. [自动构建流程](#自动构建流程)
6. [服务器部署](#服务器部署)
7. [域名配置](#域名配置)
8. [常见问题排查](#常见问题排查)

---

## 🛠️ 环境准备

### 1. 本地开发环境

- Node.js 18+
- Git
- 代码编辑器（VS Code等）

### 2. 云服务器环境

**系统要求：**
- CentOS 7+ / Ubuntu 18+ / RHEL 7+
- 至少 2GB 内存
- 已配置公网IP

**安装Docker：**

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

# 验证安装
docker --version
```

**安装Nginx（用于域名配置）：**

```bash
# CentOS/RHEL
sudo yum install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Ubuntu/Debian
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## 🔐 GitHub配置

### 步骤1：配置GitHub Secrets

**访问路径：**
```
GitHub仓库 → Settings → Secrets and variables → Actions → New repository secret
```

**需要配置的Secrets：**

| Secret名称 | 值说明 | 获取方式 |
|-----------|--------|---------|
| `ALICLOUD_USERNAME` | 阿里云账号全名 | `xiyeeee` |
| `ALICLOUD_PASSWORD` | 阿里云CR访问凭证密码 | 阿里云控制台 → 容器镜像服务 → 访问凭证 |
| `SERVER_HOST` | 云服务器公网IP | 阿里云ECS控制台查看 |
| `SERVER_USERNAME` | 服务器登录用户名 | 通常是 `root` |
| `SERVER_SSH_KEY` | SSH私钥完整内容 | 本地 `~/.ssh/id_rsa` 文件内容 |
| `SERVER_PORT` | SSH端口（可选） | 默认 `22` |

**详细配置步骤：**

#### 1.1 获取阿里云CR密码

1. 登录阿里云控制台：https://cr.console.aliyun.com/
2. 左侧菜单 → **访问凭证**
3. 点击 **设置固定密码** 或 **重置密码**
4. 复制密码（长字符串）

#### 1.2 获取SSH私钥

**Windows系统：**
```powershell
# 查看SSH私钥
Get-Content ~/.ssh/id_rsa

# 如果没有，生成新的密钥对
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

**Linux/Mac系统：**
```bash
# 查看SSH私钥
cat ~/.ssh/id_rsa

# 如果没有，生成新的密钥对
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

**重要：** 复制整个私钥内容，包括：
```
-----BEGIN OPENSSH PRIVATE KEY-----
...完整内容...
-----END OPENSSH PRIVATE KEY-----
```

#### 1.3 配置服务器SSH公钥

**将公钥添加到服务器：**

```bash
# 在服务器上执行
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# 将本地公钥内容添加到服务器
echo "你的公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

**查看本地公钥：**
```bash
# Windows PowerShell
Get-Content ~/.ssh/id_rsa.pub

# Linux/Mac
cat ~/.ssh/id_rsa.pub
```

---

## ☁️ 阿里云配置

### 步骤1：开通容器镜像服务（ACR）

1. 登录阿里云控制台
2. 搜索 **容器镜像服务ACR**
3. 开通服务（个人版免费）
4. 创建命名空间：`xiye-docker`
5. 创建镜像仓库：`my-docker`

**镜像仓库地址：**
```
crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker
```

### 步骤2：配置安全组

**开放端口：**

1. 登录阿里云ECS控制台
2. 找到你的云服务器实例
3. 点击 **安全组** → 点击安全组ID
4. 点击 **入方向** → **添加安全组规则**

**需要开放的端口：**

| 端口 | 协议 | 授权对象 | 说明 |
|-----|------|---------|------|
| 80 | TCP | 0.0.0.0/0 | HTTP访问（如果使用80端口） |
| 8081 | TCP | 0.0.0.0/0 | 应用端口（如果使用8081端口） |
| 22 | TCP | 你的IP | SSH访问（可选，更安全） |

---

## 📝 代码部署配置

### 项目结构

```
lemon-form-react/
├── Dockerfile              # Docker镜像构建文件
├── docker-compose.yml      # Docker Compose配置
├── nginx.conf             # Nginx服务器配置
├── deploy.sh              # 部署脚本
├── .dockerignore          # Docker忽略文件
├── .eslintrc.js           # ESLint配置
├── .umirc.ts              # Umi框架配置
├── package.json           # 项目依赖
└── .github/
    └── workflows/
        └── docker-deploy.yml  # GitHub Actions工作流
```

### 关键配置文件说明

#### Dockerfile

```dockerfile
# 多阶段构建：第一阶段用于构建
FROM node:18-alpine AS builder

WORKDIR /app

# 复制package.json和yarn.lock
COPY package.json yarn.lock ./

# 安装依赖（包括开发依赖，构建时需要）
RUN yarn install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
RUN yarn build

# 第二阶段：生产环境镜像
FROM nginx:alpine

# 复制构建好的静态文件到nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制nginx配置文件
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**关键点：**
- 使用 `yarn` 而非 `npm`（项目配置使用yarn）
- `node:18-alpine` 已预装yarn，无需额外安装
- 多阶段构建减少最终镜像大小

#### nginx.conf

- 支持React Router的客户端路由
- 配置静态资源缓存
- 启用Gzip压缩
- 健康检查端点

---

## 🔄 自动构建流程

### Git标签触发规则

| Git标签 | Docker镜像版本 | 说明 |
|---------|--------------|------|
| `release-v1.2.3` | `1.2.3` | 自动提取版本号 |
| `v1.2.3` | `1.2.3` | 支持标准版本标签 |
| 手动触发 | 自定义版本 | 通过GitHub Actions手动指定 |

### 触发构建

**方式1：推送标签（推荐）**

```bash
# 创建标签
git tag release-v1.3.0

# 推送标签
git push origin release-v1.3.0
```

**方式2：GitHub Actions手动触发**

1. 打开GitHub仓库 → **Actions** 标签
2. 选择 **Docker Build and Deploy** workflow
3. 点击 **Run workflow**
4. 输入版本号（如：`1.3.0`）
5. 点击 **Run workflow**

### 构建流程

1. ✅ Checkout代码
2. ✅ 设置Node.js环境
3. ✅ 安装依赖（yarn install）
4. ✅ 构建应用（yarn build）
5. ✅ 构建Docker镜像
6. ✅ 登录阿里云CR
7. ✅ 推送镜像到阿里云CR

**镜像地址：**
```
crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker:1.3.0
crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker:latest
```

---

## 🚀 服务器部署

### 步骤1：登录服务器

```bash
ssh 用户名@服务器IP
```

### 步骤2：登录阿里云容器镜像服务

```bash
docker login --username=xiyeeee crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com
# 输入阿里云CR密码
```

### 步骤3：拉取镜像

```bash
# 拉取最新版本
docker pull crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker:1.3.0

# 或拉取latest标签
docker pull crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker:latest
```

### 步骤4：停止并删除旧容器

```bash
docker stop lemon-form-react 2>/dev/null || true
docker rm lemon-form-react 2>/dev/null || true
```

### 步骤5：启动新容器

**如果80端口可用：**

```bash
docker run -d \
  --name lemon-form-react \
  --restart unless-stopped \
  -p 80:80 \
  crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker:1.3.0
```

**如果80端口被占用（使用8081端口）：**

```bash
docker run -d \
  --name lemon-form-react \
  --restart unless-stopped \
  -p 8081:80 \
  crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker:1.3.0
```

### 步骤6：验证部署

```bash
# 查看容器状态
docker ps | grep lemon-form-react

# 查看容器日志
docker logs lemon-form-react

# 测试健康检查
curl http://localhost:8081/health

# 测试应用
curl http://localhost:8081
```

**访问应用：**
- 如果使用80端口：`http://你的服务器IP`
- 如果使用8081端口：`http://你的服务器IP:8081`

---

## 🌐 域名配置

### 前置条件

- 拥有一个域名（如：`xiyeeee.cn`）
- 域名DNS解析服务（阿里云DNS或其他）

### 步骤1：配置DNS解析

**在域名服务商控制台：**

1. 登录域名控制台（阿里云DNS或其他）
2. 找到你的域名（如：`xiyeeee.cn`）
3. 添加A记录：

```
记录类型：A
主机记录：react-form（或app、form等）
记录值：你的服务器公网IP
TTL：600（默认）
```

**结果：** `react-form.xiyeeee.cn` → 指向你的服务器IP

### 步骤2：配置Nginx反向代理

**在服务器上创建配置文件：**

```bash
sudo tee /etc/nginx/conf.d/lemon-form.conf > /dev/null << 'EOF'
server {
    listen 80;
    server_name react-form.xiyeeee.cn;

    location / {
        proxy_pass http://localhost:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
```

**注意：** 
- 如果容器使用80端口，改为 `proxy_pass http://localhost:80;`
- 替换 `react-form.xiyeeee.cn` 为你的实际子域名

**测试并重载Nginx：**

```bash
# 测试配置
sudo nginx -t

# 重载配置
sudo systemctl reload nginx

# 检查Nginx状态
sudo systemctl status nginx
```

### 步骤3：验证域名访问

**等待DNS生效（通常几分钟）：**

```bash
# 测试DNS解析
nslookup react-form.xiyeeee.cn
# 或
ping react-form.xiyeeee.cn
```

**访问应用：**
```
http://react-form.xiyeeee.cn
```

---

## 🔄 更新应用

### 方式1：推送新标签（自动构建）

```bash
# 本地操作
git tag release-v1.3.1
git push origin release-v1.3.1

# 等待GitHub Actions构建完成（约3-5分钟）

# 服务器操作
docker pull crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker:1.3.1
docker stop lemon-form-react
docker rm lemon-form-react
docker run -d \
  --name lemon-form-react \
  --restart unless-stopped \
  -p 8081:80 \
  crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker:1.3.1
```

### 方式2：使用部署脚本

```bash
# 下载部署脚本
wget https://raw.githubusercontent.com/xiyeeee/form-editor/dev-lmx/deploy.sh
chmod +x deploy.sh

# 执行部署
./deploy.sh 1.3.1
```

---

## 🚨 常见问题排查

### 问题1：GitHub Actions构建失败

**错误：`MODULE_NOT_FOUND`**

**原因：** Dockerfile使用了错误的包管理器

**解决：** 确保使用 `yarn` 而非 `npm`，且不要使用 `--only=production`

**错误：`unauthorized: authentication required`**

**原因：** 阿里云CR密码错误或过期

**解决：** 
1. 重新获取阿里云CR访问凭证密码
2. 更新GitHub Secret中的 `ALICLOUD_PASSWORD`

### 问题2：容器启动失败

**错误：`bind: address already in use`**

**原因：** 端口被占用

**解决：**
```bash
# 查看端口占用
sudo netstat -tulpn | grep :80

# 停止占用端口的服务
sudo systemctl stop nginx  # 如果是nginx
# 或使用其他端口
docker run -p 8081:80 ...
```

### 问题3：无法访问应用

**检查清单：**

1. **容器是否运行**
   ```bash
   docker ps | grep lemon-form-react
   ```

2. **端口是否正确映射**
   ```bash
   docker ps
   # 查看PORTS列，应该显示 0.0.0.0:8081->80/tcp
   ```

3. **防火墙/安全组**
   ```bash
   # 检查防火墙
   sudo firewall-cmd --list-ports
   
   # 检查安全组（阿里云控制台）
   # 确保端口已开放
   ```

4. **Nginx配置**
   ```bash
   # 检查配置
   sudo nginx -t
   
   # 查看错误日志
   sudo tail -f /var/log/nginx/error.log
   ```

5. **DNS解析**
   ```bash
   nslookup react-form.xiyeeee.cn
   # 应该返回服务器IP
   ```

### 问题4：域名访问显示其他内容

**原因：** Nginx配置未正确匹配域名

**解决：**

```bash
# 检查Nginx配置
cat /etc/nginx/conf.d/lemon-form.conf

# 确保server_name正确
# 确保配置文件优先级高（文件名以00开头）
sudo mv /etc/nginx/conf.d/lemon-form.conf /etc/nginx/conf.d/00-lemon-form.conf
sudo nginx -t
sudo systemctl reload nginx
```

### 问题5：SSH认证失败

**错误：`ssh: unable to authenticate`**

**解决：**

1. 确认GitHub Secret中的SSH私钥完整（包括头尾）
2. 确认服务器上有对应的公钥：
   ```bash
   cat ~/.ssh/authorized_keys
   ```
3. 如果自动部署失败，可以先手动部署

---

## 📊 项目配置总结

### 镜像仓库信息

- **Registry地址：** `crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com`
- **命名空间：** `xiye-docker`
- **镜像名称：** `my-docker`
- **完整地址：** `crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com/xiye-docker/my-docker`

### 容器信息

- **容器名称：** `lemon-form-react`
- **默认端口：** `8081:80`（如果80端口被占用）
- **重启策略：** `unless-stopped`

### 域名信息

- **主域名：** `xiyeeee.cn`
- **子域名：** `react-form.xiyeeee.cn`
- **访问地址：** `http://react-form.xiyeeee.cn`

---

## 🔒 安全建议

1. **定期更新依赖**
   ```bash
   yarn upgrade
   ```

2. **使用HTTPS**
   - 配置SSL证书（Let's Encrypt免费证书）
   - 修改Nginx配置支持HTTPS

3. **限制SSH访问**
   - 安全组只允许特定IP访问22端口
   - 使用SSH密钥而非密码

4. **定期备份**
   - 备份重要数据
   - 保存配置文件

---

## 📚 参考资源

- [Docker官方文档](https://docs.docker.com/)
- [Nginx官方文档](https://nginx.org/en/docs/)
- [GitHub Actions文档](https://docs.github.com/en/actions)
- [阿里云容器镜像服务文档](https://help.aliyun.com/product/60716.html)

---

## 📝 更新日志

- **2025-11-03**: 初始版本，完成完整部署流程
- 支持GitHub Actions自动构建
- 支持阿里云CR镜像仓库
- 支持子域名访问配置

---

**如有问题，请查看项目Issues或联系维护者。**

