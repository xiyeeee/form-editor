# 🍋 Lemon Form - 轻表单

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![UmiJS](https://img.shields.io/badge/UmiJS-4.4.12-blue.svg)](https://umijs.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.0.0-blue.svg)](https://ant.design/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.3-blue.svg)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://vercel.com)

> 表单搭建，如此简单

一个基于 React + UmiJS + Ant Design 开发的现代化表单编辑器，让表单创建变得简单高效。

## ✨ 功能特性

### 🎨 直观的拖拽式编辑器

- **可视化设计**：拖拽组件即可构建表单，无需编写代码
- **实时预览**：所见即所得，边编辑边预览效果
- **智能布局**：支持多种布局方式和响应式设计

### 🧩 丰富的组件库

- **基础组件**：输入框、文本域、数字输入、开关、单选、多选等
- **高级组件**：评分、NPS、电子签名、富文本编辑器等
- **个人信息组件**：姓名、性别、手机号、邮箱、身份证、地址等
- **布局组件**：分割线、分页、按钮等
- **展示组件**：标题、图片、视频等

### 📊 表单数据管理

- **统计分析**：查看表单访问量、提交量、数据趋势
- **数据导出**：支持多种格式的数据导出
- **表单模板**：内置多种行业模板，快速开始

### 🎯 工作空间管理

- **表单分类**：支持表单分组管理
- **收藏夹**：收藏常用的表单模板
- **回收站**：安全删除和恢复功能

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm/yarn

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发环境运行

```bash
# 使用 npm
npm run dev

# 或使用 yarn
yarn dev
```

访问 [http://localhost:8000](http://localhost:8000) 即可开始使用。

### 构建生产版本

```bash
# 使用 npm
npm run build

# 或使用 yarn
yarn build
```

## 📁 项目结构

```
src/
├── assets/                 # 静态资源文件
│   ├── icon/              # 图标资源
│   ├── form/              # 表单组件图标
│   ├── form-editor/       # 编辑器相关资源
│   └── theme/             # 主题图片
├── components/            # 公共组件
│   ├── FormComponents/    # 表单组件库
│   │   ├── Base/         # 基础组件
│   │   ├── Contact/      # 联系信息组件
│   │   └── Show/         # 展示组件
│   └── FormComponentsSetting/  # 组件设置面板
├── layouts/               # 布局组件
├── pages/                 # 页面组件
│   ├── homepage/         # 首页
│   ├── workSpace/        # 工作空间
│   ├── formEditor/       # 表单编辑器
│   └── preview/          # 表单预览
├── routes/               # 路由配置
├── store/                # Redux 状态管理
└── global.less           # 全局样式
```

## 🛠️ 技术栈

### 前端框架

- **React 18** - 用户界面库
- **UmiJS 4** - 企业级前端应用框架
- **TypeScript** - 类型安全的 JavaScript

### UI 组件库

- **Ant Design 5** - 企业级 UI 设计语言
- **@dnd-kit** - 现代拖拽库

### 状态管理

- **Redux Toolkit** - 状态管理工具
- **React Redux** - React 官方 Redux 绑定

### 开发工具

- **Less** - CSS 预处理器
- **ESLint** - 代码检查工具
- **Prettier** - 代码格式化工具
- **Stylelint** - CSS 代码检查

## 📱 核心功能说明

### 表单编辑器

表单编辑器是核心功能模块，支持：

- 组件拖拽排序
- 属性实时配置
- 表单验证设置
- 样式自定义
- 移动端预览

### 组件系统

采用模块化组件设计，每个组件包含：

- **渲染组件**：负责UI展示
- **设置面板**：配置组件属性
- **数据处理**：表单数据验证和提交

### 工作空间

提供完整的表单生命周期管理：

- 创建新表单
- 编辑现有表单
- 发布和分享
- 数据统计分析
- 模板管理

## 🌐 部署指南

### Vercel 部署（推荐）

1. 确保项目已配置 `vercel.json`
2. 连接 GitHub 仓库到 Vercel
3. 自动部署，获得免费域名

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发规范

1. 遵循现有的代码风格
2. 新功能请先创建 Issue 讨论
3. 提交 PR 前请确保测试通过
4. 更新相关文档

### 组件开发

新增组件需要：

1. 在 `src/components/FormComponents/` 下创建组件
2. 在 `src/pages/formEditor/componentData.ts` 中注册
3. 添加对应的设置面板
4. 更新相关文档

## 👨‍💻 作者

**Xiyeeee**

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

<div align="center">
  <p>⭐ 如果这个项目对你有帮助，请给它一个 star！</p>
  <p>Made with ❤️ by Xiyeeee</p>
</div>
