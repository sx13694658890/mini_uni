<script setup lang="ts">
import type { SeasonalSort } from '../data'
import { computed, ref } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'
import { useNavBar } from '~/hooks'
import { navigateTo } from '~/utils'
import CategoryFilterChips from '../../home-category/components/category-filter-chips.vue'
import ProductCardGrid from '../../home-category/components/product-card-grid.vue'
import SeasonalFeaturedCard from '../components/seasonal-featured-card.vue'
import {
  getSeasonalFeatured,
  getSeasonalProducts,
  seasonalFilters,

} from '../data'

const activeCategory = ref('all')
const activeSort = ref<SeasonalSort>('composite')

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '时令推荐',
  },
})

const products = computed(() =>
  getSeasonalProducts(activeCategory.value, activeSort.value),
)

const featuredProduct = computed(() =>
  getSeasonalFeatured(activeCategory.value),
)

const { navBarHeight } = useNavBar()
const scrollHeight = computed(() => {
  const windowInfo = typeof uni.getWindowInfo === 'function'
    ? uni.getWindowInfo()
    : uni.getSystemInfoSync()
  return `${windowInfo.windowHeight - navBarHeight}px`
})

function sortClass(sort: SeasonalSort) {
  const active = activeSort.value === sort
    || (sort === 'price-asc' && activeSort.value === 'price-desc')
  return active
    ? 'text-primary font-bold'
    : 'text-on-surface-variant'
}

function togglePriceSort() {
  activeSort.value = activeSort.value === 'price-asc' ? 'price-desc' : 'price-asc'
}

function selectSort(sort: SeasonalSort) {
  if (sort === 'price-asc') {
    togglePriceSort()
    return
  }
  activeSort.value = sort
}

function goProductDetail(id: string) {
  navigateTo('/pages-sub/product/detail/index', { id })
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader
      :show-back="true"
      :show-cart="true"
      title="时令推荐"
    />

    <scroll-view
      scroll-y
      class="box-border w-full"
      :style="{ height: scrollHeight }"
      :show-scrollbar="false"
    >
      <view class="px-4 pb-6">
        <!-- Search -->
        <view class="py-16rpx">
          <view class="h-88rpx flex items-center gap-16rpx border border-outline-variant/30 rounded-xl bg-surface-low px-32rpx">
            <u-icon name="search" color="#737780" size="18" />
            <input
              class="min-w-0 flex-1 text-sm text-on-surface"
              placeholder="搜索当季鲜活好味..."
              placeholder-style="color: #737780"
            >
          </view>
        </view>

        <!-- Category Chips -->
        <CategoryFilterChips
          v-model="activeCategory"
          :filters="seasonalFilters"
        />

        <!-- Sort Bar -->
        <view class="mb-24rpx flex items-center justify-between border-b border-outline-variant/20 bg-surface py-24rpx">
          <view class="flex gap-48rpx">
            <view class="flex items-center gap-8rpx text-xs" :class="sortClass('composite')" @tap="selectSort('composite')">
              <text>综合</text>
              <u-icon v-if="activeSort === 'composite'" name="arrow-down-fill" color="#001e40" size="10" />
            </view>
            <view class="text-xs" :class="sortClass('sales')" @tap="selectSort('sales')">
              销量
            </view>
            <view class="flex items-center gap-4rpx text-xs" :class="sortClass('price-asc')" @tap="selectSort('price-asc')">
              <text>价格</text>
              <u-icon
                :name="activeSort === 'price-desc' ? 'arrow-down' : 'arrow-up'"
                color="#737780"
                size="10"
              />
            </view>
          </view>
          <view class="flex items-center gap-8rpx text-xs text-on-surface-variant">
            <text>筛选</text>
            <u-icon name="list" color="#737780" size="14" />
          </view>
        </view>

        <!-- Product Grid -->
        <view class="flex flex-row flex-wrap gap-24rpx">
          <view
            v-for="product in products"
            :key="product.id"
            class="box-border w-[calc(50%-12rpx)]"
          >
            <ProductCardGrid
              :product="product"
              :compact="true"
              @tap="goProductDetail(product.id)"
            />
          </view>
        </view>

        <!-- Featured Row -->
        <SeasonalFeaturedCard
          v-if="featuredProduct"
          :product="featuredProduct"
          @tap="goProductDetail(featuredProduct.id)"
        />
      </view>
    </scroll-view>
  </view>
</template>
