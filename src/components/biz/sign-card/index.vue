<script setup lang="ts">
import DCard from '~/components/d-card/index.vue'

interface SignItem {
  label: string
  value?: string | number
  icon?: string
  key?: string // 用于唯一标识项的键（可选）
  color?: string // value文本颜色的类名（可选）
}

const props = withDefaults(defineProps<{
  isShowIcon?: boolean
  title?: string
  items: SignItem[]
  showHeader?: boolean
  shadow?: boolean
  bgColor?: string
  radius?: number | string
  itemGap?: number | string
}>(), {
  title: '签约信息',
  showHeader: false,
  shadow: false,
  bgColor: '#EDF3FF',
  radius: 12,
  itemGap: 20,
})

const emit = defineEmits<{
  (e: 'itemClick', payload: { index: number, item: SignItem }): void
}>()

function onItemClick(index: number) {
  emit('itemClick', { index, item: props.items[index] })
}
</script>

<template>
  <DCard
    :title="title"
    :bg-color="bgColor"
    :border-radius="radius"
    :show-header="showHeader"
    :shadow="shadow"
  >
    <view class="sign-list">
      <view
        v-for="(item, index) in items"
        :key="index"
        class="sign-item"
        :style="{ marginBottom: index !== items.length - 1 ? `${itemGap}rpx` : 0 }"
        @click="onItemClick(index)"
      >
        <view class="item-left">
          <text v-if="isShowIcon && item.icon" :class="item.icon" class="mr-1 h-4 w-4" />
          <text class="item-label text-sm text-text-content">
            {{ item.label }}：
          </text>
        </view>
        <view class="item-right">
          <slot name="value" :item="item" :index="index">
            <text
              v-if="item.key === 'signStatus'"
              class="item-value text-main-content text-sm font-500" :class="[item.color ? item.color : null]"
            >
              {{ item.value }}
            </text>
            <text
              v-else
              class="item-value text-main-content text-sm text-text-content font-500"
            >
              {{ item.value }}
            </text>
          </slot>
        </view>
      </view>
    </view>
  </DCard>

  <!-- 占位：可扩展底部插槽（例如操作按钮） -->
  <slot name="footer" />
</template>

<style scoped lang="scss">
.sign-list {
  display: flex;
  flex-direction: column;
}
.sign-item {
  display: flex;
  align-items: flex-start;
}
.item-left {
  display: inline-flex;
  align-items: center;
}
.item-label {
  font-size: 28rpx;
  color: #666;
  width: 70px;
}
.item-right {
  display: inline-flex;
  align-items: center;
}
.item-value {
  font-size: 28rpx;
}
</style>
