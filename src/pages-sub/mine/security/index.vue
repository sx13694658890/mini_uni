<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'
import { devices, securityItems } from '~/data/mine'

const bioEnabled = ref(true)

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '账户与安全',
  },
})

function handleItem(item: typeof securityItems[0]) {
  if (item.toggle)
    return
  uni.showToast({ title: `${item.title}功能开发中`, icon: 'none' })
}

function handleRemove() {
  uni.showToast({ title: '移除设备功能开发中', icon: 'none' })
}

function handleDeleteAccount() {
  uni.showModal({
    title: '注销账户',
    content: '注销后所有数据将无法找回，请谨慎操作。',
    confirmColor: '#ba1a1a',
    success(res) {
      if (res.confirm)
        uni.showToast({ title: '注销功能开发中', icon: 'none' })
    },
  })
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader show-back title="账户与安全" right-icon="question-circle" />

    <scroll-view scroll-y class="box-border min-h-0 w-full flex-1" :show-scrollbar="false">
      <view class="box-border p-4">
        <!-- Security Score -->
        <view class="relative mb-6 box-border flex flex-col items-center overflow-hidden border border-white/30 rounded-xl bg-surface-lowest/80 p-6 shadow-[0_4px_20px_rgba(0,51,102,0.08)]">
          <view class="relative mb-4 h-40 w-40">
            <view class="relative h-full w-full">
              <view class="absolute inset-0 box-border border-8 border-surface-high rounded-full" />
              <view
                class="absolute inset-0 box-border rotate-[-30deg] border-8 border-secondary-container rounded-full"
                style="clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0);"
              />
            </view>
            <view class="absolute inset-0 flex flex-col items-center justify-center">
              <text class="text-2xl text-primary font-bold">
                85
              </text>
              <text class="text-xs text-on-surface-variant">
                安全分
              </text>
            </view>
            <view class="absolute left-1/2 top-[-8px] rounded-full bg-surface p-1 shadow-[0_4px_12px_rgba(0,51,102,0.1)] -translate-x-1/2">
              <u-icon name="checkmark-circle-fill" color="#fe7e4f" size="18" />
            </view>
          </view>
          <text class="mb-1 text-xl text-primary font-semibold">
            您的账户安全等级：高
          </text>
          <text class="text-sm text-on-surface-variant">
            账户受保护良好，建议定期更换密码
          </text>
        </view>

        <!-- Security Items -->
        <view class="mb-6 flex flex-col gap-3">
          <view
            v-for="item in securityItems"
            :key="item.id"
            class="box-border flex items-center justify-between rounded-xl bg-surface-lowest p-4 shadow-[0_2px_8px_rgba(0,51,102,0.06)]"
            @tap="handleItem(item)"
          >
            <view class="min-w-0 flex flex-1 items-center gap-4">
              <view class="h-12 w-12 flex shrink-0 items-center justify-center rounded-full bg-surface-container">
                <u-icon :name="item.icon" color="#001e40" size="22" />
              </view>
              <view>
                <text class="block text-base text-on-surface font-bold">
                  {{ item.title }}
                </text>
                <text class="mt-0.5 block text-xs text-on-surface-variant">
                  {{ item.desc }}
                </text>
              </view>
            </view>
            <view
              v-if="item.toggle"
              class="box-border h-6 w-10 rounded-full p-0.5"
              :class="bioEnabled ? 'bg-primary' : 'bg-outline-variant'"
              @tap.stop="bioEnabled = !bioEnabled"
            >
              <view
                class="h-4 w-4 rounded-full bg-white transition-transform"
                :class="bioEnabled ? 'translate-x-4' : ''"
              />
            </view>
            <view v-else class="flex shrink-0 items-center gap-1 text-xs text-on-surface-variant">
              <text :class="item.trailingHighlight ? 'text-secondary font-bold' : ''">
                {{ item.trailing }}
              </text>
              <u-icon name="arrow-right" color="#737780" size="16" />
            </view>
          </view>
        </view>

        <!-- Devices -->
        <view class="mb-8">
          <text class="mb-4 block pl-1 text-xl text-primary font-semibold">
            常用设备
          </text>
          <view class="overflow-hidden rounded-xl bg-surface-low">
            <view
              v-for="(device, index) in devices"
              :key="device.id"
              class="flex items-center justify-between p-4"
              :class="index === 0 ? 'border-b border-outline-variant' : ''"
            >
              <view class="min-w-0 flex flex-1 items-center gap-4">
                <u-icon :name="device.icon" :color="device.current ? '#001e40' : '#43474f'" size="20" />
                <view>
                  <text
                    class="block text-sm font-bold"
                    :class="device.current ? 'text-on-surface' : 'text-on-surface-variant'"
                  >
                    {{ device.name }}
                  </text>
                  <text class="block text-xs text-on-surface-variant">
                    {{ device.meta }}
                  </text>
                </view>
              </view>
              <text v-if="!device.current" class="shrink-0 text-xs text-[#ba1a1a]" @tap="handleRemove">
                移除
              </text>
            </view>
          </view>
        </view>

        <!-- Danger Zone -->
        <view class="pt-4">
          <view
            class="flex items-center justify-center gap-2 rounded-xl bg-[#ffdad6] p-4 text-[#93000a] font-bold"
            @tap="handleDeleteAccount"
          >
            <u-icon name="trash" color="#93000a" size="18" />
            <text>注销账户</text>
          </view>
          <text class="mt-4 block px-4 text-center text-xs text-on-surface-variant">
            注意：注销后所有数据将无法找回，请谨慎操作。
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
