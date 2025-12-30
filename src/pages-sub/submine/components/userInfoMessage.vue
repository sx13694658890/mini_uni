<script setup lang="ts">
import type { IProps } from '../types/index.type'

interface IType {
  contentInfo?: IProps
}
withDefaults(defineProps<IType>(), {
  contentInfo: () => ({
    '姓名:': '',
    '性别:': '',
    '身份证号:': '',
    '手机号:': '',
    '关系:': '',
  }),
})
</script>

<template>
  <view class="mb-[28rpx] box-border pb-[54rpx] pl-[38rpx] pt-[32rpx]">
    <view v-for="(value, key) in contentInfo" :key="key">
      <text class="mr-[16rpx] text-[28rpx] text-text-content font-[500]">
        {{ key }}
      </text>
      <text class="text-[28rpx] text-text-main font-[500]">
        {{ value }}
      </text>
    </view>
  </view>
</template>

<style lang="scss" scoped>

</style>
