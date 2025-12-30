<script setup lang="ts">
import type { IFamilyPerson } from '../types/index.type'
import DRelationTag from '~/components/d-relation-tag/index.vue'
import { useUserStore } from '~/store'
import { maskPhoneNumber, maskSurname } from '~/utils/common'

withDefaults(defineProps<{
  currentItem: IFamilyPerson
}>(), {

})
const emits = defineEmits<{
  (e: 'click', item: IFamilyPerson): void
  (e: 'delete', item: IFamilyPerson): void
}>()

const { currentPatientUserId } = useUserStore()
const handlerToDetail = (item: IFamilyPerson) => emits('click', item)
function handlerDelete(item: IFamilyPerson) {
  emits('delete', item)
}
</script>

<template>
  <!-- 修改flex布局，移除items-center，确保宽度能够撑满父容器 -->
  <view :class="[`${currentItem.id}` === currentPatientUserId ? 'active' : 'bg-[#ffffff]']" class="mx-0 mb-[28rpx] box-border max-w-full w-full flex justify-between rounded-lg px-[26rpx] pb-[28rpx] pt-[32rpx]">
    <view class="flex flex-col justify-between">
      <view class="mb-4 flex items-center justify-start">
        <text class="mr-[16rpx] text-[32rpx] text-text-main font-[500]">
          {{ maskSurname(currentItem.realName as string) }}
        </text>
        <view class="relative top-[-5rpx]">
          <DRelationTag :value="currentItem.relation" class="ml-2 mr-4" />
        </view>
        <text :class="currentItem.gender === '男' ? 'i-custom-mman' : 'i-custom-mwomen'" class="ml-[32rpx] mr-[40rpx] h-[40rpx] w-[40rpx]" />
        <text class="text-[28rpx] text-text-main font-[400]">
          {{ currentItem.age }}
        </text>
      </view>
      <view class="flex justify-start">
        <text>
          <text class="i-custom:mphone h-[36rpx] w-[36rpx]" />
          <text class="ml-[18rpx] text-[28rpx] text-text-main font-[400]">
            {{ maskPhoneNumber(currentItem.linkPhone as string) }}
          </text>
        </text>
      </view>
    </view>
    <view class="flex flex-col items-end justify-between">
      <text class="i-custom:mr h-7 w-6" @click="handlerToDetail(currentItem)" />
      <view v-if="`${currentItem.id}` !== currentPatientUserId " class="h-[60rpx] w-[160rpx] border-2 border-[#F5525F] rounded-[60rpx] border-solid bg-[#FDDCDF] text-center" @click="handlerDelete(currentItem)">
        <text class="text-[32rpx] text-[#F5525F]">
          解绑
        </text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
/* 使用容器和文字分离的方式实现倾斜标签效果 */
.active {
  background: rgba(26,77,184,0.18);
}

// 移除旧的样式定义
</style>
