<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'
import { useNavBar } from '~/hooks'
import { navigateTo } from '~/utils'
import CategoryFilterChips from '../components/category-filter-chips.vue'
import CategoryHero from '../components/category-hero.vue'
import ProductCardFeatured from '../components/product-card-featured.vue'
import ProductCardGrid from '../components/product-card-grid.vue'
import {
  getCategoryListProducts,
  getCategoryPageConfig,
} from '../data'

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
const isFeaturedGrid = computed(() => config.value?.layout === 'featured-grid')
const isCompactGrid = computed(() => isGrid2.value || isFeaturedGrid.value)

const { navBarHeight } = useNavBar()
const scrollHeight = computed(() => {
  const windowInfo = typeof uni.getWindowInfo === 'function'
    ? uni.getWindowInfo()
    : uni.getSystemInfoSync()
  return `${windowInfo.windowHeight - navBarHeight}px`
})

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

    <scroll-view
      scroll-y
      class="box-border w-full"
      :style="{ height: scrollHeight }"
      :show-scrollbar="false"
    >
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
          v-if="isFeaturedGrid && featuredProduct"
          :product="featuredProduct"
          @tap="goProductDetail(featuredProduct.id)"
        />

        <view
          class="flex flex-col gap-32rpx"
          :class="{ 'flex-row flex-wrap gap-24rpx': isCompactGrid }"
        >
          <view
            v-for="product in gridProducts"
            :key="product.id"
            class="box-border w-full"
            :class="{ 'w-[calc(50%-12rpx)]': isCompactGrid }"
          >
            <ProductCardGrid
              :product="product"
              :compact="isCompactGrid"
              @tap="goProductDetail(product.id)"
            />
          </view>
        </view>

        <view
          v-if="config?.qualityNote"
          class="mt-48rpx rounded-[24rpx] bg-primary-container p-48rpx"
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
