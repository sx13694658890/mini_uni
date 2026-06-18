<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'
import CartFloatBar from '~/components/ocean/cart-float-bar.vue'
import ProductCardCategory from '~/components/ocean/product-card-category.vue'
import OceanTabBar from '~/components/ocean/tab-bar.vue'
import { categoryNav, categoryProducts } from '~/data/ocean'
import { navigateTo } from '~/utils'

const activeCategory = ref('all')

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '分类',
  },
})

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all')
    return categoryProducts
  return categoryProducts.filter(p => p.categoryId === activeCategory.value)
})

function goProductDetail(id: string) {
  navigateTo('/pages-sub/product/detail/index', { id })
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader />

    <view class="box-border min-h-0 w-full flex flex-1 overflow-hidden">
      <!-- Left Sidebar -->
      <scroll-view scroll-y class="box-border w-24 shrink-0 border-r border-outline-variant/30 bg-surface-low" :show-scrollbar="false">
        <view
          v-for="cat in categoryNav"
          :key="cat.id"
          class="relative box-border flex items-center justify-center px-2 py-4"
          :class="activeCategory === cat.id ? 'text-primary font-bold' : 'text-on-surface-variant'"
          @tap="activeCategory = cat.id"
        >
          <text class="text-center text-xs leading-[1.3]">
            {{ cat.name }}
          </text>
          <view
            v-if="activeCategory === cat.id"
            class="absolute bottom-[25%] right-0 top-[25%] w-1 rounded-l-[4px] bg-primary"
          />
        </view>
      </scroll-view>

      <!-- Right Content -->
      <scroll-view scroll-y class="box-border min-h-0 flex-1 bg-surface-lowest p-4" :show-scrollbar="false">
        <view class="mb-6">
          <text class="block text-xl text-primary-container font-semibold">
            全部菜品
          </text>
          <text class="mt-1 block text-xs text-outline">
            共为您找到 {{ filteredProducts.length }} 款极鲜美味
          </text>
        </view>
        <view class="w-full flex flex-col gap-6">
          <ProductCardCategory
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @tap="goProductDetail(product.id)"
          />
        </view>
        <view class="h-[calc(150px+env(safe-area-inset-bottom))]" />
      </scroll-view>
    </view>

    <CartFloatBar />
    <OceanTabBar />
  </view>
</template>
