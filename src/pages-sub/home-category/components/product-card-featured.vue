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
  <view
    class="mb-32rpx box-border w-full overflow-hidden rounded-[24rpx] bg-white shadow-[0_4rpx_20rpx_rgba(0,51,102,0.06)]"
    @tap="emit('tap')"
  >
    <view class="relative h-384rpx w-full">
      <image class="h-full w-full" :src="product.image" mode="aspectFill" />
      <view
        v-if="product.tag"
        class="absolute left-24rpx top-24rpx rounded-full bg-secondary px-24rpx py-8rpx text-24rpx text-white font-bold"
      >
        {{ product.tag }}
      </view>
    </view>
    <view class="p-32rpx">
      <text class="block text-40rpx text-on-surface font-semibold">
        {{ product.name }}
      </text>
      <text v-if="product.description" class="mb-24rpx mt-8rpx block text-28rpx text-on-surface-variant leading-normal">
        {{ product.description }}
      </text>
      <view class="flex items-end justify-between">
        <view class="min-w-0 flex-1">
          <view class="flex flex-nowrap items-baseline whitespace-nowrap">
            <text class="text-44rpx text-secondary font-bold">
              ¥ {{ product.price.toFixed(2) }}
            </text>
            <text v-if="product.unit" class="ml-8rpx text-24rpx text-outline">
              {{ product.unit }}
            </text>
          </view>
          <text v-if="product.originalPrice" class="mt-4rpx block text-20rpx text-outline line-through">
            ¥ {{ product.originalPrice.toFixed(2) }}
          </text>
        </view>
        <view
          class="h-80rpx w-80rpx flex shrink-0 items-center justify-center rounded-full bg-primary-container shadow-[0_8rpx_24rpx_rgba(0,51,102,0.15)]"
          @tap.stop="handleAdd"
        >
          <u-icon name="shopping-cart" color="#799dd6" size="20" />
        </view>
      </view>
    </view>
  </view>
</template>
