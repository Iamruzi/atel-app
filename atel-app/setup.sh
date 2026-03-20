#!/bin/bash

echo "🚀 ATEL Mobile App - 快速启动脚本"
echo "=================================="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi

echo "✅ npm 版本: $(npm -v)"
echo ""

# 安装依赖
echo "📦 安装依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

echo ""
echo "✅ 依赖安装完成！"
echo ""
echo "🎉 项目准备就绪！"
echo ""
echo "运行命令："
echo "  npm start       - 启动开发服务器"
echo "  npm run ios     - 在 iOS 模拟器运行"
echo "  npm run android - 在 Android 模拟器运行"
echo "  npm run web     - 在浏览器运行"
echo ""
echo "📱 在真机上测试："
echo "  1. 安装 Expo Go App"
echo "  2. 运行 npm start"
echo "  3. 扫描二维码"
echo ""
