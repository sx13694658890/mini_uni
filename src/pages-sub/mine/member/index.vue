<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'
import {
  availableMileage,
  formatWealth,
  memberBenefits,
  memberFeature,
  memberLevels,
} from '~/data/member'
import { useUserStore } from '~/store'

const { loginUser, isLogin } = useUserStore()

const avatarUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcjrOXbBICF2GKzCqoCWeWlR8jEwY4UxMDV2LLzSp11hzwapD0Mj2XYpelvYmh9I7wtOqGXDDx3ObBlsgiL1Cp0owuvk0VIhwVzR_-FbnJxysRpsfIkm7XHue1Q1tzD-DBkUvP9hkM0yqzF9_pORtTHjiQxsPyHkR_Omd71oZPeOf_TQx218XUCagvNy5Gf1jW3iDXcriMoyucmaCiYZN2MdT9Rooh-XpSvdSGUcK21RYVJNPLh0zEOSf_z1zyfnomEDIb4TkMcGAN'

const currentIndex = ref(1)

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '会员中心',
  },
})

const displayName = computed(() => {
  if (isLogin.value)
    return loginUser.value?.name || loginUser.value?.phone || '林海峰 Victor'
  return '林海峰 Victor'
})

function getProgress(level: typeof memberLevels[0]) {
  return Math.min(level.wealthCurrent / level.wealthTarget, 1)
}

function onSwiperChange(e: { detail: { current: number } }) {
  currentIndex.value = e.detail.current
}

function handleUpgrade() {
  uni.showToast({ title: '升级功能开发中', icon: 'none' })
}

function handleViewAll() {
  uni.showToast({ title: '权益详情开发中', icon: 'none' })
}

function handleRedeem() {
  uni.showToast({ title: '兑换功能开发中', icon: 'none' })
}
</script>

<template>
  <view class="member-page">
    <AppHeader show-back title="会员中心" />

    <scroll-view scroll-y class="member-scroll" :show-scrollbar="false">
      <view class="member-content">
        <!-- User Profile -->
        <view class="profile-row">
          <image class="profile-avatar" :src="avatarUrl" mode="aspectFill" />
          <view class="profile-info">
            <text class="profile-name">
              {{ displayName }}
            </text>
            <text class="profile-tag">
              海味鲜精英会员
            </text>
          </view>
        </view>

        <!-- Level Swiper -->
        <view class="level-section">
          <swiper
            class="level-swiper"
            :current="currentIndex"
            circular
            previous-margin="24rpx"
            next-margin="24rpx"
            @change="onSwiperChange"
          >
            <swiper-item v-for="level in memberLevels" :key="level.id">
              <view class="level-card">
                <view class="level-tabs">
                  <view
                    v-for="item in memberLevels"
                    :key="item.id"
                    class="level-tab"
                    :class="{ 'level-tab--active': item.level === level.level }"
                  >
                    {{ item.level }}
                  </view>
                </view>

                <view class="level-arc" />

                <text class="level-num">
                  {{ level.level }}
                </text>

                <view class="level-title-row">
                  <text class="level-name">
                    {{ level.name }}
                  </text>
                  <view v-if="level.locked" class="level-lock">
                    <u-icon name="lock" color="#737780" size="12" />
                    <text>待解锁</text>
                  </view>
                </view>

                <view class="level-value-row">
                  <text class="level-value">
                    {{ level.annualValue.toLocaleString() }}
                  </text>
                  <text class="level-value-unit">
                    元/年权益价值
                  </text>
                </view>

                <view class="level-progress-box">
                  <view class="level-progress-top">
                    <text class="level-progress-text">
                      财富值 {{ formatWealth(level.wealthCurrent) }} / {{ formatWealth(level.wealthTarget) }}
                    </text>
                    <u-icon name="arrow-right" color="rgba(255,255,255,0.45)" size="12" />
                  </view>
                  <view class="level-progress-bottom">
                    <view class="level-progress-track">
                      <view
                        class="level-progress-bar"
                        :style="{ width: `${getProgress(level) * 100}%` }"
                      />
                    </view>
                    <view class="level-upgrade-btn" @tap.stop="handleUpgrade">
                      去升级
                    </view>
                  </view>
                </view>
              </view>
            </swiper-item>
          </swiper>

          <view class="level-dots">
            <view
              v-for="(_, index) in memberLevels"
              :key="index"
              class="level-dot"
              :class="{ 'level-dot--active': currentIndex === index }"
            />
          </view>
        </view>

        <!-- Benefits -->
        <view class="benefits-section">
          <view class="benefits-header">
            <text class="benefits-title">
              会员专享权益
            </text>
            <view class="benefits-more" @tap="handleViewAll">
              <text>查看全部</text>
              <u-icon name="arrow-right" color="#737780" size="12" />
            </view>
          </view>

          <view class="benefits-grid">
            <view
              v-for="item in memberBenefits"
              :key="item.label"
              class="benefit-item"
            >
              <view class="benefit-icon-wrap">
                <u-icon :name="item.icon" color="#a43c12" size="22" />
              </view>
              <text class="benefit-label">
                {{ item.label }}
              </text>
            </view>
          </view>

          <view class="feature-card">
            <view class="feature-icon-wrap">
              <u-icon :name="memberFeature.icon" color="#a43c12" size="22" />
            </view>
            <view class="feature-text">
              <text class="feature-title">
                {{ memberFeature.title }}
              </text>
              <text class="feature-desc">
                {{ memberFeature.desc }}
              </text>
            </view>
          </view>
        </view>

        <!-- Mileage -->
        <view class="mileage-card">
          <view class="mileage-info">
            <text class="mileage-label">
              可用里程
            </text>
            <text class="mileage-value">
              {{ availableMileage.toLocaleString() }}
            </text>
          </view>
          <view class="mileage-btn" @tap="handleRedeem">
            兑换奖品
          </view>
        </view>

        <view class="bottom-spacer" />
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.member-page {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f9f9ff;
}

.member-scroll {
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
  width: 100%;
}

.member-content {
  box-sizing: border-box;
  padding: 16px;
}

.profile-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0 20px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 999px;
  flex-shrink: 0;
  border: 4px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 51, 102, 0.08);
}

.profile-info {
  min-width: 0;
  flex: 1;
}

.profile-name {
  display: block;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  color: #001e40;
}

.profile-tag {
  display: block;
  margin-top: 4px;
  font-size: 14px;
  color: #43474f;
}

.level-section {
  margin-bottom: 24px;
}

.level-swiper {
  height: 360px;
}

.level-card {
  box-sizing: border-box;
  height: 340px;
  margin: 0 4px;
  padding: 20px 20px 16px;
  border-radius: 20px 20px 16px 16px;
  background: linear-gradient(180deg, #1a2433 0%, #0b1018 100%);
  box-shadow: 0 12px 32px rgba(0, 30, 64, 0.28);
  overflow: hidden;
}

.level-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
}

.level-tab {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
  transition: color 0.2s;

  &--active {
    color: #d4b76a;
    font-weight: 600;
  }
}

.level-arc {
  width: 180px;
  height: 24px;
  margin: 8px auto 0;
  border-top: 1px solid rgba(212, 183, 106, 0.35);
  border-radius: 50% 50% 0 0;
}

.level-num {
  display: block;
  margin-top: 4px;
  text-align: center;
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -2px;
  background: linear-gradient(180deg, #f8ecc8 0%, #d4b76a 45%, #9a7b3c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.level-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.level-name {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.level-lock {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 10px;
  color: #737780;
}

.level-value-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin-top: 8px;
}

.level-value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
}

.level-value-unit {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
}

.level-progress-box {
  box-sizing: border-box;
  margin-top: 20px;
  padding: 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
}

.level-progress-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.level-progress-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
}

.level-progress-bottom {
  display: flex;
  align-items: center;
  gap: 12px;
}

.level-progress-track {
  flex: 1;
  min-width: 0;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
}

.level-progress-bar {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #c9a84c 0%, #e8d08a 100%);
}

.level-upgrade-btn {
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: 999px;
  background: linear-gradient(180deg, #e8d08a 0%, #c9a84c 100%);
  font-size: 13px;
  font-weight: 600;
  color: #1a1205;
  box-shadow: 0 4px 12px rgba(201, 168, 76, 0.35);
}

.level-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.level-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #c3c6d1;
  transition: all 0.2s;

  &--active {
    width: 16px;
    background: #c9a84c;
  }
}

.benefits-section {
  margin-bottom: 16px;
}

.benefits-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.benefits-title {
  font-size: 18px;
  font-weight: 700;
  color: #001e40;
}

.benefits-more {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  color: #737780;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.benefit-item {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 15px rgba(0, 51, 102, 0.06);
}

.benefit-icon-wrap {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #ffdbcf;
}

.benefit-label {
  font-size: 14px;
  font-weight: 600;
  color: #111c2d;
  text-align: center;
}

.feature-card {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 15px rgba(0, 51, 102, 0.06);
}

.feature-icon-wrap {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #ffdbcf;
}

.feature-text {
  min-width: 0;
  flex: 1;
}

.feature-title {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #111c2d;
}

.feature-desc {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: #737780;
}

.mileage-card {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #002244 0%, #001e40 100%);
  box-shadow: 0 8px 24px rgba(0, 30, 64, 0.2);
}

.mileage-info {
  min-width: 0;
  flex: 1;
}

.mileage-label {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
}

.mileage-value {
  display: block;
  margin-top: 4px;
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
}

.mileage-btn {
  flex-shrink: 0;
  padding: 12px 20px;
  border-radius: 999px;
  background: #fe7e4f;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  box-shadow: 0 4px 16px rgba(254, 126, 79, 0.35);
}

.bottom-spacer {
  height: calc(24px + env(safe-area-inset-bottom));
}
</style>
