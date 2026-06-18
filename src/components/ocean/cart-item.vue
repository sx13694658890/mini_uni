<script setup lang="ts">
import type { ICartItem } from '~/store/useCartStore'
import { useCartStore } from '~/store'

const props = defineProps<{
  item: ICartItem
}>()

const { updateQuantity, removeItem } = useCartStore()

function decrease() {
  updateQuantity(props.item.product.id, props.item.quantity - 1)
}

function increase() {
  updateQuantity(props.item.product.id, props.item.quantity + 1)
}
</script>

<template>
  <view class="cart-item">
    <image class="cart-image" :src="item.product.image" mode="aspectFill" />
    <view class="cart-body">
      <view class="cart-info">
        <view class="cart-top">
          <text class="cart-name">
            {{ item.product.name }}
          </text>
          <view class="delete-btn" @tap.stop="removeItem(item.product.id)">
            <u-icon name="trash" color="#737780" size="18" />
          </view>
        </view>
        <view v-if="item.product.origin" class="origin-tag">
          产地：{{ item.product.origin }}
        </view>
      </view>
      <view class="cart-bottom">
        <view class="price-wrap">
          <text class="price">
            ¥{{ item.product.price.toFixed(2) }}
          </text>
        </view>
        <view class="stepper">
          <view class="stepper-btn" @tap.stop="decrease">
            <u-icon name="minus" color="#001e40" size="10" />
          </view>
          <text class="stepper-num">
            {{ item.quantity }}
          </text>
          <view class="stepper-btn" @tap.stop="increase">
            <u-icon name="plus" color="#001e40" size="10" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 51, 102, 0.06);
  border: 1px solid rgba(195, 198, 209, 0.2);
}

.cart-image {
  width: 96px;
  height: 96px;
  border-radius: 8px;
  flex-shrink: 0;
  background: #e7eeff;
}

.cart-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart-info {
  min-width: 0;
}

.cart-top {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
}

.cart-name {
  flex: 1;
  min-width: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: #111c2d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-btn {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.origin-tag {
  display: inline-block;
  max-width: 100%;
  margin-top: 4px;
  padding: 2px 8px;
  font-size: 10px;
  color: #384953;
  background: #dee8ff;
  border-radius: 999px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-bottom {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  min-width: 0;
}

.price-wrap {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.price {
  display: block;
  overflow: hidden;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  color: #a43c12;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stepper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 1px 4px;
  margin-left: auto;
  background: #f0f3ff;
  border-radius: 999px;
  border: 1px solid rgba(195, 198, 209, 0.3);
}

.stepper-btn {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stepper-num {
  min-width: 14px;
  padding: 0 1px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #111c2d;
}
</style>
