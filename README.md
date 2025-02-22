
# Ashu Interface

[![版本](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://npmjs.com/package/ashu-interface)  
一个基于 React 和 Web3 技术的现代网页界面。

## 目录
- [Ashu Interface](#ashu-interface)
  - [目录](#目录)
  - [项目简介](#项目简介)
  - [安装步骤](#安装步骤)
  - [使用方法](#使用方法)
    - [开发模式](#开发模式)
    - [生产构建](#生产构建)
  - [脚本命令](#脚本命令)
  - [依赖包](#依赖包)
  - [开发依赖](#开发依赖)
  - [许可证](#许可证)

## 项目简介
`ashu-interface` 是一个专为区块链技术设计的网页应用框架，通过 `ethers` 和 `@web3-react` 等库实现与区块链的无缝集成。项目使用 React 19 构建前端，结合 `jotai` 进行状态管理和 `react-router-dom` 进行路由控制。项目配置了强大的 Webpack 构建工具，支持开发和生产环境。

## 安装步骤
按照以下步骤开始使用 `ashu-interface`：

1. 克隆仓库：
   ```bash
   git clone <仓库地址>
   ```
2. 进入项目目录：
   ```bash
   cd ashu-interface
   ```
3. 安装依赖：
   ```bash
   npm install
   ```

## 使用方法
项目提供多个脚本命令以支持开发和生产流程，详见 [脚本命令](#脚本命令) 部分。

### 开发模式
启动开发服务器，支持热重载：
```bash
npm run dev
```

### 生产构建
生成优化的生产构建：
```bash
npm run build
```

## 脚本命令
项目中包含以下脚本命令：

- **`npm run dev`**：以开发模式运行 Webpack，支持热重载。
- **`npm run client:dev`**：通过 `scripty` 执行客户端开发脚本。
- **`npm run client:prod`**：通过 `scripty` 执行客户端生产脚本。
- **`npm run client:server`**：通过 `scripty` 执行客户端服务器脚本。

脚本路径在 `config.scripty` 中配置，支持跨平台：
- Linux/Mac：`./scripts`
- Windows：`./scripts-win`

## 依赖包
项目运行时依赖以下包：

- `@ethersproject/bignumber`: ^5.7.0  
- `@web3-react/core`: ^8.2.3  
- `@web3-react/metamask`: ^8.2.4  
- `@web3-react/types`: ^8.2.3  
- `ethers`: ^5.7.2  
- `immer`: ^10.1.1  
- `jotai`: ^2.12.0  
- `jquery`: ^3.7.1  
- `react`: ^19.0.0  
- `react-dom`: ^19.0.0  
- `react-router-dom`: ^7.1.5  
- `scripty`: ^2.1.1  

## 开发依赖
开发和构建过程中使用以下工具：

- `@soda/friendly-errors-webpack-plugin`: ^1.8.1  
- `@swc/core`: ^1.10.15  
- `@swc/helpers`: ^0.5.15  
- `@tailwindcss/postcss`: ^4.0.7  
- `@types/react`: ^19.0.8  
- `@types/react-dom`: ^19.0.3  
- `autoprefixer`: ^10.4.20  
- `backstopjs`: ^6.3.25  
- `clean-webpack-plugin`: ^4.0.0  
- `css-loader`: ^7.1.2  
- `dotenv-webpack`: ^8.1.0  
- `html-webpack-plugin`: ^5.6.3  
- `mini-css-extract-plugin`: ^2.9.2  
- `node-notifier`: ^10.0.1  
- `postcss`: ^8.5.3  
- `postcss-loader`: ^8.1.1  
- `style-loader`: ^4.0.0  
- `swc-loader`: ^0.2.6  
- `tailwindcss`: ^4.0.7  
- `themed-progress-plugin`: ^1.0.1  
- `webpack`: ^5.97.1  
- `webpack-bundle-analyzer`: ^4.10.2  
- `webpack-cli`: ^6.0.1  
- `webpack-dev-server`: ^5.2.0  
- `webpack-merge`: ^6.0.1  
- `yargs-parser`: ^21.1.1  

## 许可证
本项目采用 ISC 许可证。详情请参阅 [LICENSE](LICENSE) 文件。
