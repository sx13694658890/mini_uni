<script lang="ts" setup generic="T">
withDefaults(defineProps<{
  title?: string
  confirmText?: string
  msg?: string
}>(), {
  title: '提示信息',
  confirmText: '确认',
  msg: '确认吗',
})

const emits = defineEmits<{
  (e: 'confirm'): void
}>()

const showValue = defineModel<boolean>('show', {
  default: false,
})

function confirmValue() {
  emits('confirm')
}

function handleClosePopup() {
  showValue.value = false
}
</script>

<template>
  <up-popup
    :show="showValue" mode="center" overlay :safe-area-inset-bottom="false"
    @close="handleClosePopup"
  >
    <view class="box-border w-[76vw] overflow-hidden rounded-3">
      <view class="mb-1.8 w-full">
        <view class="model-title py-5.7 text-center">
          <text class="text-base text-text-main font-600">
            {{ title }}
          </text>
        </view>
        <view class="mb-10 w-full text-center">
          <text class="text-base text-text-main font-600">
            {{ msg }}
          </text>
        </view>
        <view class="mb-4.5 flex flex-col px-11">
          <button class="w-full border-[2rpx] border-primary rounded-7 border-solid bg-white py-2.5 text-base text-primary font-bold" @click="confirmValue">
            {{ confirmText }}
          </button>
          <text class="mt-4.5 w-full text-center text-base text-text-content font-bold" @click="handleClosePopup">
            取消
          </text>
        </view>
      </view>
    </view>
  </up-popup>
</template>

<style lang="scss" scoped>
  .model-title {
    background: linear-gradient( 180deg, #D1DCF4 0%, rgba(255,255,255,0) 100%);
  }
</style>
