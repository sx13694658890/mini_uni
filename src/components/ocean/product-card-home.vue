<script setup lang="ts">
import type { IProduct } from '~/data/ocean'
import { useCartStore } from '~/store'

defineProps<{
  product: IProduct
}>()

const emit = defineEmits<{ tap: [] }>()
const { addItem } = useCartStore()

function handleAdd(product: IProduct) {
  addItem(product)
  uni.showToast({ title: '已加入购物车', icon: 'none' })
}
</script>

<template>
  <view class="product-card" @tap="emit('tap')">
    <image class="product-image" :src="product.image" mode="aspectFill" />
    <view class="product-body">
      <view class="product-top">
        <text class="product-name">
          {{ product.name }}
        </text>
        <view v-if="product.tag" class="product-tag">
          {{ product.tag }}
        </view>
      </view>
      <text class="product-meta">
        产地：{{ product.origin }} · {{ product.spec }}
      </text>
      <view class="product-bottom">
        <view class="price-wrap">
          <text class="price">
            ¥{{ product.price.toFixed(2) }}
          </text>
          <text v-if="product.originalPrice" class="price-old">
            ¥{{ product.originalPrice.toFixed(2) }}
          </text>
        </view>
        <view class="add-btn" @tap.stop="handleAdd(product)">
          <u-icon name="plus" color="#fff" size="14" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.product-card {
  display: flex;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 51, 102, 0.06);
}

.product-image {
  width: 128px;
  height: 128px;
  flex-shrink: 0;
}

.product-body {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.product-name {
  font-size: 16px;
  font-weight: 700;
  color: #111c2d;
  line-height: 1.3;
}

.product-tag {
  flex-shrink: 0;
  padding: 2px 8px;
  font-size: 10px;
  color: #001e40;
  background: #f0f3ff;
  border: 1px solid #c3c6d1;
  border-radius: 999px;
}

.product-meta {
  font-size: 12px;
  color: #737780;
  margin-top: 4px;
}

.product-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.price-wrap {
  display: flex;
  flex-direction: column;
}

.price {
  font-size: 22px;
  font-weight: 700;
  color: #a43c12;
  line-height: 1;
}

.price-old {
  font-size: 10px;
  color: #737780;
  text-decoration: line-through;
  margin-top: 2px;
}

.add-btn {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #fe7e4f;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(254, 126, 79, 0.3);
}
</style>
