<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  text?: string
  bgColor?: string
  radius?: string | number
  textColor?: string
  borderColor?: string
  borderWidth?: string | number
  borderStyle?: string
}>(), {
  bgColor: '',
  radius: '60rpx',
  textColor: '#ffffff',
  borderColor: '',
  borderWidth: '',
  borderStyle: 'solid',
})

const emit = defineEmits(['click'])

const btnStyle = computed(() => {
  const bw = typeof props.borderWidth === 'number' ? `${props.borderWidth}px` : props.borderWidth
  const border = (props.borderColor || bw)
    ? `${bw || '1px'} ${props.borderStyle} ${props.borderColor || '#000'}`
    : undefined

  return {
    backgroundColor: props.bgColor,
    borderRadius: typeof props.radius === 'number' ? `${props.radius}px` : props.radius,
    border,
  } as Record<string, string | undefined>
})
</script>

<template>
  <view class="box-border w-full flex flex-col justify-end px-4">
    <view class="h-8 flex items-center justify-center bg-primary px-4 py-2" :style="btnStyle" @click="emit('click')">
      <text :style="{ color: props.textColor }">
        {{ text }}
      </text>
    </view>
    <slot />
  </view>
</template>

<style lang="scss" scoped>

</style>
