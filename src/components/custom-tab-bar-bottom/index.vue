<script lang="ts" setup>
withDefaults(defineProps<{
  selectValue?: string
}>(), {
  selectValue: '0',
})
const emits = defineEmits<{
  (e: 'change', name: string): void
  (e: 'clickCenter', name: string): void
}>()
function handlerChange(name: string) {
  emits('change', name)
  if (name === '0') {
    uni.redirectTo({
      url: '/pages/test/index',
    })
  }
  else if (name === '2') {
    uni.redirectTo({
      url: '/pages/testMine/index',
    })
  }
}
function handleCenterClick() {
  emits('clickCenter', '1')
  console.log('中间按钮被点击')
  uni.showToast({
    title: '中间按钮被点击',
    icon: 'none',
  })
}
</script>

<template>
  <up-tabbar
    :value="selectValue"
    :fixed="true"
    :placeholder="true"
    :safe-area-inset-bottom="true"
    @change="handlerChange"
  >
    <up-tabbar-item name="0" text="首页" icon="home" />
    <!-- 使用正确的插槽方式实现中间圆形大按钮 -->
    <up-tabbar-item
      name="1"
      mode="midButton"
      @click="handleCenterClick"
    >
      <!-- 激活状态的图标插槽 -->
      <template #active-icon>
        <view class="] m-auto h-[70rpx] w-[70rpx] flex transform-scale-[1.1] items-center justify-center rounded-full bg-[linear-gradient(135deg,_#ff6b6b,_#ee5a52)] transition-all duration-300 ease-in-out">
          <view class="circle-content">
            <up-icon name="plus" color="#2979ff" size="28" />
          </view>
        </view>
      </template>
      <!-- 非激活状态的图标插槽 -->
      <template #inactive-icon>
        <view class="m-auto h-[70rpx] w-[70rpx] flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#ccc,#999)] opacity-80 transition-all duration-300 ease-in-out">
          <view class="circle-content">
            <up-icon name="plus" color="#2979ff" size="28" />
          </view>
        </view>
      </template>

      <!-- 文本插槽（中间按钮通常不需要文本） -->
      <template #text>
        <!-- 这里可以留空或者放置其他内容 -->
      </template>
    </up-tabbar-item>

    <up-tabbar-item name="2" text="我的" icon="account" />
  </up-tabbar>
</template>

<style lang="scss" scoped>
 :deep(.u-tabbar-item--mid-button-cover){
        background-color: rgba(0,0,0,0);
    }
</style>
