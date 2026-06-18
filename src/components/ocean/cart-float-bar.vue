<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '~/store'

const { total, count } = useCartStore()

const TAB_BAR_HEIGHT = 50
const FLOAT_GAP = 16

const bottomOffset = computed(() => {
  const { safeAreaInsets } = uni.getSystemInfoSync()
  const safeBottom = safeAreaInsets?.bottom || 0
  return TAB_BAR_HEIGHT + safeBottom + FLOAT_GAP
})

function goCheckout() {
  uni.switchTab({ url: '/pages/cart/index' })
}
</script>

<template>
  <view
    v-if="count > 0"
    class="float-bar"
    :style="{ bottom: `${bottomOffset}px` }"
  >
    <view class="float-left">
      <view class="basket-wrap">
        <u-icon name="shopping-cart" color="#fff" size="22" />
        <view class="badge">
          {{ count > 99 ? '99+' : count }}
        </view>
      </view>
      <view class="float-text">
        <text class="float-price">
          ¥{{ total.toFixed(2) }}
        </text>
        <text class="float-tip">
          已含配送费 ¥5.00
        </text>
      </view>
    </view>
    <view class="checkout-btn" @tap="goCheckout">
      去结算
    </view>
  </view>
</template>

<style lang="scss" scoped>
.float-bar {
  position: fixed;
  left: 5%;
  right: 5%;
  width: 90%;
  z-index: 998;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #003366;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 30, 64, 0.25);
}

.float-left {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.basket-wrap {
  position: relative;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: #fe7e4f;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.float-text {
  flex: 1;
  min-width: 0;
}

.float-price {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.float-tip {
  display: block;
  font-size: 10px;
  color: #799dd6;
  margin-top: 2px;
}

.checkout-btn {
  flex-shrink: 0;
  margin-left: 12px;
  padding: 8px 24px;
  background: #fe7e4f;
  color: #6b1f00;
  font-size: 12px;
  font-weight: 700;
  border-radius: 999px;
  white-space: nowrap;
}
</style>
