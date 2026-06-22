<script setup lang="ts">
import { useStorage } from '@uni-helper/uni-use'
import { computed, ref } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'
import ProductCardHome from '~/components/ocean/product-card-home.vue'
import OceanTabBar from '~/components/ocean/tab-bar.vue'
import { banners, homeCategories, hotProducts } from '~/data/ocean'
import { useLoginModal } from '~/hooks'
import { useUserStore } from '~/store'
import { navigateTo } from '~/utils'

const activeFilter = ref('sales')
const bannerCurrent = ref(0)
const promoDismissed = useStorage('home-promo-dismissed', false)
const showPromoModal = ref(!promoDismissed.value)

const { isLogin } = useUserStore()
const { openLoginModal } = useLoginModal()

const promoImage = banners[0]?.image ?? ''

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})

function goCategory() {
  uni.switchTab({ url: '/pages/category/index' })
}

function goCategoryList(id: string) {
  navigateTo('/pages-sub/home-category/list/index', { id })
}

function goSeasonalList() {
  navigateTo('/pages-sub/home-seasonal/list/index')
}

function onBannerChange(e: { detail: { current: number } }) {
  bannerCurrent.value = e.detail.current
}

function goProductDetail(id: string) {
  navigateTo('/pages-sub/product/detail/index', { id })
}

function closePromoModal() {
  showPromoModal.value = false
  promoDismissed.value = true
}

function handlePromoClaim() {
  closePromoModal()
  uni.showToast({ title: '优惠券已领取', icon: 'none' })
  goCategory()
}

function handleLoginTap() {
  openLoginModal()
}

function chipClass(filter: string) {
  return activeFilter.value === filter
    ? 'bg-surface-high text-primary'
    : 'bg-surface-container text-on-surface-variant'
}

const bottomSpacerHeight = computed(() => {
  const tabBarHeight = 50
  const loginBannerHeight = isLogin.value ? 0 : 56
  return `calc(${tabBarHeight + loginBannerHeight + 16}px + env(safe-area-inset-bottom))`
})
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader />

    <scroll-view scroll-y class="box-border min-h-0 w-full flex-1">
      <!-- Search -->
      <view class="px-4 pb-6 pt-3">
        <view class="h-12 flex items-center gap-2 border border-outline-variant rounded-xl bg-surface-lowest px-4">
          <u-icon name="search" color="#737780" size="18" />
          <input
            class="min-w-0 flex-1 text-sm text-on-surface"
            placeholder="搜索全球直达新鲜海产..."
            placeholder-style="color: #737780"
          >
        </view>
      </view>

      <!-- Banners -->
      <view class="mb-8 px-4">
        <view class="mb-3 flex items-center justify-between">
          <text class="text-xl text-primary font-semibold">
            时令推荐
          </text>
          <view class="flex items-center gap-0.5 text-xs text-secondary font-medium" @tap="goSeasonalList">
            <text>查看全部</text>
            <u-icon name="arrow-right" color="#a43c12" size="12" />
          </view>
        </view>
        <swiper
          class="h-32 w-full overflow-hidden rounded-xl"
          :autoplay="banners.length > 1"
          :circular="banners.length > 1"
          :duration="500"
          :interval="4000"
          :indicator-dots="false"
          @change="onBannerChange"
        >
          <swiper-item
            v-for="banner in banners"
            :key="banner.id"
            @tap="goSeasonalList"
          >
            <view class="relative h-full w-full overflow-hidden rounded-xl">
              <image class="h-full w-full" :src="banner.image" mode="aspectFill" />
              <view class="absolute inset-0 flex flex-col justify-end from-black/60 to-transparent bg-gradient-to-t p-4">
                <view class="mb-1 inline-block w-fit rounded px-2 py-0.5 text-[10px] text-white" :style="{ background: banner.tagBg }">
                  {{ banner.tag }}
                </view>
                <text class="text-base text-white font-semibold">
                  {{ banner.title }}
                </text>
                <text class="mt-0.5 text-xs text-white/80">
                  {{ banner.subtitle }}
                </text>
              </view>
            </view>
          </swiper-item>
        </swiper>
        <view v-if="banners.length > 1" class="mt-2 flex items-center justify-center gap-1.5">
          <view
            v-for="(banner, index) in banners"
            :key="banner.id"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="bannerCurrent === index ? 'w-4 bg-primary' : 'w-1.5 bg-outline-variant/50'"
          />
        </view>
      </view>

      <!-- Category Icons -->
      <view class="grid grid-cols-4 mb-8 gap-4 px-4">
        <view v-for="cat in homeCategories" :key="cat.id" class="flex flex-col items-center gap-2" @tap="goCategoryList(cat.id)">
          <view class="h-14 w-14 flex items-center justify-center rounded-2xl bg-surface-container shadow-[0_2px_4px_rgba(0,51,102,0.06)]">
            <u-icon :name="cat.icon" color="#001e40" size="28" />
          </view>
          <text class="text-xs text-on-surface font-medium">
            {{ cat.name }}
          </text>
        </view>
      </view>

      <!-- Hot Products -->
      <view class="mb-8 px-4">
        <view class="mb-3 flex items-center justify-between">
          <text class="text-xl text-primary font-semibold">
            本周热销
          </text>
          <view class="flex gap-2">
            <view
              class="rounded-full px-3 py-1 text-xs"
              :class="chipClass('sales')"
              @tap="activeFilter = 'sales'"
            >
              销量排行
            </view>
            <view
              class="rounded-full px-3 py-1 text-xs"
              :class="chipClass('rating')"
              @tap="activeFilter = 'rating'"
            >
              综合好评
            </view>
          </view>
        </view>
        <view class="flex flex-col gap-3">
          <ProductCardHome
            v-for="product in hotProducts"
            :key="product.id"
            :product="product"
            @tap="goProductDetail(product.id)"
          />
        </view>
      </view>

      <view class="shrink-0" :style="{ height: bottomSpacerHeight }" />
    </scroll-view>

    <!-- 未登录提示 -->
    <view v-if="!isLogin" class="fixed bottom-[calc(50px+env(safe-area-inset-bottom)+8px)] left-4 right-4 z-[998] box-border">
      <view class="box-border flex items-center justify-between gap-3 rounded-xl bg-primary-container p-3 shadow-[0_8px_24px_rgba(0,51,102,0.25)]">
        <view class="min-w-0 flex flex-1 items-center gap-2">
          <u-icon name="account-fill" color="#001e40" size="18" />
          <text class="text-sm text-[#799dd6] font-medium">
            登录后开启您的鲜味之旅
          </text>
        </view>
        <view class="shrink-0 rounded-full bg-primary px-4 py-1.5 text-xs text-white font-bold" @tap="handleLoginTap">
          立即登录
        </view>
      </view>
    </view>

    <OceanTabBar />

    <!-- 弹窗广告 -->
    <view v-if="showPromoModal" class="fixed inset-0 z-[1000] box-border flex items-center justify-center bg-black/40 p-4" @tap="closePromoModal">
      <view class="relative max-w-[320px] w-full overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.25)]" @tap.stop>
        <view class="absolute right-2 top-2 z-[2] h-8 w-8 flex items-center justify-center rounded-full bg-black/20" @tap="closePromoModal">
          <u-icon name="close" color="#fff" size="16" />
        </view>
        <view class="relative w-full overflow-hidden pb-[125%]">
          <image class="absolute inset-0 h-full w-full" :src="promoImage" mode="aspectFill" />
        </view>
        <view class="pointer-events-none absolute inset-0 box-border flex flex-col items-center justify-end from-black/80 to-transparent bg-gradient-to-t p-6">
          <text class="mb-2 text-2xl text-white font-bold">
            新人专享礼包
          </text>
          <text class="mb-6 text-sm text-white/90">
            首单满199减50元
          </text>
          <view class="pointer-events-auto box-border w-full rounded-full bg-secondary py-3 text-center text-base text-white font-bold shadow-[0_8px_20px_rgba(164,60,18,0.4)]" @tap="handlePromoClaim">
            领券下单
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
