<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'
import OceanTabBar from '~/components/ocean/tab-bar.vue'
import VipCard from '~/components/ocean/vip-card.vue'
import { useLoginModal } from '~/hooks'
import { useUserStore } from '~/store'
import { navigateTo } from '~/utils'

const { isLogin, loginUser, logout } = useUserStore()
const { openLoginModal } = useLoginModal()

const avatarUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcjrOXbBICF2GKzCqoCWeWlR8jEwY4UxMDV2LLzSp11hzwapD0Mj2XYpelvYmh9I7wtOqGXDDx3ObBlsgiL1Cp0owuvk0VIhwVzR_-FbnJxysRpsfIkm7XHue1Q1tzD-DBkUvP9hkM0yqzF9_pORtTHjiQxsPyHkR_Omd71oZPeOf_TQx218XUCagvNy5Gf1jW3iDXcriMoyucmaCiYZN2MdT9Rooh-XpSvdSGUcK21RYVJNPLh0zEOSf_z1zyfnomEDIb4TkMcGAN'

const menuItems = [
  { icon: 'bag', label: '我的订单', path: '/pages-sub/mine/orders/index' },
  { icon: 'map', label: '收货地址', path: '/pages-sub/mine/address/index' },
  { icon: 'edit-pen', label: '我的评价', path: '/pages-sub/mine/reviews/index' },
  { icon: 'server-man', label: '联系客服', path: '/pages-sub/mine/service/index' },
  { icon: 'lock', label: '账户与安全', path: '/pages-sub/mine/security/index' },
]

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的',
  },
})

const displayName = computed(() => {
  if (isLogin.value)
    return loginUser.value?.name || loginUser.value?.phone || '海味鲜会员'
  return '林先生'
})

const displayPhone = computed(() => {
  const phone = loginUser.value?.phone
  if (!phone)
    return '138 **** 8888'
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1 **** $2')
})

const bottomSpacerHeight = computed(() =>
  `calc(50px + env(safe-area-inset-bottom) + 16px)`,
)

function goRecharge() {
  navigateTo('/pages-sub/mine/recharge/index')
}

function goMenuPage(path: string) {
  navigateTo(path)
}

function handleLogout() {
  if (!isLogin.value) {
    openLoginModal()
    return
  }
  logout()
  uni.showToast({ title: '已退出登录', icon: 'none' })
}

function menuItemClass(index: number) {
  return index === menuItems.length - 1 ? '' : 'border-b border-outline-variant'
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader />

    <scroll-view scroll-y class="box-border min-h-0 w-full flex-1" :show-scrollbar="false">
      <view class="px-4 pb-4 pt-4">
        <!-- User Profile -->
        <view class="flex items-center gap-4 py-4">
          <view class="relative h-20 w-20 shrink-0">
            <image
              class="box-border h-20 w-20 border-4 border-surface-lowest rounded-full"
              :src="avatarUrl"
              mode="aspectFill"
            />
            <view class="absolute bottom-0 right-0 h-[22px] w-[22px] flex items-center justify-center border-2 border-surface-lowest rounded-full bg-secondary-container">
              <u-icon name="checkmark-circle-fill" color="#fff" size="14" />
            </view>
          </view>
          <view class="min-w-0 flex-1">
            <text class="block overflow-hidden text-ellipsis whitespace-nowrap text-xl text-primary font-semibold leading-7">
              {{ displayName }}
            </text>
            <view class="mt-1 flex items-center gap-1 text-sm text-on-surface-variant">
              <u-icon name="phone" color="#43474f" size="14" />
              <text>{{ displayPhone }}</text>
            </view>
          </view>
        </view>

        <VipCard />

        <!-- Balance -->
        <view class="mb-6 flex items-center justify-between gap-3 rounded-xl bg-surface-lowest p-5 shadow-[0_2px_8px_rgba(0,51,102,0.06)]">
          <view class="min-w-0 flex flex-1 items-center gap-4">
            <view class="h-12 w-12 flex shrink-0 items-center justify-center rounded-full bg-surface-container">
              <u-icon name="rmb-circle" color="#001e40" size="24" />
            </view>
            <view class="min-w-0 flex-1">
              <text class="block text-xs text-on-surface-variant">
                账户余额
              </text>
              <text class="mt-0.5 block text-[44rpx] text-primary font-bold leading-none">
                ¥ 2,840.00
              </text>
            </view>
          </view>
          <view
            class="shrink-0 rounded-full bg-secondary px-6 py-2 text-sm text-white font-bold shadow-[0_4px_12px_rgba(164,60,18,0.25)]"
            @tap="goRecharge"
          >
            立即充值
          </view>
        </view>

        <!-- Menu List -->
        <view class="mb-6 overflow-hidden rounded-xl bg-surface-lowest shadow-[0_2px_8px_rgba(0,51,102,0.06)]">
          <view
            v-for="(item, index) in menuItems"
            :key="item.label"
            class="flex items-center justify-between gap-2 p-4"
            :class="menuItemClass(index)"
            @tap="goMenuPage(item.path)"
          >
            <view class="min-w-0 flex flex-1 items-center gap-3">
              <u-icon :name="item.icon" color="#43474f" size="20" />
              <text class="text-sm text-on-surface font-medium">
                {{ item.label }}
              </text>
            </view>
            <u-icon name="arrow-right" color="#737780" size="16" />
          </view>
        </view>

        <!-- Logout -->
        <view
          class="rounded-xl bg-surface-lowest p-4 text-center text-sm text-[var(--theme-error)] font-medium shadow-[0_2px_8px_rgba(0,51,102,0.06)]"
          @tap="handleLogout"
        >
          退出当前账号
        </view>

        <view class="shrink-0" :style="{ height: bottomSpacerHeight }" />
      </view>
    </scroll-view>

    <OceanTabBar />
  </view>
</template>
