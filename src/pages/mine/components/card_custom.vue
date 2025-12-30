<script setup lang="ts">
interface ItemTtype { name: string, icon?: string, url: NavigateToOptions['url'] }
withDefaults(defineProps<{ item: ItemTtype }>(), {

})
const emites = defineEmits<{
  (e: 'click', item: ItemTtype): void
}>()
function handleClick(item: ItemTtype) {
  console.log('handleClick', item)
  emites('click', item)
}
</script>

<template>
  <!-- 修改flex布局，移除items-center，确保宽度能够撑满父容器 -->
  <view class="mx-0 mb-2 box-border max-w-full w-full flex flex-col rounded-lg bg-[#FFFFFF] pb-[36rpx] pl-[38rpx] pr-[34rpx] pt-[42rpx]" @click="handleClick(item)">
    <view class="w-full flex items-center justify-between">
      <view class="flex items-center">
        <slot name="title-left" />
        <text class="family-[PingFang SC-Medium] ml-4 text-[28rpx] text-text-main font-[600]">
          {{ item.name }}
        </text>
      </view>
      <text class="i-custom:mr h-4 w-4" />
    </view>
  </view>
</template>
