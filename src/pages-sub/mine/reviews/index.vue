<script setup lang="ts">
import AppHeader from '~/components/ocean/app-header.vue'
import { pendingReviews, reviews } from '~/data/mine'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的评价',
  },
})

function handleReview() {
  uni.showToast({ title: '评价功能开发中', icon: 'none' })
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader show-back title="我的评价" right-icon="search" />

    <scroll-view scroll-y class="box-border min-h-0 w-full flex-1" :show-scrollbar="false">
      <view class="box-border p-4">
        <!-- Pending -->
        <view class="mb-8">
          <view class="mb-4 flex items-center justify-between">
            <text class="text-xl text-primary font-semibold">
              待评价订单
            </text>
            <view class="rounded-full bg-secondary-container px-3 py-1 text-xs text-[#6b1f00]">
              {{ pendingReviews.length }}个待写
            </view>
          </view>

          <view
            v-for="item in pendingReviews"
            :key="item.id"
            class="mb-3 box-border flex gap-4 border border-outline-variant/30 rounded-xl bg-surface-lowest p-4 shadow-[0_4px_20px_rgba(0,51,102,0.06)]"
          >
            <image class="h-20 w-20 shrink-0 rounded-lg" :src="item.image" mode="aspectFill" />
            <view class="min-w-0 flex-1">
              <view class="flex justify-between gap-2">
                <view>
                  <text class="block text-base text-on-surface font-bold">
                    {{ item.name }}
                  </text>
                  <text class="mt-0.5 block text-xs text-on-surface-variant">
                    下单时间: {{ item.date }}
                  </text>
                </view>
                <view class="shrink-0 rounded-full bg-primary px-4 py-2 text-xs text-white" @tap="handleReview">
                  去评价
                </view>
              </view>
              <view class="mt-2 flex items-center gap-1">
                <u-icon v-for="i in 5" :key="i" name="star" color="#737780" size="18" />
                <text class="ml-2 text-xs text-on-surface-variant">
                  {{ item.hint }}
                </text>
              </view>
            </view>
          </view>
        </view>

        <!-- Past Reviews -->
        <view class="mb-8">
          <view class="mb-4 flex items-center justify-between">
            <text class="text-xl text-primary font-semibold">
              我的全部评价
            </text>
            <view class="flex items-center gap-1 text-xs text-primary">
              <text>筛选</text>
              <u-icon name="list" color="#001e40" size="16" />
            </view>
          </view>

          <view
            v-for="item in reviews"
            :key="item.id"
            class="mb-6 box-border border border-outline-variant/20 rounded-2xl bg-surface p-4 shadow-[0_4px_20px_rgba(0,51,102,0.06)]"
          >
            <view class="mb-2 flex items-start justify-between">
              <view class="flex gap-2">
                <view
                  class="h-8 w-8 flex items-center justify-center rounded-full text-[10px] text-[#799dd6] font-bold"
                  :style="{ background: item.avatarBg }"
                >
                  {{ item.avatar }}
                </view>
                <view>
                  <text class="block text-sm text-on-surface font-bold">
                    {{ item.name }}
                  </text>
                  <text class="block text-[10px] text-on-surface-variant">
                    购买日期: {{ item.date }}
                  </text>
                </view>
              </view>
              <view class="flex gap-0.5">
                <u-icon
                  v-for="i in 5"
                  :key="i"
                  name="star-fill"
                  :color="i <= item.rating ? '#fe7e4f' : '#737780'"
                  size="14"
                />
              </view>
            </view>

            <text class="mb-4 block text-sm text-on-surface leading-relaxed">
              {{ item.content }}
            </text>

            <view
              class="grid mb-4 gap-2"
              :class="item.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'"
            >
              <view
                v-for="(img, index) in item.images.slice(0, item.extraCount ? 2 : item.images.length)"
                :key="index"
                class="relative overflow-hidden rounded-lg"
                :class="item.images.length === 2 ? 'aspect-[4/3]' : 'aspect-square'"
              >
                <image class="h-full w-full" :src="img" mode="aspectFill" />
              </view>
              <view
                v-if="item.extraCount"
                class="relative overflow-hidden rounded-lg"
                :class="item.images.length === 2 ? 'aspect-[4/3]' : 'aspect-square'"
              >
                <image class="h-full w-full blur-[1px] brightness-75" :src="item.images[2]" mode="aspectFill" />
                <text class="absolute inset-0 flex items-center justify-center text-white font-bold">
                  +{{ item.extraCount }}
                </text>
              </view>
            </view>

            <view class="flex items-center gap-4 border-t border-outline-variant/10 pt-2">
              <view class="flex items-center gap-1 text-xs text-on-surface-variant">
                <u-icon name="thumb-up" color="#43474f" size="16" />
                <text>{{ item.likes }}</text>
              </view>
              <view class="flex items-center gap-1 text-xs text-on-surface-variant">
                <u-icon name="chat" color="#43474f" size="16" />
                <text>{{ item.comments }}</text>
              </view>
              <view v-if="item.featured" class="ml-auto rounded bg-surface-high px-2 py-0.5 text-[10px] text-primary">
                已入选精选
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
