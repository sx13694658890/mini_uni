<script setup lang="ts">
import { computed } from 'vue'
import { useNavBar } from '~/hooks/useNavBar'

withDefaults(defineProps<{
  showBack?: boolean
  showMenu?: boolean
  showCart?: boolean
  rightIcon?: string
  title?: string
}>(), {
  showBack: false,
  showMenu: false,
  showCart: false,
  rightIcon: '',
  title: '海味鲜 Ocean Fresh',
})

const emit = defineEmits<{
  rightClick: []
}>()

const {
  statusBarHeight,
  navBarHeight,
  navContentGap,
  menuButton,
  sideWidth,
} = useNavBar()

const headerWrapStyle = computed(() => ({
  paddingTop: `${statusBarHeight}px`,
  height: `${navBarHeight}px`,
}))

const headerInnerStyle = computed(() => ({
  height: `${menuButton.height}px`,
  marginTop: `${navContentGap}px`,
}))

const sideStyle = computed(() => ({
  width: `${sideWidth}px`,
}))

function goBack() {
  uni.navigateBack()
}

function goCart() {
  uni.switchTab({ url: '/pages/cart/index' })
}
</script>

<template>
  <view class="header-wrap" :style="headerWrapStyle">
    <view class="header-inner" :style="headerInnerStyle">
      <view class="header-side header-side-left" :style="sideStyle">
        <view v-if="showBack" class="icon-btn" @tap="goBack">
          <u-icon name="arrow-left" color="#001e40" size="20" />
        </view>
        <view v-else-if="showMenu" class="icon-btn">
          <u-icon name="list" color="#001e40" size="22" />
        </view>
      </view>

      <view class="header-title-wrap">
        <text class="header-title">
          {{ title }}
        </text>
      </view>

      <view class="header-side header-side-right" :style="sideStyle">
        <view v-if="showCart" class="icon-btn" @tap="goCart">
          <u-icon name="bag" color="#001e40" size="22" />
        </view>
        <view v-else-if="rightIcon" class="icon-btn" @tap="emit('rightClick')">
          <u-icon :name="rightIcon" color="#001e40" size="20" />
        </view>
      </view>
    </view>
  </view>
  <view class="header-placeholder" :style="{ height: `${navBarHeight}px` }" />
</template>

<style lang="scss" scoped>
.header-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-sizing: border-box;
  background: #f9f9ff;
  box-shadow: 0 1px 0 rgba(0, 30, 64, 0.06);
}

.header-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.header-side {
  flex-shrink: 0;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 2;
}

.header-side-left {
  padding-left: 16px;
  box-sizing: border-box;
}

.header-side-right {
  justify-content: flex-end;
  padding-right: 16px;
  box-sizing: border-box;
}

.header-title-wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
}

.header-title {
  max-width: 60%;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  color: #001e40;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.icon-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  pointer-events: auto;
}

.header-placeholder {
  width: 100%;
  flex-shrink: 0;
}
</style>
