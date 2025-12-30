<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  content: string
  round?: number
}>(), {
  round: 16,
})

const emit = defineEmits<{ (e: 'close'): void }>()

function handleClose() {
  emit('close')
}
</script>

<template>
  <!-- 仅在外部 v-if 渲染时显示，内部固定 show 为 true -->
  <u-popup :show="true" mode="bottom" bg-color="#fff" :round="props.round" close-on-click-overlay @close="handleClose">
    <view class="agreement-modal-slot">
      <view class="agreement-modal-header">
        <view class="agreement-modal-title">
          {{ props.title }}
        </view>
      </view>
      <scroll-view scroll-y class="agreement-modal-content">
        <view class="agreement-content-wrapper">
          <rich-text :nodes="props.content" class="agreement-text-content" />
        </view>
      </scroll-view>
      <view class="agreement-modal-footer">
        <u-button type="primary" shape="circle" @click="handleClose">
          我知道了
        </u-button>
      </view>
    </view>
  </u-popup>
</template>

<style scoped>
.agreement-modal-slot {
  width: 85%;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  margin: 0 auto;
}

.agreement-modal-header {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.agreement-modal-title {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #333;
}

.agreement-modal-content {
  padding: 10px 0;
  height: 50vh;
  text-align: justify;
}

.agreement-content-wrapper {
  line-height: 1.3;
}

.agreement-modal-footer {
  padding-top: 16px;
}
</style>
