<script setup lang="ts">
interface IProps {
  title: string
  type?: number
}
withDefaults(defineProps<Partial<IProps>>(), {
  title: 'card-info',
  type: 1,
})
</script>

<template>
  <view class="mb-[32rpx] rounded-[16rpx] bg-[#ffffff]">
    <view class="card_header">
      <view class="flex items-center pb-[28rpx] pl-[38rpx] pt-[32rpx]">
        <text :class="`${type === 1 ? 'i-custom-mmp' : 'i-custom-mp'}`" class="mr-[16rpx] mr-[22rpx] h-[48rpx] w-[48rpx]" />
        <text class="text-[32rpx] text-text-main font-[500]">
          {{ title }}
        </text>
      </view>
    </view>
    <view>
      <slot name="content" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
    .card_header{
    background: linear-gradient( -270deg, #C7D6F6 0%, rgba(255,255,255,0) 100%);
border-radius: 16rpx 16rpx 0rpx 0rpx;
    }
</style>
