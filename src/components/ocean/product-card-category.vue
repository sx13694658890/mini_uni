<script setup lang="ts">
import type { IProduct } from '~/data/ocean'
import { useCartStore } from '~/store'

defineProps<{
  product: IProduct
}>()

const emit = defineEmits<{ tap: [] }>()
const { addItem } = useCartStore()

function tagClass(style?: string) {
  if (style === 'signature')
    return 'tag-signature'
  if (style === 'fresh')
    return 'tag-fresh'
  return 'tag-default'
}

function handleAdd(product: IProduct) {
  addItem(product)
  uni.showToast({ title: '已加入购物车', icon: 'none' })
}
</script>

<template>
  <view class="product-row" @tap="emit('tap')">
    <image class="product-image" :src="product.image" mode="aspectFill" />
    <view class="product-body">
      <view class="product-info">
        <text class="product-name">
          {{ product.name }}
        </text>
        <text v-if="product.description" class="product-desc">
          {{ product.description }}
        </text>
        <view v-if="product.tag" class="product-tag" :class="tagClass(product.tagStyle)">
          {{ product.tag }}
        </view>
      </view>
      <view class="product-bottom">
        <view class="price-wrap">
          <text class="price">
            ¥{{ product.price }}
          </text>
          <text v-if="product.unit" class="price-unit">
            {{ product.unit }}
          </text>
        </view>
        <view class="add-btn" @tap.stop="handleAdd(product)">
          <u-icon name="plus" color="#fff" size="12" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.product-row {
  display: flex;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
}

.product-image {
  width: 96px;
  height: 96px;
  border-radius: 12px;
  flex-shrink: 0;
  border: 1px solid rgba(195, 198, 209, 0.2);
}

.product-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 4px 4px 0;
}

.product-info {
  min-width: 0;
}

.product-name {
  display: block;
  overflow: hidden;
  font-size: 16px;
  font-weight: 700;
  color: #111c2d;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-tag {
  display: inline-flex;
  margin-top: 8px;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 999px;
}

.tag-fresh {
  background: #dee8ff;
  color: #001e40;
}

.tag-signature {
  background: #ffdbcf;
  color: #822800;
}

.tag-default {
  background: #dee8ff;
  color: #001e40;
}

.product-desc {
  display: block;
  margin-top: 4px;
  font-size: 14px;
  color: #43474f;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-bottom {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  min-width: 0;
}

.price-wrap {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-wrap: nowrap;
  align-items: baseline;
  overflow: hidden;
  white-space: nowrap;
}

.price {
  flex-shrink: 0;
  font-size: 22px;
  font-weight: 700;
  color: #a43c12;
}

.price-unit {
  flex-shrink: 0;
  margin-left: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #737780;
}

.add-btn {
  flex-shrink: 0;
  margin-left: auto;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #fe7e4f;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(254, 126, 79, 0.25);
}
</style>
