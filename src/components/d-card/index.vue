<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  bgColor: { type: String, default: '#fff' },
  borderRadius: { type: [Number, String], default: 12 },
  paddingX: { type: [Number, String], default: 20 },
  paddingY: { type: [Number, String], default: 16 },
  showHeader: { type: Boolean, default: true },
  showFooter: { type: Boolean, default: false },
  shadow: { type: Boolean, default: false },
})

const cardStyle = computed(() => {
  const br = typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius
  const paddingX = typeof props.paddingX === 'number' ? `${props.paddingX}px` : props.paddingX
  const paddingY = typeof props.paddingY === 'number' ? `${props.paddingY}px` : props.paddingY
  return {
    backgroundColor: props.bgColor,
    borderRadius: br,
    padding: `${paddingY} ${paddingX}`,
    boxShadow: props.shadow ? '0 2px 10px rgba(0,0,0,0.06)' : 'none',
  }
})
</script>

<template>
  <view class="d-card" :style="cardStyle">
    <view v-if="showHeader" class="d-card-header">
      <text class="d-card-title">
        {{ title }}
      </text>
      <view class="d-card-actions">
        <slot name="header-right" />
      </view>
    </view>

    <view class="d-card-content">
      <slot />
    </view>

    <view v-if="showFooter" class="d-card-footer">
      <slot name="footer" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.d-card {
  display: flex;
  flex-direction: column;
}

.d-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.d-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.d-card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.d-card-content {

}

.d-card-footer {
  margin-top: 12px;
  border-top: 1px solid #f0f0f0;
  padding-top: 8px;
}
</style>
