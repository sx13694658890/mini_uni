<script setup lang="ts">
const emit = defineEmits<{ tap: [] }>()

const vipBenefits = [
  { icon: 'coupon', label: '全场9.5折' },
  { icon: 'bell', label: '优先配送' },
  { icon: 'server-man', label: '专属客服' },
]
</script>

<template>
  <view class="vip-card" @tap="emit('tap')">
    <view class="vip-header">
      <view class="vip-header-left">
        <view class="vip-title-row">
          <u-icon name="star-fill" color="#fff" size="20" />
          <text class="vip-title">
            铂金会员
          </text>
        </view>
        <text class="vip-subtitle">
          尊享全球顶级产地优先权
        </text>
      </view>
      <view class="vip-header-icon">
        <u-icon name="gift" color="rgba(255,255,255,0.5)" size="24" />
      </view>
    </view>

    <view class="vip-progress">
      <view class="vip-progress-labels">
        <text>升级进度</text>
        <text>还需 420 里程</text>
      </view>
      <view class="vip-progress-track">
        <view class="vip-progress-bar" />
      </view>
    </view>

    <view class="vip-benefits">
      <view
        v-for="item in vipBenefits"
        :key="item.label"
        class="vip-benefit"
      >
        <u-icon :name="item.icon" color="#fe7e4f" size="18" />
        <text class="vip-benefit-text">
          {{ item.label }}
        </text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.vip-card {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 48rpx;
  padding: 40rpx;
  border-radius: 24rpx;
  overflow: hidden;
  color: #fff;
  background: linear-gradient(135deg, #1e3a8a 0%, #001e40 100%);
  box-shadow: 0 8rpx 24rpx rgba(0, 30, 64, 0.2);
}

.vip-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 40rpx;
}

.vip-header-left {
  flex: 1;
  min-width: 0;
}

.vip-header-icon {
  flex-shrink: 0;
  margin-left: 16rpx;
}

.vip-title-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 8rpx;
}

.vip-title {
  font-size: 40rpx;
  font-weight: 600;
  line-height: 1.2;
  color: #fff;
}

.vip-subtitle {
  font-size: 22rpx;
  line-height: 1.4;
  color: rgba(121, 157, 214, 0.9);
}

.vip-progress {
  margin-bottom: 40rpx;
}

.vip-progress-labels {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8rpx;
  font-size: 24rpx;
  color: #fff;
}

.vip-progress-track {
  height: 12rpx;
  overflow: hidden;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.2);
}

.vip-progress-bar {
  width: 75%;
  height: 100%;
  border-radius: 999rpx;
  background: #fe7e4f;
}

.vip-benefits {
  display: flex;
  gap: 16rpx;
}

/* 小程序 flex 均分：width:0 + flex:1 才能防止子项撑破父容器 */
.vip-benefit {
  box-sizing: border-box;
  flex: 1;
  width: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  padding: 16rpx 8rpx;
  overflow: hidden;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 0.1);
  text-align: center;
}

.vip-benefit-text {
  width: 100%;
  overflow: hidden;
  font-size: 20rpx;
  font-weight: 500;
  line-height: 1.4;
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
