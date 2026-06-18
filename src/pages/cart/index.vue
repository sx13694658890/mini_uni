<script setup lang="ts">
import AppHeader from '~/components/ocean/app-header.vue'
import CartItem from '~/components/ocean/cart-item.vue'
import OceanTabBar from '~/components/ocean/tab-bar.vue'
import { useCartStore } from '~/store'

const { items, subtotal, total, deliveryFee, count } = useCartStore()

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '购物车',
  },
})

function checkout() {
  uni.showToast({ title: '结算功能开发中', icon: 'none' })
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader />

    <scroll-view scroll-y class="box-border min-h-0 w-full flex-1" :show-scrollbar="false">
      <view class="box-border w-full px-4 py-3 pb-6">
        <!-- Delivery -->
        <view class="mb-6 box-border w-full flex items-center gap-4 border border-outline-variant/30 rounded-xl bg-surface-low p-4">
          <view class="h-12 w-12 flex shrink-0 items-center justify-center rounded-full bg-primary/10">
            <u-icon name="car" color="#001e40" size="24" />
          </view>
          <view class="min-w-0 flex-1">
            <text class="block text-xs text-on-surface-variant">
              预计送达时间
            </text>
            <text class="mt-0.5 block text-xl text-primary font-semibold leading-[1.3]">
              今天 17:30 - 18:00
            </text>
          </view>
        </view>

        <!-- Cart Items -->
        <view class="mb-6 box-border w-full">
          <view class="mb-3 flex items-center gap-1">
            <text class="text-xl text-primary font-semibold">
              已选商品
            </text>
            <text class="text-sm text-on-surface-variant font-normal">
              ({{ count }}件)
            </text>
          </view>
          <view class="w-full flex flex-col gap-3">
            <CartItem v-for="item in items" :key="item.product.id" :item="item" />
          </view>
        </view>

        <!-- Coupon -->
        <view class="box-border w-full flex items-center justify-between border border-outline-variant/10 rounded-xl bg-surface-lowest p-4 shadow-[0_4px_20px_rgba(0,51,102,0.06)]">
          <view class="min-w-0 flex items-center gap-2">
            <u-icon name="coupon" color="#a43c12" size="20" />
            <text class="text-sm text-on-surface">
              优惠券
            </text>
          </view>
          <view class="flex shrink-0 items-center gap-0.5">
            <text class="text-xs text-on-surface-variant">
              暂无可用
            </text>
            <u-icon name="arrow-right" color="#737780" size="14" />
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- Checkout Footer -->
    <view class="fixed bottom-[calc(50px+env(safe-area-inset-bottom))] left-0 right-0 z-80 box-border w-full border-t border-outline-variant/30 bg-surface-lowest p-4">
      <view class="mb-4">
        <view class="mb-2 flex items-center justify-between text-sm text-on-surface-variant">
          <text>商品小计</text>
          <text>¥{{ subtotal.toFixed(2) }}</text>
        </view>
        <view class="flex items-center justify-between text-sm text-on-surface-variant">
          <text>配送费 (顺丰冷链)</text>
          <text>¥{{ deliveryFee.toFixed(2) }}</text>
        </view>
      </view>
      <view class="flex items-center justify-between gap-3">
        <view class="shrink-0">
          <text class="block text-[10px] text-on-surface-variant font-medium">
            总计 (含运费)
          </text>
          <view class="flex items-baseline gap-0.5">
            <text class="text-sm text-secondary font-bold">
              ¥
            </text>
            <text class="text-[28px] text-secondary font-bold leading-none">
              {{ total.toFixed(2) }}
            </text>
          </view>
        </view>
        <view
          class="max-w-[220px] min-w-0 flex-1 rounded-xl bg-secondary px-5 py-3.5 text-center text-base text-white font-semibold shadow-[0_4px_16px_rgba(164,60,18,0.25)]"
          @tap="checkout"
        >
          立即结算
        </view>
      </view>
    </view>

    <OceanTabBar />
  </view>
</template>
