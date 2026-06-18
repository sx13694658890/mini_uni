---
name: creating-pro-design-ui-components
description: Use when adding or modifying Vue components in @init-project/pro-design-ui, or when component sizing, theme colors, Storybook docs, or library file structure are inconsistent or missing
---

# 编写 pro-design-ui 组件

## Overview

pro-design-ui 组件必须支持 **small / web / large** 三档尺寸（可固定、可响应），颜色必须使用 **主题色 token**，禁止硬编码 Tailwind 调色板类名。

## When to Use

- 在 `packages/components/pro-design-ui/src/components/` 新增组件
- 调整现有组件的尺寸、颜色、插槽、v-model
- 补全 `index.d.ts` / `index.stories.ts` / `index.mdx`
- Storybook 文档或交互测试与组件不同步

**When NOT to use:** 修改 Rslib 构建、根目录 Storybook 配置、发布流程（见 docs/03-build-pipeline.md）

## 文件清单（每个组件一个目录）

```
pr-{name}/
  index.vue        # 组件实现
  index.d.ts       # Props / Emits / 类型导出
  index.stories.ts # Storybook CSF
  index.mdx        # 文档（Meta of stories，勿用 autodocs 重复）
```

完成后在 `src/components/index.ts` 导出，并在 `src/index.ts`（若有）一并导出。

## 尺寸：small / web / large

| 档位  | 固定 class            | 响应断点（未传 size 时） |
| ----- | --------------------- | ------------------------ |
| small | `text-xs px-2 py-1`   | 默认（`< md`）           |
| web   | `text-sm px-3 py-2`   | `md:`                    |
| large | `text-base px-4 py-3` | `lg:`                    |

**类型定义（index.d.ts）：**

```typescript
export type ProComponentSize = 'small' | 'web' | 'large';

export interface IPrXxxProps {
  size?: ProComponentSize;
  // ...
}
```

**实现模式（index.vue）：**

```typescript
const sizeMap = {
  small: 'text-xs px-2 py-1',
  web: 'text-sm px-3 py-2',
  large: 'text-base px-4 py-3',
} as const;

const sizeClasses = computed(() =>
  props.size ? sizeMap[props.size] : 'text-xs px-2 py-1 md:text-sm md:px-3 md:py-2 lg:text-base lg:px-4 lg:py-3',
);
```

需要尺寸控制的组件必须提供 `size?: ProComponentSize`；纯布局组件可省略，但须在 PR 中说明原因。

## 颜色：主题色 token

**禁止：** `bg-red-500`、`text-neutral-400`、`bg-neutral-100` 等硬编码色。

**必须：** 使用 `@theme` 定义的语义 token，通过 Tailwind 类引用。

在 `packages/components/pro-design-ui/src/styles/theme.css` 的 `@theme` 中维护（品牌色 Color 01–05）：

```css
@theme {
  --color-brand-01: #f7e7c2; /* 浅米黄 - 背景/输入框 */
  --color-brand-02: #f1c69b; /* 暖桃 - 次要 */
  --color-brand-03: #9eadb3; /* 灰蓝 - 边框/次要文字 */
  --color-brand-04: #5d6c6c; /* 深灰绿 - 主色/正文 */
  --color-brand-05: #b9d176; /* 青柠 - 强调/聚焦环 */

  --color-primary: #5d6c6c;
  --color-primary-foreground: #f7e7c2;
  --color-accent: #b9d176;
  --color-muted: #f7e7c2;
  --color-muted-foreground: #9eadb3;
  --color-input: #f7e7c2;
  --color-input-foreground: #5d6c6c;
  --color-ring: #b9d176;
}
```

**组件内用法：**

| 用途          | 类名                                               |
| ------------- | -------------------------------------------------- |
| 主按钮/强调   | `bg-primary text-primary-foreground`               |
| 输入框背景    | `bg-input text-input-foreground`                   |
| 次要文字/图标 | `text-muted-foreground`                            |
| 禁用          | `opacity-60 text-disabled`                         |
| 聚焦容器      | `focus-within:ring-1 focus-within:ring-primary/30` |

新增语义色时先扩展 `@theme`，再在组件中使用，不得在组件内写 `#hex`。

## Vue 组件约定

- `<script setup lang="ts">`，Props 类型来自 `./index.d.ts`
- v-model 用 `defineModel`；其余 Props 用 `defineProps`
- 可选插槽外层加 `v-if="$slots.prefix"` / `v-if="$slots.suffix"`，避免空节点占位
- 不 import `@element-plus/icons-vue`（peer 依赖）；图标由消费方或 Story 通过插槽传入
- 样式优先 Tailwind 原子类；避免 scoped 内重复定义颜色

## Storybook

**index.stories.ts：**

- `title: 'pro-design-ui/{分类}/PrXxx'`
- 测试工具从 `storybook/test` 导入（**不是** `@storybook/test`）
- 提供 `Base` story；有 size 时不必逐个 story，可用 Controls 切换
- `export default { ... } as Meta<typeof Component>`（对象字面量 default export）
- 使用 `play` 时按真实 DOM 查询：`getByText` / `getByRole('button')`，禁止 `getByRole('span')`
- **不要** 在 stories 上加 `tags: ['autodocs']` 若已有 `index.mdx`（会 duplicate docs）

**index.mdx：**

```mdx
import { Meta, Canvas, Controls, Title, Description, ArgTypes } from '@storybook/addon-docs/blocks';
import * as XxxStories from './index.stories';

<Meta of={XxxStories} />
<Title />
<Description />
<!-- 中文说明 + Canvas / ArgTypes / Controls -->
```

MDX 必须 `<Meta of={stories} />` 挂载到 CSF；禁止留空 MDX 文件。

## vue-tsc 范围

`tsconfig.json` 已排除 `*.stories.ts` 与 `*.mdx`；类型以 `index.d.ts` + 组件源码为准。

## Common Mistakes

| 错误做法                              | 正确做法                                           |
| ------------------------------------- | -------------------------------------------------- |
| `bg-red-500`、`text-neutral-*`        | `bg-primary`、`text-muted-foreground` 等主题 token |
| 仅 `p-2 md:inline-block` 无 size 体系 | `sizeMap` + 响应式三档                             |
| 空 `index.mdx`                        | 删除或写完整 `<Meta of={...} />` 文档              |
| `tags: ['autodocs']` + 自定义 MDX     | 二选一：有 MDX 则去掉 autodocs                     |
| `import from '@storybook/test'`       | `import from 'storybook/test'`                     |
| 固定写死 `size: 'large'` 为唯一形态   | 支持 prop + 响应式默认                             |
| stories 里 import 图标进组件库源码    | 插槽 / story render 传入                           |

## Red Flags — STOP

- 组件里出现 `#` / `rgb(` / `bg-red-*` / `bg-blue-*`
- 新建组件缺少 `index.d.ts`
- MDX 无 `Meta of=` 绑定
- 复制 pr-button stories 未改 title / component 名
