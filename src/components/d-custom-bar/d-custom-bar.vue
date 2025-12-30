<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  fixed: { type: Boolean, default: true },
  fixedHolder: { type: Boolean, default: true },
  backgroundColor: { type: String, default: '' },
  color: { type: String, default: '#000000' },
  capsuleLeft: { type: Boolean, default: true },
  capsuleRight: { type: Boolean, default: true },
  capsuleLeftWidth: { type: Number, default: 0 },
  capsuleRightWidth: { type: Number, default: 0 },
  dCapsule: { type: Boolean, default: false },
  dCapsuleIconL: { type: String, default: 'back' },
  dCapsuleIconR: { type: String, default: 'home' },
  singleIcon: { type: Boolean, default: false },
  singleIconType: { type: String, default: 'back' },
  logo: { type: String, default: '' },
  title: { type: String, default: '' },
  navBarHeightCustom: { type: Number, default: 0 },
  stopDuiGoBack: { type: Boolean, default: false },
  logoRadius: { type: Number, default: 0 },
})

const emit = defineEmits<{ (e: 'clickBack', value: true): void, (e: 'clickCustom', value: true): void }>()

// state
const statusBarHeight = ref(20)
const navBarHeight = ref(60)
const menuRight = ref(7)
const menuBotton = ref(4)
const menuHeight = ref(32)
const menuWidth = ref(87)
const menuboxWidth = ref(101)
const toolBarWidth = ref(0)
const singleIconTypeHome = ref(true)

function getSysInfo() {
  try {
    const systemInfo = uni.getSystemInfoSync()
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()

    // 安全转换，规避可选字段导致的 undefined 问题
    const statusBar = Number((systemInfo as any).statusBarHeight ?? 20)
    const top = Number((menuButtonInfo as any).top ?? 0)
    const height = Number((menuButtonInfo as any).height ?? 32)
    const right = Number((menuButtonInfo as any).right ?? ((systemInfo as any).screenWidth ?? 375))
    const width = Number((menuButtonInfo as any).width ?? 88)
    const screenWidth = Number((systemInfo as any).screenWidth ?? 375)

    statusBarHeight.value = statusBar
    navBarHeight.value = (top - statusBar) * 2 + height + statusBar
    menuBotton.value = top - statusBar
    menuHeight.value = height
    menuRight.value = screenWidth - right
    menuboxWidth.value = width + menuRight.value * 2
    toolBarWidth.value = screenWidth - menuboxWidth.value
  }
  catch {
    // 兜底数据，确保 H5 或非微信平台不报错
    statusBarHeight.value = 20
    navBarHeight.value = 60
    menuBotton.value = 4
    menuHeight.value = 32
    menuRight.value = 7
    menuboxWidth.value = 101
    toolBarWidth.value = 375 - menuboxWidth.value
  }
}

function handleBack() {
  emit('clickBack', true)
  if (!props.stopDuiGoBack) {
    if (singleIconTypeHome.value) {
      // 首页时回到首页（使用 uni.reLaunch 保持跨平台类型安全）
      uni.reLaunch({ url: '/pages/home/index' })
    }
    else {
      uni.navigateBack()
    }
  }
}

function handleHome() {
  emit('clickCustom', true)
}

onMounted(() => {
  getSysInfo()
  const pages = getCurrentPages()
  singleIconTypeHome.value = pages.length === 1
})

// 暴露给模板使用的状态（<script setup> 自动暴露）
</script>

<template>
  <view class="custombar">
    <view
      class="d_nav"
      :style="{ position: fixed ? 'fixed' : 'relative', height: navBarHeightCustom ? `${navBarHeightCustom}px` : `${navBarHeight}px`, background: backgroundColor }"
    >
      <view
        class="tool_bar" :style="{
          marginTop: `${statusBarHeight + menuBotton}px`,
          height: `${menuHeight}px`,
          lineHeight: `${menuHeight}px`,
        }"
      >
        <view
          v-if="capsuleLeft" class="nav_left"
          :style="{ width: capsuleLeftWidth ? `${capsuleLeftWidth}px` : `${menuboxWidth}px` }"
        >
          <slot v-if="$slots.left" name="left" />
          <view
            v-else-if="dCapsule" class="capsule_left"
            :style="{ height: `${menuHeight}px`, width: `${menuWidth}px`, left: `${menuRight}px` }"
          >
            <view class="icon icon_left" @click="handleBack">
              <uni-icons
                color="#000000"
                :type="dCapsuleIconL" size="22"
              />
            </view>
            <view class="icon_line" />
            <view class="icon icon_right" @click="handleHome">
              <uni-icons
                color="#000000"
                :type="dCapsuleIconR" size="22"
              />
            </view>
          </view>
          <view
            v-else-if="singleIcon" class="single_icon"
            :style="{ height: `${menuHeight}px`, width: `${menuHeight}px`, left: `${menuRight}px` }"
          >
            <view class="icon" @click="handleBack">
              <!-- <uni-icons
                color="#000000"
                :type="singleIconTypeHome ? 'home' : singleIconType" size="22"
              /> -->
              <text class="i-icon-park-outline:left h-6 w-6" />
            </view>
          </view>
        </view>
        <view v-if="$slots.default" class="nav_center" :style="{ width: `${toolBarWidth - menuboxWidth}px` }">
          <slot name="default" />
        </view>
        <view v-else class="nav_center" :style="{ width: `${toolBarWidth - menuboxWidth}px` }">
          <view v-if="logo" class="nav_logo" :style="{ 'border-radius': `${logoRadius}rpx` }">
            <image :src="logo" mode="widthFix" />
          </view>
          <view class="nav_name" :style="{ color }">
            {{ title }}
          </view>
        </view>
        <view
          v-if="capsuleRight" class="nav_right"
          :style="{ width: capsuleRightWidth ? capsuleRightWidth : `${menuboxWidth}px` }"
        >
          <slot name="right" />
        </view>
      </view>
    </view>
    <!-- 占位用，使用fixed时生成一个盒子占位 -->
    <view
      v-if="fixed && fixedHolder" class="temp"
      :style="{ height: navBarHeightCustom ? `${navBarHeightCustom}px` : `${navBarHeight}px` }"
    />
  </view>
</template>

<style lang="scss" scoped>
.d_nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  overflow: hidden;
}

  .tool_bar {
    display: flex;
    flex-flow: row nowrap;
  }

  .nav_left {
    height: 100%;
    flex-shrink: 0;
    position: relative;
  }

  .nav_center {
    height: 100%;
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-flow: row nowrap;

    .nav_logo {
      width: 32px;
      height: 32px;
      overflow: hidden;
      flex-shrink: 0;
      margin-right: 10rpx;

      image {
        // display: block;
        width: 100%;
        height: 100%;
      }
    }

    .nav_name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      //font-weight: 600;
      /* #ifdef APP-PLUS */
      font-size: 34rpx;
      /* #endif */
      /* #ifndef APP-PLUS */
      font-size: 14px;
      /* #endif */
    }
  }

  .nav_right {
    height: 100%;
    flex-shrink: 0;
    position: relative;
  }

  .capsule_left {
    position: absolute;
    display: flex;
    align-items: center;
    border-radius: 50px;
    border: 0.5px solid rgba(204, 204, 204, 0.7);
    box-sizing: border-box;
    overflow: hidden;
    z-index: 1;

    .icon {
      width: 50%;
      padding-top: 2px;
      text-align: center;

      &:active {
        filter: brightness(0.7);
      }
    }

    .icon_line {
      width: 0.5px;
      height: 18px;
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .icon_left {
      padding-left: 5px;
    }

    .icon_right {
      padding-right: 5px;
    }
  }

  .single_icon {
    position: absolute;
    //border: 0.5px solid rgba(204, 204, 204, 0.7);
    box-sizing: border-box;
    border-radius: 50%;
    overflow: hidden;
    z-index: 1;

    .icon {
      width: 100%;
      height: 100%;
      // padding-top: 2px;
      text-align: center;

      &:active {
        filter: brightness(0.7);
      }
    }
  }
</style>
