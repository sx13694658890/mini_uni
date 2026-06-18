<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'
import { faqList, serviceBannerImage } from '~/data/mine'

const activeFaq = ref('')

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '联系客服',
  },
})

function toggleFaq(id: string) {
  activeFaq.value = activeFaq.value === id ? '' : id
}

function handleContact(type: string) {
  if (type === 'phone') {
    uni.makePhoneCall({ phoneNumber: '4008880000' })
    return
  }
  uni.showToast({ title: '在线客服功能开发中', icon: 'none' })
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader show-back title="联系客服" right-icon="clock" />

    <scroll-view scroll-y class="box-border min-h-0 w-full flex-1" :show-scrollbar="false">
      <view class="box-border px-4 pb-[120px] pt-4">
        <!-- Hero -->
        <view class="py-8 pb-6 text-center">
          <view class="relative mb-4 inline-block">
            <view class="h-24 w-24 flex items-center justify-center rounded-full from-primary to-primary-container bg-gradient-to-br shadow-[0_8px_24px_rgba(0,30,64,0.2)]">
              <u-icon name="server-man" color="#fff" size="40" />
            </view>
            <view class="absolute bottom-[-4px] right-[-4px] h-8 w-8 border-4 border-surface rounded-full bg-secondary-container">
              <view class="absolute inset-[10px] rounded-full bg-white" />
            </view>
          </view>
          <text class="mb-2 block text-2xl text-primary font-bold">
            您好，有什么可以帮您？
          </text>
          <text class="block text-sm text-on-surface-variant leading-normal">
            我们的专业团队随时为您提供支持，确保您的海味鲜体验完美无瑕。
          </text>
        </view>

        <!-- Quick Actions -->
        <view class="mb-8 flex gap-3">
          <view class="flex flex-1 flex-col items-center rounded-xl bg-surface-lowest px-4 py-6 shadow-[0_2px_8px_rgba(0,51,102,0.06)]" @tap="handleContact('chat')">
            <view class="mb-3 h-12 w-12 flex items-center justify-center rounded-full bg-surface-high">
              <u-icon name="chat" color="#001e40" size="22" />
            </view>
            <text class="text-xs text-primary font-bold">
              在线客服
            </text>
            <text class="mt-1 text-[10px] text-on-surface-variant">
              即时回复
            </text>
          </view>
          <view class="flex flex-1 flex-col items-center rounded-xl bg-surface-lowest px-4 py-6 shadow-[0_2px_8px_rgba(0,51,102,0.06)]" @tap="handleContact('phone')">
            <view class="mb-3 h-12 w-12 flex items-center justify-center rounded-full bg-surface-high">
              <u-icon name="phone" color="#001e40" size="22" />
            </view>
            <text class="text-xs text-primary font-bold">
              拨打热线
            </text>
            <text class="mt-1 text-[10px] text-on-surface-variant">
              400-888-0000
            </text>
          </view>
        </view>

        <!-- FAQ -->
        <view class="mb-8">
          <view class="mb-4 flex items-center justify-between">
            <text class="text-xl text-primary font-semibold">
              常见问题
            </text>
            <view class="flex items-center gap-0.5 text-xs text-primary font-bold">
              <text>查看全部</text>
              <u-icon name="arrow-right" color="#001e40" size="12" />
            </view>
          </view>

          <view
            v-for="item in faqList"
            :key="item.id"
            class="mb-3 box-border rounded-xl bg-surface-lowest p-4 shadow-[0_2px_8px_rgba(0,51,102,0.06)]"
            @tap="toggleFaq(item.id)"
          >
            <view class="flex items-center justify-between">
              <view class="min-w-0 flex flex-1 items-center gap-3">
                <u-icon :name="item.icon" color="#001e40" size="20" />
                <text class="text-sm text-on-surface font-bold">
                  {{ item.title }}
                </text>
              </view>
              <u-icon
                name="arrow-down"
                color="#737780"
                size="16"
                :class="activeFaq === item.id ? 'rotate-180' : ''"
              />
            </view>
            <view v-if="activeFaq === item.id" class="mt-3 text-sm text-on-surface-variant leading-relaxed">
              <text>{{ item.content }}</text>
            </view>
          </view>
        </view>

        <!-- Banner -->
        <view class="relative h-[180px] overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(0,30,64,0.15)]">
          <image class="h-full w-full" :src="serviceBannerImage" mode="aspectFill" />
          <view class="absolute inset-0 bg-black/30" />
          <view class="absolute bottom-0 left-0 z-[1] p-6">
            <view class="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-[10px] text-white font-bold">
              专属服务
            </view>
            <text class="mb-2 block text-xl text-white font-semibold">
              尊享黑金会员通道
            </text>
            <text class="block text-xs text-white/90">
              为您提供1对1海洋主厨级售前咨询服务
            </text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- Footer -->
    <view class="fixed bottom-0 left-0 right-0 box-border flex gap-3 border-t border-outline-variant bg-surface-lowest/85 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4 backdrop-blur-[12px]">
      <view
        class="box-border h-14 flex flex-1 items-center justify-center gap-2 rounded-xl from-primary to-primary-container bg-gradient-to-br text-base text-white font-bold shadow-[0_8px_20px_rgba(0,30,64,0.25)]"
        @tap="handleContact('chat')"
      >
        <u-icon name="chat-fill" color="#fff" size="20" />
        <text>咨询在线顾问</text>
      </view>
      <view
        class="box-border h-14 w-14 flex shrink-0 items-center justify-center border border-outline-variant rounded-xl bg-surface-high"
        @tap="handleContact('phone')"
      >
        <u-icon name="server-man" color="#001e40" size="22" />
      </view>
    </view>
  </view>
</template>
