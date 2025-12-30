<script setup lang="ts">
withDefaults(defineProps<{ text?: string, backgroundColor?: string }>(), {
  backgroundColor: '#EFF4FA',
})
defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <view :style="{ backgroundColor }" class="box-border w-full flex flex-col justify-end px-4">
    <view class="h-8 flex items-center justify-center rounded-[60rpx] bg-[#2855B3] px-4 py-2" @click="$emit('click')">
      <text class="text-[32rpx] text-white font-600">
        {{ text }}
      </text>
    </view>
    <slot />
    <!-- 底部安全区占位 -->
    <!-- <view class="h-8"></view> -->
  </view>
</template>

<style lang="scss" scoped>

</style>
