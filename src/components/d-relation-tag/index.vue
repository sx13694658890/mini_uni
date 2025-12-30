<script setup lang="ts">
import { computed } from 'vue'
import { useDictData } from '~/components/dict-data/useDictData'

type TagType = 'primary' | 'success'

const props = withDefaults(defineProps<{
  value?: number | string
  color?: string // 可覆盖主体色
}>(), {
  value: 0,
  type: 'primary',
})

const typeColorMap: Record<TagType, string> = {
  primary: '#2855B3',
  success: '#3BB54A',
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const bigint = Number.parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

const { mapDict } = useDictData('family_member_relation')

const type = computed<TagType>(() => `${props.value}` === '0' ? 'primary' : 'success')

const text = computed(() => mapDict.value[`${props.value}`])

const mainColor = computed(() => props.color || typeColorMap[type.value])
const rgb = computed(() => hexToRgb(mainColor.value))
const borderGradient = computed(() => `linear-gradient(166deg, ${mainColor.value}, rgba(${rgb.value.join(',')}, 0.34))`)

const wrapStyle = computed(() => ({
  background: '#EDF3FF',
  borderImage: `${borderGradient.value} 1 1`,
  color: mainColor.value,
}))
</script>

<template>
  <view class="relation-tag" :style="wrapStyle">
    <text class="relation-text">
      {{ text }}
    </text>
  </view>
</template>

<style scoped>
.relation-tag {
  display: inline-flex;
  align-items: center;
  padding: 0 12rpx;
  border: 1rpx solid transparent;
  border-radius: 8rpx;
  transform: skew(-15deg); /* 倾斜角度：容器左倾15度 */
}

.relation-text {
  font-weight: 500;
  font-size: 24rpx;
  line-height: 37rpx;
  transform: skew(15deg); /* 抵消容器倾斜，文字保持水平 */
}
</style>
