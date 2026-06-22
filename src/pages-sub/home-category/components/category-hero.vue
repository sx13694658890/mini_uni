<script setup lang="ts">
import type { ICategoryHero } from '../data'

defineProps<{
  hero: ICategoryHero
}>()
</script>

<template>
  <view class="relative mb-48rpx h-256rpx w-full overflow-hidden rounded-[24rpx] shadow-[0_4rpx_16rpx_rgba(0,51,102,0.06)]">
    <image class="h-full w-full" :src="hero.image" mode="aspectFill" />
    <view class="absolute inset-0 flex flex-col justify-center from-[rgba(0,30,64,0.6)] to-transparent bg-gradient-to-r px-32rpx">
      <text class="text-40rpx text-white font-bold leading-tight">
        {{ hero.title }}
      </text>
      <text class="mt-8rpx text-24rpx text-[#d5e3ff] leading-snug">
        {{ hero.subtitle }}
      </text>
    </view>
  </view>
</template>
