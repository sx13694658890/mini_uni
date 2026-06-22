<script setup lang="ts">
import type { ISeasonalProduct } from '../data'
import { useCartStore } from '~/store'

defineProps<{
  product: ISeasonalProduct
}>()

const emit = defineEmits<{ tap: [] }>()
const { addItem } = useCartStore()

function handleBuy(product: ISeasonalProduct) {
  addItem(product)
  uni.showToast({ title: '已加入购物车', icon: 'none' })
}
</script>

<template>
  <view
    class="mb-24rpx box-border h-256rpx w-full flex overflow-hidden rounded-xl bg-surface-lowest shadow-[0_4rpx_15rpx_rgba(0,51,102,0.04)]"
    @tap="emit('tap')"
  >
    <view class="h-full w-1/3 shrink-0">
      <image class="h-full w-full" :src="product.image" mode="aspectFill" />
    </view>
    <view class="box-border min-w-0 flex flex-1 flex-col justify-between p-24rpx">
      <view>
        <view class="flex flex-wrap items-center gap-16rpx">
          <text class="text-30rpx text-on-surface font-semibold">
            {{ product.name }}
          </text>
          <view
            v-if="product.badge"
            class="border border-secondary/20 rounded bg-secondary/10 px-16rpx py-4rpx text-20rpx text-secondary"
          >
            {{ product.badge }}
          </view>
        </view>
        <text v-if="product.quote" class="mt-8rpx block text-22rpx text-on-surface-variant italic">
          {{ product.quote }}
        </text>
      </view>
      <view class="flex items-center justify-between">
        <view class="flex items-baseline">
          <text class="text-24rpx text-secondary font-bold">
            ¥
          </text>
          <text class="ml-4rpx text-44rpx text-secondary font-bold leading-none">
            {{ product.price }}
          </text>
        </view>
        <view
          class="rounded-full bg-primary-container px-32rpx py-12rpx text-24rpx text-white font-bold"
          @tap.stop="handleBuy(product)"
        >
          立即抢购
        </view>
      </view>
    </view>
  </view>
</template>
