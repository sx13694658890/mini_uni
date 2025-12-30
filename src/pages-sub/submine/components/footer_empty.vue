<script setup lang="ts">
withDefaults(defineProps<{ text?: string }>(), {})
defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <view class="box-border w-full flex flex-col justify-end bg-[#EFF4FA] px-4">
    <view class="flex items-center justify-center px-4">
      <text class="text-[28rpx] text-[#999999] font-400 font-[400]">
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
