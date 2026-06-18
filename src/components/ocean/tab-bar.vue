<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useCartStore } from '~/store'

const tabs = [
  { path: '/pages/home/index', text: '首页', icon: '/static/tab/icons/home.svg' },
  { path: '/pages/category/index', text: '分类', icon: '/static/tab/icons/category.svg' },
  { path: '/pages/cart/index', text: '购物车', icon: '/static/tab/icons/cart.svg' },
  { path: '/pages/mine/index', text: '我的', icon: '/static/tab/icons/mine.svg' },
]

const current = ref(0)
const { count } = useCartStore()

function syncCurrent() {
  const pages = getCurrentPages()
  const route = `/${pages[pages.length - 1]?.route || ''}`
  const index = tabs.findIndex(tab => tab.path === route)
  if (index >= 0)
    current.value = index
}

onShow(() => {
  uni.hideTabBar({ animation: false })
  syncCurrent()
})

function switchTab(index: number) {
  if (current.value === index)
    return
  current.value = index
  uni.switchTab({ url: tabs[index].path })
}
</script>

<template>
  <view class="tab-bar">
    <view
      v-for="(tab, index) in tabs"
      :key="tab.path"
      class="tab-item"
      :class="{ active: current === index }"
      @tap="switchTab(index)"
    >
      <view class="tab-icon-wrap">
        <image class="tab-icon" :src="tab.icon" mode="aspectFit" />
        <view v-if="index === 2 && count > 0 && current !== 2" class="cart-badge">
          {{ count > 99 ? '99+' : count }}
        </view>
      </view>
      <text class="tab-text" :class="{ active: current === index }">
        {{ tab.text }}
      </text>
      <view v-if="current === index" class="tab-dot" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: calc(50px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  background: #f9f9ff;
  border-top: 1px solid #c3c6d1;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 10px rgba(0, 51, 102, 0.05);
  box-sizing: border-box;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding-top: 4px;
}

.tab-icon-wrap {
  position: relative;
  width: 24px;
  height: 24px;
}

.tab-icon {
  width: 24px;
  height: 24px;
}

.tab-text {
  font-size: 10px;
  line-height: 1;
  font-weight: 500;
  color: #43474f;
}

.tab-text.active {
  font-weight: 700;
  color: #001e40;
}

.tab-dot {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: #001e40;
  margin-top: 2px;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -8px;
  min-width: 14px;
  height: 14px;
  padding: 0 3px;
  background: #fe7e4f;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f9f9ff;
}
</style>
