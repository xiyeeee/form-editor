# 多阶段构建：第一阶段用于构建
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制package.json和yarn.lock
COPY package.json yarn.lock ./

# 安装依赖（包括开发依赖，构建时需要）
# node:18-alpine已预装yarn，无需再安装
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

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
