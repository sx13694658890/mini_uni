## 项目介绍
uniapp 模板项目，集成了常用的功能和配置，方便快速开发 uniapp 应用。

## 安装与运行
```bash
node version >= 20.x
pnpm version >= 10.x
```

## 技术栈
- Vue 3
- TypeScript
- uview-plus
- Vite
- uniapp 框架

## 主要功能
- TypeScript 支持
- Vue 3 组合式 API
- store 状态管理
- 常用工具函数封装
- API 请求封装
- 路由管理
- UI 组件库集成(uview-plus)

### 图标使用
1. 下载 svg 图标，放到 `svgs` 目录下
2. 重新启动项目
3. 使用
```html
<text class="i-custom:anq" />
```
[图标地址](https://icon-sets.iconify.design/icon-park-outline/)

### 路由跳转
1. 使用utils普通跳转
```ts
import { navigateTo } from '~/utils'

// 会有提示，以防出错
navigateTo('xxxx')
```

2. 携带参数
```ts
navigateTo<{ id: number }>('xxxx', { id: 1 })
```

### unocss使用
```css
/* 主色调 */
--theme-primary: #2979ff;
--theme-success: #3ed268;
--theme-warning: #fe9831;
--theme-error: #fa4e62;
```
使用
```html
<view class="bg-primary text-error p-4">
  这是一个主题色背景的视图
</view>
```

## 接口请求
1. 参考api/modules/auth
```ts
import { getAction, postAction } from '~/api/instance'
```
