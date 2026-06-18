## 项目介绍

uni-app 基础框架模板，集成了常用的功能和配置，方便快速开发 uni-app 应用。

## 安装与运行

```bash
node version >= 20.x
pnpm version >= 10.x

pnpm install
pnpm dev:mp-weixin   # 微信小程序
pnpm dev:h5          # H5
```

## 技术栈

- Vue 3 + TypeScript
- uni-app 3.x + Vite
- uview-plus（UI 组件库）
- UnoCSS（原子化 CSS）
- @uni-helper（路由、布局、网络请求等工具链）
- @vueuse/core（状态管理）

## 目录结构

```
src/
├── api/           # HTTP 实例与接口模块
├── components/    # 公共组件
├── hooks/         # 组合式函数
├── layouts/       # 页面布局
├── pages/         # 主包页面
├── store/         # 全局状态
├── styles/        # 全局样式
└── utils/         # 工具函数
```

## 主要功能

- TypeScript 支持
- Vue 3 组合式 API
- 全局状态管理（useUserStore）
- API 请求封装（getAction / postAction）
- 路由跳转工具（navigateTo）
- 微信登录弹窗示例
- UnoCSS 主题色

### 路由跳转

```ts
import { navigateTo } from '~/utils'

navigateTo('/pages/home/index')
navigateTo<{ id: number }>('/pages/detail/index', { id: 1 })
```

### UnoCSS 使用

```html
<view class="bg-primary text-white p-4">
  主题色背景
</view>
```

### 接口请求

```ts
import { getAction, postAction } from '~/api/instance'
```

## 环境变量

在 `env/` 目录下配置：

```bash
VITE_APP_ENV=development
VITE_API_BASE_URL=https://your-api.example.com/api
```
