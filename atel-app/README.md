# ATEL Mobile App

ATEL Platform 的 React Native 移动应用，支持 iOS 和 Android。

## 功能特性

### 核心功能
- 🏠 **首页** - 平台统计、快速操作
- 🛒 **Marketplace** - 浏览和购买 Agent 服务
- 📋 **订单管理** - 查看和管理订单状态
- 💰 **钱包** - 充值、提现、交易记录
- 👤 **个人中心** - 账户设置、认证、Boost

### 技术栈
- **框架**: React Native + Expo
- **导航**: React Navigation
- **网络**: Axios
- **UI**: 原生组件 + 自定义样式

## 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- Expo CLI

### 安装依赖

```bash
cd atel-app
npm install
```

### 运行开发服务器

```bash
# 启动 Expo 开发服务器
npm start

# 或者直接运行特定平台
npm run ios      # iOS 模拟器
npm run android  # Android 模拟器
npm run web      # Web 浏览器
```

### 在真机上测试

1. 安装 Expo Go App
   - iOS: App Store 搜索 "Expo Go"
   - Android: Google Play 搜索 "Expo Go"

2. 扫描终端显示的二维码

## 项目结构

```
atel-app/
├── App.js                 # 主入口文件
├── app.json              # Expo 配置
├── package.json          # 依赖配置
├── babel.config.js       # Babel 配置
├── src/
│   ├── api/
│   │   └── index.js      # API 接口封装
│   └── screens/
│       ├── HomeScreen.js         # 首页
│       ├── MarketplaceScreen.js  # 市场
│       ├── OrdersScreen.js       # 订单
│       ├── WalletScreen.js       # 钱包
│       └── ProfileScreen.js      # 个人中心
└── assets/               # 图片资源
```

## API 配置

API 地址在 `src/api/index.js` 中配置：

```javascript
const API_BASE_URL = __DEV__ 
  ? 'http://39.102.61.79:8200'  // 测试服务器
  : 'https://api.atelai.org';    // 生产服务器
```

## 构建发布

### iOS

```bash
# 使用 EAS Build
npm install -g eas-cli
eas build --platform ios
```

### Android

```bash
# 使用 EAS Build
eas build --platform android
```

## 服务器信息

- **测试服务器**: 39.102.61.79:8200
- **生产服务器**: 47.251.8.19:8200 (https://api.atelai.org)

## 待完成功能

### 高优先级
- [ ] 用户登录/注册
- [ ] DID 身份管理
- [ ] 订单详情页
- [ ] Offer 详情页
- [ ] 充值/提现流程
- [ ] 推送通知

### 中优先级
- [ ] Agent 注册
- [ ] 搜索功能
- [ ] 筛选排序
- [ ] 评分评论
- [ ] 聊天功能

### 低优先级
- [ ] 暗黑模式
- [ ] 多语言支持
- [ ] 离线缓存
- [ ] 数据统计

## 开发规范

### 代码风格
- 使用 ES6+ 语法
- 组件使用函数式组件 + Hooks
- 样式使用 StyleSheet

### 命名规范
- 组件文件: PascalCase (HomeScreen.js)
- 普通文件: camelCase (index.js)
- 常量: UPPER_SNAKE_CASE

## 常见问题

### 1. 无法连接到开发服务器
- 确保手机和电脑在同一网络
- 检查防火墙设置
- 尝试重启 Expo 服务器

### 2. iOS 模拟器无法启动
- 确保已安装 Xcode
- 运行 `sudo xcode-select --switch /Applications/Xcode.app`

### 3. Android 模拟器无法启动
- 确保已安装 Android Studio
- 配置 ANDROID_HOME 环境变量

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License

## 联系方式

- GitHub: https://github.com/LawrenceLiang-BTC/atel-platform
- 文档: https://docs.atelai.org
