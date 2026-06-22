<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'
import { detailProduct } from '~/data/ocean'
import { useCartStore } from '~/store'
import ProductHero3d from '../components/product-hero-3d.vue'

const { addItem } = useCartStore()

const spiciness = ref('medium')
const portion = ref('regular')

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '商品详情',
  },
})

function selectSpiciness(value: string) {
  spiciness.value = value
}

function selectPortion(value: string) {
  portion.value = value
}

function spicinessOptionClass(value: string) {
  return spiciness.value === value
    ? 'border-secondary bg-[var(--of-secondary-fixed)] text-[var(--of-on-secondary-fixed-variant)] font-bold'
    : 'border-outline-variant text-primary'
}

function portionOptionClass(value: string) {
  return portion.value === value
    ? 'border-secondary bg-[var(--of-secondary-fixed)]'
    : 'border-outline-variant'
}

function portionTitleClass(value: string) {
  return portion.value === value
    ? 'text-[var(--of-on-secondary-fixed-variant)]'
    : 'text-primary'
}

function addToCart() {
  addItem({
    id: detailProduct.id,
    name: detailProduct.name,
    origin: '',
    spec: '',
    price: detailProduct.price,
    image: detailProduct.image,
  })
  uni.showToast({ title: '已加入购物车', icon: 'none' })
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader show-back title="商品详情" />

    <scroll-view scroll-y class="box-border min-h-0 w-full flex-1" :show-scrollbar="false">
      <!-- Hero Image 3D -->
      <ProductHero3d :image="detailProduct.image" />

      <!-- Detail Card -->
      <view class="relative rounded-t-[32px] bg-surface-lowest p-6 shadow-[0_-10px_25px_rgba(0,51,102,0.08)] -mt-8">
        <view class="mb-4 flex items-start justify-between">
          <view class="flex-1">
            <text class="block text-2xl text-primary font-bold">
              {{ detailProduct.name }}
            </text>
          </view>
          <view class="text-right">
            <view class="flex justify-end gap-0.5">
              <u-icon v-for="i in 4" :key="i" name="star-fill" color="#fe7e4f" size="14" />
              <u-icon name="star" color="#fe7e4f" size="14" />
            </view>
            <text class="text-xs text-on-surface-variant">
              {{ detailProduct.rating }} ({{ detailProduct.reviews }} 评价)
            </text>
          </view>
        </view>

        <view class="mb-6 flex items-baseline gap-2">
          <text class="text-[22px] text-secondary font-bold">
            ¥{{ detailProduct.price.toFixed(2) }}
          </text>
          <text class="text-xs text-on-surface-variant line-through">
            ¥{{ detailProduct.originalPrice.toFixed(2) }}
          </text>
          <view class="ml-auto rounded bg-[var(--of-secondary-fixed)] px-2 py-0.5 text-[10px] text-[var(--of-on-secondary-fixed-variant)] font-bold">
            限时优惠
          </view>
        </view>

        <view class="mb-6">
          <text class="mb-2 block text-sm text-primary font-bold">
            甄选描述
          </text>
          <text class="text-sm text-on-surface-variant leading-[1.7]">
            {{ detailProduct.description }}
          </text>
        </view>

        <!-- Spiciness -->
        <view class="mb-6">
          <view class="mb-3 flex items-center gap-2 text-sm text-primary font-bold">
            <u-icon name="fire" color="#fe7e4f" size="18" />
            <text>选择辣度</text>
          </view>
          <view class="flex flex-wrap gap-3">
            <view
              v-for="item in [{ v: 'mild', l: '微辣' }, { v: 'medium', l: '中辣' }, { v: 'extra', l: '特辣' }]"
              :key="item.v"
              class="box-border border-2 rounded-xl px-6 py-2.5 text-sm"
              :class="spicinessOptionClass(item.v)"
              @tap="selectSpiciness(item.v)"
            >
              {{ item.l }}
            </view>
          </view>
        </view>

        <!-- Portion -->
        <view class="mb-6">
          <view class="mb-3 flex items-center gap-2 text-sm text-primary font-bold">
            <u-icon name="bag" color="#003366" size="18" />
            <text>份量大小</text>
          </view>
          <view class="flex gap-3">
            <view
              class="box-border flex flex-1 flex-col items-center gap-1 border-2 rounded-2xl p-4"
              :class="portionOptionClass('regular')"
              @tap="selectPortion('regular')"
            >
              <text class="text-sm font-bold" :class="portionTitleClass('regular')">
                标准份
              </text>
              <text class="text-[10px] text-on-surface-variant opacity-70">
                约 500g
              </text>
            </view>
            <view
              class="box-border flex flex-1 flex-col items-center gap-1 border-2 rounded-2xl p-4"
              :class="portionOptionClass('large')"
              @tap="selectPortion('large')"
            >
              <text class="text-sm font-bold" :class="portionTitleClass('large')">
                加量份
              </text>
              <text class="text-[10px] text-on-surface-variant opacity-70">
                约 800g (+¥25)
              </text>
            </view>
          </view>
        </view>

        <!-- Info Grid -->
        <view class="grid grid-cols-3 mb-6 gap-4">
          <view class="rounded-2xl bg-surface-low p-4 text-center shadow-[0_2px_4px_rgba(0,51,102,0.04)]">
            <u-icon name="clock" color="#003366" size="20" />
            <text class="my-1 block text-[10px] text-on-surface-variant">
              烹饪时长
            </text>
            <text class="block text-sm text-primary font-bold">
              15 分钟
            </text>
          </view>
          <view class="rounded-2xl bg-surface-low p-4 text-center shadow-[0_2px_4px_rgba(0,51,102,0.04)]">
            <u-icon name="star" color="#003366" size="20" />
            <text class="my-1 block text-[10px] text-on-surface-variant">
              热量
            </text>
            <text class="block text-sm text-primary font-bold">
              340 千卡
            </text>
          </view>
          <view class="rounded-2xl bg-surface-low p-4 text-center shadow-[0_2px_4px_rgba(0,51,102,0.04)]">
            <u-icon name="checkmark-circle" color="#003366" size="20" />
            <text class="my-1 block text-[10px] text-on-surface-variant">
              食材来源
            </text>
            <text class="block text-sm text-primary font-bold">
              有机自产
            </text>
          </view>
        </view>
      </view>

      <view class="h-[calc(100px+env(safe-area-inset-bottom))]" />
    </scroll-view>

    <!-- Bottom Action Bar -->
    <view class="fixed bottom-0 left-0 right-0 z-[100] box-border flex items-center gap-3 border-t border-outline-variant bg-surface-lowest p-4 pb-[calc(16px+env(safe-area-inset-bottom))] shadow-[0_-8px_20px_rgba(0,51,102,0.05)]">
      <view class="shrink-0">
        <text class="block text-[10px] text-on-surface-variant font-bold">
          总计
        </text>
        <text class="text-2xl text-secondary font-bold">
          ¥{{ detailProduct.price.toFixed(2) }}
        </text>
      </view>
      <view
        class="h-14 flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary-container text-sm font-bold shadow-[0_4px_16px_rgba(0,51,102,0.2)]"
        @tap="addToCart"
      >
        <u-icon name="shopping-cart" color="#799dd6" size="18" />
        <text class="text-[#799dd6]">
          加入购物车
        </text>
      </view>
      <view class="h-14 w-14 flex items-center justify-center border-2 border-primary rounded-2xl">
        <u-icon name="bag" color="#001e40" size="20" />
      </view>
    </view>
  </view>
</template>
