<script setup lang="ts">
import { defineEmits, defineProps, withDefaults } from 'vue'

type MenuItem = Record<string, any>

const props = withDefaults(
  defineProps<{
    list: MenuItem[]
    col?: number
    gap?: number
    border?: boolean
    textKey?: string
    iconKey?: string
    textClass?: string
  }>(),
  {
    col: 4,
    gap: 12,
    border: false,
    textKey: 'name',
    iconKey: 'icon',
    textClass: 'grid-text',
  },
)

const emit = defineEmits<{
  (e: 'click', item: MenuItem): void
}>()

function onClick(index: number) {
  emit('click', props.list?.[index])
}
</script>

<template>
  <u-grid :border="border" :col="col" :gap="gap" @click="onClick">
    <u-grid-item v-for="(item, index) in list" :key="index">
      <text :class="item[iconKey]" class="mb-4 mt-5 h-10 w-10" />
      <text :class="textClass">
        {{ item[textKey] }}
      </text>
    </u-grid-item>
  </u-grid>
</template>

<style lang="scss" scoped>
/* 组件样式继承页面的 UnoCSS / uview-plus 样式，无需额外定义 */
.grid-text {
  font-size: 14px;
  color: #3D3D3D;
}
</style>
