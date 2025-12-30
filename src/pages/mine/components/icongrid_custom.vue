<script setup lang="ts">
import { computed, withDefaults } from 'vue'

const props = withDefaults(defineProps<{ icon?: string, title?: string, list?: { icon: string, title: string }[] }>(), {
  icon: 'i-custom:anq',
  title: '',
  list: () => [],
})

const iconList = computed(() => props.list)
</script>

<template>
  <!-- 修复结构问题，移除多余的嵌套视图 -->
  <view class="grid grid-cols-4 gap-2">
    <!-- 静态图标作为参考 -->
    <view
      v-for="item in iconList" :key="item.title"
      class="mb-2 flex flex-col items-center justify-center"
    >
      <text :class="item.icon" class="mb-1 h-4 w-4 text-blue" />
      <text class="text-sm">
        {{ item.title }}
      </text>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
