<script setup lang="ts">
import type { ICategoryFilter } from '../data'

defineProps<{
  filters: ICategoryFilter[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function select(id: string) {
  emit('update:modelValue', id)
}

function chipClass(id: string, active: string) {
  return id === active
    ? 'bg-primary-container text-white font-bold'
    : 'border border-outline-variant bg-surface-lowest text-on-surface-variant'
}
</script>

<template>
  <scroll-view scroll-x class="mb-48rpx w-full whitespace-nowrap" :show-scrollbar="false">
    <view class="inline-flex gap-16rpx pb-8rpx">
      <view
        v-for="filter in filters"
        :key="filter.id"
        class="shrink-0 rounded-full px-4 py-1.5 text-xs"
        :class="chipClass(filter.id, modelValue)"
        @tap="select(filter.id)"
      >
        {{ filter.label }}
      </view>
    </view>
  </scroll-view>
</template>
