# 首页分类二级页 Implementation Plan

> **For agentic workers:**
> **Goal:** 从首页点击「活鲜鱼类 / 精品虾类 / 螃蟹贝类 / 半成品」进入对应二级列表页，UI 对齐 `design/stitch_` 设计稿，并与现有 Ocean Fresh 小程序风格一致。

**Architecture:** 采用**单页 + 路由参数**（`?id=fish|shrimp|crab|semi`），避免 4 份重复页面。所有首页二级页相关代码收敛到**独立分包** `pages-sub/home-category/`（页面 + 组件 + 数据），与 `mine`、`product` 分包隔离，**不写入主包** `src/data/ocean.ts` 或 `src/components/ocean/`，从而减小主包压缩体积、便于单独维护。主包仅保留首页跳转 URL；二级页复用主包 `AppHeader`、`useCartStore`、`navigateTo`。

**Tech Stack:** uni-app (Vue 3 `<script setup>`)、UnoCSS + 少量 scoped SCSS（商品网格卡）、uview-plus `u-icon`、现有 `definePage` 路由约定、`@uni-helper/vite-plugin-uni-pages` 自动扫描 `pages-sub/*` 子目录为分包。

### 分包策略（减少主包压缩）

```
src/pages-sub/
├── mine/           # 已有：我的相关二级页
├── product/        # 已有：商品详情
└── home-category/  # 新增：首页分类二级页（本需求）
    ├── list/index.vue          # 唯一页面
    ├── data.ts                 # 分类配置 + 商品 mock（仅分包内引用）
    └── components/
        ├── category-hero.vue
        ├── category-filter-chips.vue
        ├── product-card-grid.vue
        └── product-card-featured.vue
```

| 原则 | 说明 |
|---|---|
| 主包不 import 分包 | `home/index.vue` 只用 `navigateTo` 字符串跳转，不 `import` 分包文件 |
| 分包可 import 主包 | 二级页可 `import AppHeader from '~/components/ocean/app-header.vue'` |
| 类型复用 | 分包 `data.ts` 从 `~/data/ocean` 引入 `IProduct` 类型，不重复定义 |
| 路由 | `/pages-sub/home-category/list/index?id=fish` |

---

## 设计稿映射

| 首页分类 (`homeCategories.id`) | 设计稿 | 页面特征 |
|---|---|---|
| `fish` 活鲜鱼类 | `design/stitch_/_1/code.html` | Hero 横幅 + 横向筛选 Chip + 单列商品网格卡（方图在上） |
| `shrimp` 精品虾类 | `design/stitch_/_2/code.html` | 区块标题/副标题 + 横向子分类 Chip + 双列商品网格 |
| `crab` 螃蟹贝类 | `design/stitch_/_3/code.html` | 横向筛选 Chip + 首条大卡 + 双列网格 |
| `semi` 半成品 | `design/stitch_/_4/code.html` | Hero 横幅 + 筛选 Chip + 单列网格 + 底部品质说明卡 |

移动端从首页直接进入，**不实现**设计稿中的左侧分类导航栏（那是 Tab 级导航，已有 `pages/category/index.vue` 承担）。

---

## 文件结构

| 文件 | 包 | 职责 |
|---|---|---|
| `src/pages-sub/home-category/data.ts` | 分包 | 分类页配置、筛选器、商品 mock、查询函数 |
| `src/pages-sub/home-category/components/category-hero.vue` | 分包 | Hero 横幅（fish / semi） |
| `src/pages-sub/home-category/components/category-filter-chips.vue` | 分包 | 横向筛选 Chip |
| `src/pages-sub/home-category/components/product-card-grid.vue` | 分包 | 网格商品卡 |
| `src/pages-sub/home-category/components/product-card-featured.vue` | 分包 | 螃蟹贝类首条大卡 |
| `src/pages-sub/home-category/list/index.vue` | 分包 | 二级列表页（读 `id` 参数） |
| `src/pages/home/index.vue` | 主包 | 分类图标 `navigateTo` 分包路由（仅字符串，无 import） |
| `src/components/ocean/app-header.vue` | 主包 | 已有，分包页引用 |
| `src/data/ocean.ts` | 主包 | **不修改**，仅保留 `homeCategories` 与 `IProduct` 类型 |

---

## Task 1: 创建分包数据层 `src/pages-sub/home-category/data.ts`

新建文件（**不修改**主包 `src/data/ocean.ts`），从主包仅引入 `IProduct` 类型：

```typescript
import type { IProduct } from '~/data/ocean'

export interface ICategoryFilter {
  id: string
  label: string
}

export interface ICategoryHero {
  image: string
  title: string
  subtitle: string
}

export interface ICategoryPageConfig {
  id: string
  name: string
  layout: 'list' | 'grid-2' | 'featured-grid'
  hero?: ICategoryHero
  sectionTitle?: string
  sectionSubtitle?: string
  filters: ICategoryFilter[]
  qualityNote?: {
    title: string
    body: string
  }
}

export const categoryPageConfigs: Record<string, ICategoryPageConfig> = {
  fish: {
    id: 'fish',
    name: '活鲜鱼类',
    layout: 'list',
    hero: {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAomvC1l683tmA4KQ_NH0_0zoth__ihmHg8vI5gQzt5esERUuoEeajZ1YYANZTpH8f8YhFOiFmWdXlFI-0viX3KDBUvL9WYEQXE5YInnpXEVwxq3JUZBNV-COkIjj4f6JoPImuXI6tbCxdKXE2JMGTU66eYJTV2Jy4UfnOpIjtForsgnGPG7s31hOuAc15QTnd3OKNYv_UOdbS8cU39gaxeS-dgw0GSynXz1O6TAnE3bV5encGpayHdBi3DQ6crFnYaj8Ag4MYKFpQS',
      title: '深海直达',
      subtitle: '每日凌晨到货 · 活鲜直供',
    },
    filters: [
      { id: 'all', label: '综合' },
      { id: 'sales', label: '销量优先' },
      { id: 'price', label: '价格' },
      { id: 'new', label: '新品' },
    ],
  },
  shrimp: {
    id: 'shrimp',
    name: '精品虾类',
    layout: 'grid-2',
    sectionTitle: '纯净海域，鲜活直达',
    sectionSubtitle: '精选全球优质海域，每一只都经过严格质检',
    filters: [
      { id: 'all', label: '全部' },
      { id: 'tiger', label: '黑虎虾' },
      { id: 'white', label: '厄瓜多尔白虾' },
      { id: 'south', label: '南美对虾' },
      { id: 'boton', label: '牡丹虾' },
    ],
  },
  crab: {
    id: 'crab',
    name: '螃蟹贝类',
    layout: 'featured-grid',
    filters: [
      { id: 'all', label: '全部' },
      { id: 'hairy', label: '大闸蟹' },
      { id: 'deep', label: '深海蟹' },
      { id: 'shell', label: '扇贝/生蚝' },
    ],
  },
  semi: {
    id: 'semi',
    name: '半成品',
    layout: 'list',
    hero: {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-PyxbUDyDanRPo393YyQ1KZNLcaBVFzML4T5e9gTER6slw1ayGwSTuFN50iyxIjxDLWIZ0QldYiFfJNHYflry66G-KK2AX9N1L8oF0Bhd8EoAHV6I8fFsSnqkhq50r1F9BnkE2wJVMYmBo3h2bxU7iE8sa9Iz8gqXu8LQCzcC0Hh7vI77UIjHtpDgOr4livt1qtKUmbWg3dVBrq8FYTsuPa84ZjUCdGekqjaOni-OZ9_ZuCvxxjO8cmDpUqD2AMaK_UR7SBIV48eh',
      title: '5分钟变大厨',
      subtitle: '精选深海活鲜，免洗免切，专业配方调味，宅家尽享餐厅级海味。',
    },
    filters: [
      { id: 'all', label: '推荐' },
      { id: 'hot', label: '人气热销' },
      { id: 'season', label: '当季新品' },
      { id: 'price-asc', label: '价格升序' },
    ],
    qualityNote: {
      title: '极速冷链 · 鲜活到家',
      body: '我们承诺所有半成品食材均由原产地直发，全程-18℃温控运输，保证到手依然处于最佳鲜度。',
    },
  },
}

/** 扩展 IProduct：增加 filterId 用于子分类筛选 */
export interface ICategoryListProduct extends IProduct {
  homeCategoryId: 'fish' | 'shrimp' | 'crab' | 'semi'
  filterId?: string
  featured?: boolean
}

export const categoryListProducts: ICategoryListProduct[] = [
  // fish
  {
    id: 'fish-1', homeCategoryId: 'fish', filterId: 'sales',
    name: '挪威三文鱼 (中段)', origin: '挪威', spec: '约300g/份',
    price: 89.9, originalPrice: 108, categoryId: 'fish',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf18uQSF1unLINO3i1XNFWxsViyRYeOULHrM0dUPSo4aba8-KRJudrKk2LAbqruCx4Xi-aQT0YPGCQEd7jiI0oDDc-c05iPtqnDNNBGvRjbzmTv1xyLqVjAYyOpGV4VF17RpwaJelUZpYMpbf59nFAPj_CD-7-UE4YXDfTisolQtunCJO1IxEO4z0lQ7o84M2SuIyVYXkTZSSehOe9XD0lfnh689Wdw1rgAB0OjWmTOIHrfIT-nPMLwio5Uev5YbPtgJeqHAIGE4jc',
    tag: '限时抢购', tagStyle: 'fresh',
  },
  {
    id: 'fish-2', homeCategoryId: 'fish', filterId: 'new',
    name: '东海大黄鱼 (活鲜)', origin: '舟山', spec: '约500g/条',
    price: 128, originalPrice: 158, categoryId: 'fish',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3WRub62pTEkWDB7cW5kkbmL205Rgq81YNViaOi5EmeGnR2K4nRo-AXqKc4l5BEHhnwH16gC943SSpKgyqu4OHTp33x61y00XK92hzumzs_7nhQE4ifM1p1XM4sbs6Bp8Argm4XS6YstdRHNQBR8qDd9FDk2YL8yutVFUhFh3rxpMNM_oGFbwdJT_cUGPQVPiGnpAn9S0-o-AymhIEPKoz9Ou81SDth5mnNldUJ8kKLc5-TvPYRWsJxQ_3s-riH9DM3j-SZOB_CNbV',
    tag: '活鲜', tagStyle: 'fresh',
  },
  {
    id: 'fish-3', homeCategoryId: 'fish',
    name: '清蒸多宝鱼 (活鲜)', origin: '渤海', spec: '约600g/条',
    price: 98, categoryId: 'fish',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoKftTtG2gdJoD4UzJX16ttdDG97EH-guvgz3vafGtPc-vS9aYmIaMevLI4HEZc7sUmmIsGJ2amiMr-icQfFebvVejtoW-_ov76oYb_v1HtF2lJz-O21eBM5GrMFANVFbUFo8OOmgme3qXPJR9oellCXXStkAObHVZ0m8PqofsI-9raEub4DSU5sxSexiHs0-olxlXLMzKlPwgjNLTOxFobLnvw9Rqpp2lPEgXFL8a4PBPUAiibUJXbgSrxZMhiYeh62Rba2pDmFZS',
    tag: '今日捕捞', tagStyle: 'fresh',
  },
  // shrimp
  {
    id: 'shrimp-1', homeCategoryId: 'shrimp', filterId: 'tiger',
    name: '黑虎虾 (大号)', origin: '东南亚', spec: '约500g',
    price: 89, originalPrice: 108, categoryId: 'shrimp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwMLnfJkMCnpzGPcjhlyQPwin-QzB47weyVzXfTke7RaiWSo-AS8rxdgqnMGcOjeCsn2-tVwZB4eUFijbp7NcExUFkxm0j9mBfw0ltbZjELL78QqjN1BgIYUmxHayM9c5Lz-J4oZ7j9Ss04PUwRMQWI0PdCyvxUdPP-Qlj8tPkroDnSb-p1ckIEqka2_w_FPiGrVheq_RH6LFCNxruammxyYdR9Rgl_WCxklLcSS_YPjwPFTfQCi2WtfoY0bWsCE-6qUJH0DzT4AjZ',
    tag: '活鲜',
  },
  {
    id: 'shrimp-2', homeCategoryId: 'shrimp', filterId: 'white',
    name: '厄瓜多尔白虾', origin: '厄瓜多尔', spec: '30-40头/斤',
    price: 68, originalPrice: 88, categoryId: 'shrimp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwMLnfJkMCnpzGPcjhlyQPwin-QzB47weyVzXfTke7RaiWSo-AS8rxdgqnMGcOjeCsn2-tVwZB4eUFijbp7NcExUFkxm0j9mBfw0ltbZjELL78QqjN1BgIYUmxHayM9c5Lz-J4oZ7j9Ss04PUwRMQWI0PdCyvxUdPP-Qlj8tPkroDnSb-p1ckIEqka2_w_FPiGrVheq_RH6LFCNxruammxyYdR9Rgl_WCxklLcSS_YPjwPFTfQCi2WtfoY0bWsCE-6qUJH0DzT4AjZ',
    tag: '进口',
  },
  {
    id: 'shrimp-3', homeCategoryId: 'shrimp', filterId: 'boton',
    name: '牡丹虾', origin: '日本', spec: '约200g',
    price: 198, categoryId: 'shrimp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3Mvd5TGXACife2K-JbkZkefpUUqT8tPguabIaHX59MAk-UmLlFOwZkHnaAjTq5I2SDWBiI-hLADWAKgGCLciTjQXwqAxcVMlNLvqNnKJvFko_I0aACdGHb-Kg3kbjco8ECVWtR1F9r6r6hIrihQHD_EPQ7dn-D8kPV6p17ZrqYb0ZDIq6-UhJoGR5o3WS7kxCIwUbAydiLD7ukCIHqUB9jxRbawMi5bSAjqWPQ5NVbTuxUTy9QCYFVB3DVtgHS-TR3NDT1nWNIHvA',
    tag: '刺身级',
  },
  // crab
  {
    id: 'crab-1', homeCategoryId: 'crab', filterId: 'hairy', featured: true,
    name: '阳澄湖大闸蟹', origin: '江苏', spec: '特等雄蟹 4.5两/只',
    price: 128, originalPrice: 158, unit: '/ 只', categoryId: 'crab',
    description: '肉质鲜美，膏脂丰满',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgm3htVShDSiYC85p_7bJl7huqx-rlKa7zgkaePKBMXhXdhMJjfDPIqbr9mihQXJJPJEuiEVs7b3EV5Udyrvyiy1JT3Bh4PB86eTtiWUND-JqC4OW0-GWSGBQVCtPmyrUlgOCSWHXw0eFGC57jTFNbpLkkQYTMnKACQHOR3hpdqc9UHP0ly-cyuM9G2zvAvQ6M3G4QaLfBO5B1NSGKlmHd5kZDrtDFwt_T-FR-R6efyJC_ao7kg8KXcHy9pbNbOIRpjglVxehzlO68',
    tag: '捕捞季推荐', tagStyle: 'signature',
  },
  {
    id: 'crab-2', homeCategoryId: 'crab', filterId: 'shell',
    name: '北海道大帆立贝', origin: '日本', spec: '冷链直达',
    price: 89, categoryId: 'crab',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp5S3aC4w8w-61e_X3Vlafd8PDIv8z6IesbmWujR-VkzV6doMp7TyVcJgjidmBuX9T6i_5RXXDNzUoxg3VBhGMCtfCawPzrfvqN-JYtMfAF4Ytab-PcDoV7wiGEghDCA4l3e1G0GppTjcdpi6ZLyTQ8VMTUr4BOhTJrF1qGbNlZcHPKKAi39HFuslvsbf-KLrWYb2PlvaJEBZzcamoQZdn-DdMsA6BZ11Wr9ooK8VnwUW5Zo4iwoxF7m7GRRIfFKnWB6KO8f0_sN2n',
  },
  {
    id: 'crab-3', homeCategoryId: 'crab', filterId: 'shell',
    name: '吉拉多生蚝 N2', origin: '法国', spec: '6只装',
    price: 258, categoryId: 'crab',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZt_ocIFwEjYW6UgpatMNyUaIr6rjXQ-EUykVDJfVAWf7aTxPMdKdW4Pnzym7vdGimHSw8NemAdC7s4Qx3Geq_U3i5l4BDdHnZg6G5P95pi7yEwzo1vIe-dcb1yq7UM2xWSTmnxcW7ju5R9JbySky2GIyesD_CeCe46OE00xpRrgCRat9CEJ1_MGjDpLjDbhYwctDQnoePu3zJkKC15seApi2QaG2se7LNEwu0_BWgmEHDyh7Uy71We6u-uyvXa2AhIFabK7w8u_Am',
    tag: '进口', tagStyle: 'fresh',
  },
  // semi
  {
    id: 'semi-1', homeCategoryId: 'semi', filterId: 'hot',
    name: '蒜蓉粉丝蒸扇贝(半成品)', origin: '威海海域', spec: '6只装',
    price: 49.9, originalPrice: 68, categoryId: 'semi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxR9bpPfecHyAr7ihj08J4GanRWsdGfFNdba0GHyKvBd8stIYJQvLaZuiCzwtEzx04pW9xo_usLJLFp1fbLUg0Q83B4--b_XAvoByry3e4RHQn-Q01ur4sTmVCZJuY7EITydp4-UjDwytn_wL0XMUsbCzTP2KEV8Q6D59GEGvTyXYQ5-yQ3WouDVFAh92asbhK2le486lYBIBff7LpZZsssDzgFREvQ2ifVhUYWIsWmLUwjA2KzoITJzZSeD2OJ2f_9bAJXnK4DTVg',
    tag: '爆款', tagStyle: 'signature',
  },
  {
    id: 'semi-2', homeCategoryId: 'semi', filterId: 'season',
    name: '金汤酸菜鱼片', origin: '活鱼现片', spec: '450g',
    price: 35.8, originalPrice: 45, categoryId: 'semi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbwpWNzOzKB6ctzcRM9rFEZ8L3shTtWB4ufc91gVyuRd5BhSsKilYWFvAlsY5lcRftIKVWjGuXZjud7W_PEQlFvwoeNPNbDu_YmjgbVOnP-8J_ShhHGQUCx8Mqt6t9nmaDWcQe6egX1wZDwkxhECBGXtZMh1hQF8BWyfNAfYXJIdgAyz-oUW67OMhX8PmpikJi7kfFsFFHjBzakQGElOmQ8jhU9ogIXhZSznHh9bXWCHvDQfXuazS2c4VzqPaju3P00zMPdtaRCu8O',
    tag: '秘制金汤', tagStyle: 'fresh',
  },
  {
    id: 'semi-3', homeCategoryId: 'semi', filterId: 'hot',
    name: '虾仁水饺', origin: '手工包制', spec: '500g',
    price: 58, originalPrice: 72, categoryId: 'semi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVr5BeVS4IyuUownOWgTsBPXTninh9rn_tysQxB1pFwUkPMTZtpiZdRz-6g7hAoWG4U68Sab46bS7_5-UGVTPAgdwewXxTNE-C4179Hi7IFgwWVcLjN3iQw1Vslw-hJnaJSHwvEEJEOGPiO7A9bh0IGtrzkMjvVTUxH9vfoQmSGY052Zgc00nw1DvxalEJaHLd_fuPto97N_ASqP6e-g1Jfxd7BRpkgp_-787mh9TsSBIpQUnUlVw9IXK-EgcJhaOl8q6vm34vY-AX',
    tag: '整颗大虾仁',
  },
]

export function getCategoryPageConfig(id: string): ICategoryPageConfig | undefined {
  return categoryPageConfigs[id]
}

export function getCategoryListProducts(
  categoryId: string,
  filterId = 'all',
): ICategoryListProduct[] {
  return categoryListProducts.filter((p) => {
    if (p.homeCategoryId !== categoryId)
      return false
    if (filterId === 'all')
      return true
    return p.filterId === filterId
  })
}
```

**验证命令：**
```bash
cd /Users/sxl/development/小程序/miniprogram
pnpm exec vue-tsc --noEmit 2>&1 | head -20
```
预期：无 `home-category/data.ts` 相关类型错误；主包 `ocean.ts` 行数不变。

---

## Task 2: 创建 `src/pages-sub/home-category/components/category-hero.vue`

```vue
<script setup lang="ts">
import type { ICategoryHero } from '../data'

defineProps<{
  hero: ICategoryHero
}>()
</script>

<template>
  <view class="hero">
    <image class="hero-image" :src="hero.image" mode="aspectFill" />
    <view class="hero-overlay">
      <text class="hero-title">{{ hero.title }}</text>
      <text class="hero-subtitle">{{ hero.subtitle }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: 256rpx;
  margin-bottom: 48rpx;
  overflow: hidden;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 51, 102, 0.06);
}

.hero-image {
  width: 100%;
  height: 100%;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 32rpx;
  background: linear-gradient(90deg, rgba(0, 30, 64, 0.6) 0%, transparent 100%);
}

.hero-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.hero-subtitle {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #d5e3ff;
  line-height: 1.4;
}
</style>
```

---

## Task 3: 创建 `src/pages-sub/home-category/components/category-filter-chips.vue`

```vue
<script setup lang="ts">
import type { ICategoryFilter } from '../data'

defineProps<{
  filters: ICategoryFilter[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function select(id: string) {
  emit('update:modelValue', id)
}

function chipClass(id: string, active: string) {
  return id === active
    ? 'bg-primary-container text-[#799dd6] font-bold'
    : 'border border-outline-variant bg-surface-lowest text-on-surface-variant'
}
</script>

<template>
  <scroll-view scroll-x class="chip-scroll" :show-scrollbar="false">
    <view class="chip-row">
      <view
        v-for="filter in filters"
        :key="filter.id"
        class="chip shrink-0 rounded-full px-4 py-1.5 text-xs"
        :class="chipClass(filter.id, modelValue)"
        @tap="select(filter.id)"
      >
        {{ filter.label }}
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
.chip-scroll {
  width: 100%;
  margin-bottom: 48rpx;
  white-space: nowrap;
}

.chip-row {
  display: inline-flex;
  gap: 16rpx;
  padding-bottom: 8rpx;
}
</style>
```

---

## Task 4: 创建 `src/pages-sub/home-category/components/product-card-grid.vue`

网格商品卡，对齐设计稿方图 + 价格 + 圆形加购按钮。使用 scoped SCSS 避免小程序宽度溢出（参考 `vip-card.vue` 的 `width:0; flex:1` 经验，此处为单列/双列 grid 用 `box-sizing: border-box`）。

```vue
<script setup lang="ts">
import type { IProduct } from '~/data/ocean'
import { useCartStore } from '~/store'

defineProps<{
  product: IProduct
  compact?: boolean
}>()

const emit = defineEmits<{ tap: [] }>()
const { addItem } = useCartStore()

function tagClass(style?: string) {
  if (style === 'signature') return 'tag-signature'
  if (style === 'fresh') return 'tag-fresh'
  return 'tag-default'
}

function handleAdd(product: IProduct) {
  addItem(product)
  uni.showToast({ title: '已加入购物车', icon: 'none' })
}
</script>

<template>
  <view class="grid-card" :class="{ compact }" @tap="emit('tap')">
    <view class="grid-image-wrap">
      <image class="grid-image" :src="product.image" mode="aspectFill" />
      <view v-if="product.tag" class="grid-tag" :class="tagClass(product.tagStyle)">
        {{ product.tag }}
      </view>
    </view>
    <view class="grid-body">
      <text class="grid-name">{{ product.name }}</text>
      <text class="grid-meta">
        <template v-if="product.origin">产地：{{ product.origin }}</template>
        <template v-if="product.origin && product.spec"> · </template>
        <template v-if="product.spec">{{ product.spec }}</template>
      </text>
      <view class="grid-bottom">
        <view class="price-col">
          <view class="price-row">
            <text class="price">¥{{ product.price }}</text>
            <text v-if="product.unit" class="price-unit">{{ product.unit }}</text>
          </view>
          <text v-if="product.originalPrice" class="price-old">¥{{ product.originalPrice }}</text>
        </view>
        <view class="add-btn" @tap.stop="handleAdd(product)">
          <u-icon name="plus" color="#fff" size="14" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.grid-card {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  border-radius: 24rpx;
  background: #fff;
  box-shadow: 0 4rpx 20rpx rgba(0, 51, 102, 0.06);
}

.grid-image-wrap {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}

.grid-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.grid-tag {
  position: absolute;
  top: 16rpx;
  left: 16rpx;
  padding: 4rpx 16rpx;
  font-size: 20rpx;
  font-weight: 700;
  border-radius: 999rpx;
  color: #fff;
  background: #fe7e4f;
}

.tag-fresh { background: #fe7e4f; }
.tag-signature { background: #fe7e4f; }
.tag-default { background: #003366; color: #799dd6; }

.grid-body {
  padding: 24rpx;
}

.grid-name {
  display: block;
  overflow: hidden;
  font-size: 32rpx;
  font-weight: 700;
  color: #111c2d;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.grid-meta {
  display: block;
  margin-top: 8rpx;
  margin-bottom: 24rpx;
  font-size: 24rpx;
  color: #737780;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.grid-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16rpx;
}

.price-col {
  flex: 1;
  min-width: 0;
}

.price-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  white-space: nowrap;
}

.price {
  font-size: 44rpx;
  font-weight: 700;
  color: #a43c12;
  line-height: 1;
}

.price-unit {
  margin-left: 8rpx;
  font-size: 24rpx;
  color: #737780;
}

.price-old {
  display: block;
  margin-top: 4rpx;
  font-size: 20rpx;
  color: #737780;
  text-decoration: line-through;
}

.add-btn {
  flex-shrink: 0;
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999rpx;
  background: #fe7e4f;
  box-shadow: 0 8rpx 24rpx rgba(254, 126, 79, 0.25);
}

.compact .grid-body {
  padding: 16rpx;
}

.compact .grid-name {
  font-size: 28rpx;
}

.compact .price {
  font-size: 36rpx;
}
</style>
```

---

## Task 5: 创建 `src/pages-sub/home-category/components/product-card-featured.vue`

螃蟹贝类首条大卡（设计稿 `_3` 顶部 featured card）：

```vue
<script setup lang="ts">
import type { ICategoryListProduct } from '../data'
import { useCartStore } from '~/store'

const props = defineProps<{
  product: ICategoryListProduct
}>()

const emit = defineEmits<{ tap: [] }>()
const { addItem } = useCartStore()

function handleAdd() {
  addItem(props.product)
  uni.showToast({ title: '已加入购物车', icon: 'none' })
}
</script>

<template>
  <view class="featured-card" @tap="emit('tap')">
    <view class="featured-image-wrap">
      <image class="featured-image" :src="product.image" mode="aspectFill" />
      <view v-if="product.tag" class="featured-tag">{{ product.tag }}</view>
    </view>
    <view class="featured-body">
      <text class="featured-name">{{ product.name }}</text>
      <text v-if="product.description" class="featured-desc">{{ product.description }}</text>
      <view class="featured-bottom">
        <view class="price-col">
          <view class="price-row">
            <text class="price">¥ {{ product.price.toFixed(2) }}</text>
            <text v-if="product.unit" class="price-unit">{{ product.unit }}</text>
          </view>
          <text v-if="product.originalPrice" class="price-old">¥ {{ product.originalPrice.toFixed(2) }}</text>
        </view>
        <view class="cart-btn" @tap.stop="handleAdd">
          <u-icon name="shopping-cart" color="#799dd6" size="20" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.featured-card {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 32rpx;
  overflow: hidden;
  border-radius: 24rpx;
  background: #fff;
  box-shadow: 0 4rpx 20rpx rgba(0, 51, 102, 0.06);
}

.featured-image-wrap {
  position: relative;
  width: 100%;
  height: 384rpx;
}

.featured-image {
  width: 100%;
  height: 100%;
}

.featured-tag {
  position: absolute;
  top: 24rpx;
  left: 24rpx;
  padding: 8rpx 24rpx;
  font-size: 24rpx;
  font-weight: 700;
  color: #fff;
  background: #a43c12;
  border-radius: 999rpx;
}

.featured-body {
  padding: 32rpx;
}

.featured-name {
  display: block;
  font-size: 40rpx;
  font-weight: 600;
  color: #111c2d;
}

.featured-desc {
  display: block;
  margin-top: 8rpx;
  margin-bottom: 24rpx;
  font-size: 28rpx;
  color: #43474f;
  line-height: 1.5;
}

.featured-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.price-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  white-space: nowrap;
}

.price {
  font-size: 44rpx;
  font-weight: 700;
  color: #a43c12;
}

.price-unit {
  margin-left: 8rpx;
  font-size: 24rpx;
  color: #737780;
}

.price-old {
  display: block;
  margin-top: 4rpx;
  font-size: 20rpx;
  color: #737780;
  text-decoration: line-through;
}

.cart-btn {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999rpx;
  background: #003366;
  box-shadow: 0 8rpx 24rpx rgba(0, 51, 102, 0.15);
}
</style>
```

---

## Task 6: 创建分包二级页 `src/pages-sub/home-category/list/index.vue`

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AppHeader from '~/components/ocean/app-header.vue'
import CategoryFilterChips from '../components/category-filter-chips.vue'
import CategoryHero from '../components/category-hero.vue'
import ProductCardFeatured from '../components/product-card-featured.vue'
import ProductCardGrid from '../components/product-card-grid.vue'
import {
  getCategoryListProducts,
  getCategoryPageConfig,
} from '../data'
import { navigateTo } from '~/utils'

const categoryId = ref('fish')
const activeFilter = ref('all')

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '分类列表',
  },
})

onLoad((query) => {
  const id = (query?.id as string) || 'fish'
  categoryId.value = id
  activeFilter.value = 'all'
})

const config = computed(() => getCategoryPageConfig(categoryId.value))

const products = computed(() =>
  getCategoryListProducts(categoryId.value, activeFilter.value),
)

const featuredProduct = computed(() =>
  products.value.find(p => p.featured),
)

const gridProducts = computed(() =>
  products.value.filter(p => !p.featured),
)

const isGrid2 = computed(() => config.value?.layout === 'grid-2')

function goProductDetail(id: string) {
  navigateTo('/pages-sub/product/detail/index', { id })
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader
      :show-back="true"
      :show-cart="true"
      :title="config?.name ?? '分类'"
    />

    <scroll-view scroll-y class="box-border min-h-0 w-full flex-1" :show-scrollbar="false">
      <view class="px-4 pb-6 pt-4">
        <CategoryHero v-if="config?.hero" :hero="config.hero" />

        <view v-if="config?.sectionTitle" class="mb-6">
          <text class="block text-xl text-primary font-semibold">
            {{ config.sectionTitle }}
          </text>
          <text v-if="config.sectionSubtitle" class="mt-1 block text-sm text-on-surface-variant">
            {{ config.sectionSubtitle }}
          </text>
        </view>

        <CategoryFilterChips
          v-if="config?.filters"
          v-model="activeFilter"
          :filters="config.filters"
        />

        <ProductCardFeatured
          v-if="config?.layout === 'featured-grid' && featuredProduct"
          :product="featuredProduct"
          @tap="goProductDetail(featuredProduct.id)"
        />

        <view
          class="product-grid"
          :class="{ 'grid-2': isGrid2 }"
        >
          <ProductCardGrid
            v-for="product in gridProducts"
            :key="product.id"
            :product="product"
            :compact="isGrid2"
            @tap="goProductDetail(product.id)"
          />
        </view>

        <view
          v-if="config?.qualityNote"
          class="quality-note"
        >
          <view class="mb-2 flex items-center gap-2">
            <u-icon name="checkmark-circle-fill" color="#fe7e4f" size="18" />
            <text class="text-xs text-[#799dd6] font-medium tracking-wide uppercase">
              Freshness Guarantee
            </text>
          </view>
          <text class="mb-2 block text-xl text-white font-semibold">
            {{ config.qualityNote.title }}
          </text>
          <text class="block text-sm text-[#799dd6] leading-relaxed">
            {{ config.qualityNote.body }}
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.product-grid {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.product-grid.grid-2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24rpx;
}

.product-grid.grid-2 > :deep(.grid-card) {
  width: calc(50% - 12rpx);
}

.quality-note {
  margin-top: 48rpx;
  padding: 48rpx;
  border-radius: 24rpx;
  background: #003366;
}
</style>
```

**路由注册：** `scripts/sub-scan.ts` 扫描 `src/pages-sub` 下每个子目录为独立分包。新建 `pages-sub/home-category/` 后自动生成：

```json
{
  "root": "pages-sub/home-category",
  "pages": [{ "path": "list/index", "style": { "navigationStyle": "custom" } }]
}
```

无需手动改 `pages.json`。

**验证命令：**
```bash
pnpm dev:mp-weixin
# 检查分包是否生成
grep -A5 "home-category" dist/dev/mp-weixin/app.json
```
在微信开发者工具打开 `pages-sub/home-category/list/index?id=fish`，确认页面可访问且主包体积未因二级页组件增大。

---

## Task 7: 修改首页 `src/pages/home/index.vue` 跳转逻辑

将分类图标点击从 `goCategory()`（switchTab 到分类 Tab）改为按 `cat.id` 导航到二级页。

**删除或保留 `goCategory`：** 保留给弹窗「领券下单」使用，仅修改分类图标 `@tap`。

```typescript
function goCategoryList(id: string) {
  navigateTo('/pages-sub/home-category/list/index', { id })
}
```

模板修改（约第 114 行）：

```vue
<view
  v-for="cat in homeCategories"
  :key="cat.id"
  class="flex flex-col items-center gap-2"
  @tap="goCategoryList(cat.id)"
>
```

---

## Task 8: 样式与 lint 收尾

```bash
cd /Users/sxl/development/小程序/miniprogram
CI=true pnpm exec eslint \
  "src/pages/home/index.vue" \
  "src/pages-sub/home-category/data.ts" \
  "src/pages-sub/home-category/list/index.vue" \
  "src/pages-sub/home-category/components/category-hero.vue" \
  "src/pages-sub/home-category/components/category-filter-chips.vue" \
  "src/pages-sub/home-category/components/product-card-grid.vue" \
  "src/pages-sub/home-category/components/product-card-featured.vue" \
  --fix
```

对 UnoCSS class 排序报错的文件，运行项目已有的 sort 脚本（与 `mine/index.vue` 处理方式相同）。

---

## 手动测试清单

| 步骤 | 操作 | 预期 |
|---|---|---|
| 1 | 首页点击「活鲜鱼类」 | 进入二级页，标题「活鲜鱼类」，显示 Hero + 筛选 + 商品列表 |
| 2 | 首页点击「精品虾类」 | 双列网格，显示区块标题与横向子分类 Chip |
| 3 | 首页点击「螃蟹贝类」 | 顶部大卡 + 双列网格 |
| 4 | 首页点击「半成品」 | Hero + 列表 + 底部蓝色品质说明卡 |
| 5 | 点击筛选 Chip | 商品列表按 `filterId` 过滤 |
| 6 | 点击商品卡 | 跳转 `pages-sub/product/detail/index?id=xxx` |
| 7 | 点击加购按钮 | Toast「已加入购物车」，购物车数量增加 |
| 8 | 点击 Header 返回 | 回到首页 |
| 9 | 点击 Header 购物袋 | 跳转购物车 Tab |
| 10 | iPhone 刘海屏 | 商品卡不横向溢出，价格与单位同行 |

---

## Self-Review

**1. Spec coverage**
- [x] 四个首页分类入口 → Task 7 + Task 6 `onLoad(id)`
- [x] 对齐 `design/stitch_` 四份设计稿 → Task 1 配置 + Task 2~5 组件按 layout 分支
- [x] 与现有风格一致 → 复用 `AppHeader`、主题色 token、`useCartStore`、`navigateTo`
- [x] 二级页（非 Tab）→ 独立分包 `pages-sub/home-category/list`，页面/组件/数据均在分包内，减小主包压缩

**2. Placeholder scan**
- 无 TBD / TODO /「后续实现」类描述；每个 Task 均含完整代码。

**3. Type consistency**
- `ICategoryListProduct` 扩展 `IProduct`，`getCategoryListProducts` 返回类型与页面 `computed` 一致
- `categoryId` 与 `homeCategories.id`（fish/shrimp/crab/semi）一一对应

---

## Execution Handoff

Plan complete and saved to `docs/plans/2026-06-18-home-category-secondary-pages.md`. Two execution options:

**1. Inline Execution** — 在本会话按 Task 1→8 顺序实现，每完成 2~3 个 Task 编译验证一次。

**2. 单独会话** — 将本 plan 交给新会话，从 Task 1 开始逐条执行。

如需我开始实现，直接回复「开始执行」即可。
