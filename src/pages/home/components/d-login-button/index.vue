<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  label?: string
  bg?: string // 背景图路径
  width?: string | number
  height?: string | number
}>(), {
  label: '去实名',
})

const emit = defineEmits(['click'])

const wrapStyle = computed(() => ({
  minWidth: props.width ? '' : '80px',
  minHeight: props.height ? '' : '50px',
}))

function onClick() {
  emit('click')
}
</script>

<template>
  <view class="d-login-button" :style="wrapStyle" @click="onClick">
    <view class="content">
      <text class="icon i-custom-certificate" />
      <text class="text-[28rpx] text-white">
        {{ label }}
      </text>
    </view>
  </view>
</template>

<style scoped>
.d-login-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  background-size: 100% 100%;
  background-image: url('/static/images/home/btn-bg.png');
  padding: 0 20px;
}
.content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: -7px;
}
.icon {
  margin-left: 12px;
  margin-right: 4px;
  height: 16px;
  width: 16px;
  color: #fff;
}
</style>
