#!/bin/bash
set -e

# 配置变量 - 请根据实际情况修改
REGISTRY="crpi-ow7mi2apt624v3c8.cn-heyuan.personal.cr.aliyuncs.com"
NAMESPACE="xiye-docker"
IMAGE_NAME="my-docker"
VERSION=${1:-"latest"}  # 可以传递版本参数，如 ./deploy.sh 1.2.3
CONTAINER_NAME="lemon-form-react"

echo "开始部署 lemon-form-react 应用..."
echo "镜像版本: $VERSION"
echo "容器名称: $CONTAINER_NAME"

# 检查Docker是否运行
if ! docker info > /dev/null 2>&1; then
    echo "错误: Docker 未运行或无权限访问"
    exit 1
fi

# 登录阿里云容器镜像服务
echo "登录阿里云容器镜像服务..."
docker login --username=xiyeeee $REGISTRY

# 停止并删除旧容器（如果存在）
echo "停止旧容器..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# 拉取最新镜像
echo "拉取镜像: $REGISTRY/$NAMESPACE/$IMAGE_NAME:$VERSION"
docker pull $REGISTRY/$NAMESPACE/$IMAGE_NAME:$VERSION

# 启动新容器
echo "启动新容器..."
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p 80:80 \
  --label "app=lemon-form-react" \
  --label "version=$VERSION" \
  --label "updated_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  $REGISTRY/$NAMESPACE/$IMAGE_NAME:$VERSION

# 等待容器启动
echo "等待容器启动..."
sleep 10

# 检查容器状态
if docker ps | grep -q $CONTAINER_NAME; then
    echo "✅ 部署成功！"
    echo "容器状态: $(docker ps --filter name=$CONTAINER_NAME --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}')"

    # 获取服务器IP（如果有公网IP）
    SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}' || echo "localhost")
    echo "应用访问地址: http://$SERVER_IP"

    # 健康检查
    if curl -f http://localhost/health > /dev/null 2>&1; then
        echo "✅ 健康检查通过"
    else
        echo "⚠️  健康检查失败，请检查应用日志"
    fi
else
    echo "❌ 部署失败！"
    echo "容器日志:"
    docker logs $CONTAINER_NAME
    exit 1
fi

# 清理悬空镜像
echo "清理悬空镜像..."
docker image prune -f

echo "🎉 部署完成！"
