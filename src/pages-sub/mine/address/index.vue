<script setup lang="ts">
import type { IAddressItem } from '~/data/mine'
import { ref } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'
import { addresses as initialAddresses } from '~/data/mine'

const addressList = ref<IAddressItem[]>([...initialAddresses])

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '收货地址',
  },
})

function handleEdit() {
  uni.showToast({ title: '编辑功能开发中', icon: 'none' })
}

function handleDelete(id: string) {
  uni.showModal({
    title: '提示',
    content: '确定要删除这个地址吗？',
    success(res) {
      if (res.confirm)
        addressList.value = addressList.value.filter(item => item.id !== id)
    },
  })
}

function handleAdd() {
  uni.showToast({ title: '新增地址功能开发中', icon: 'none' })
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader show-back title="收货地址" />

    <scroll-view scroll-y class="box-border min-h-0 w-full flex-1" :show-scrollbar="false">
      <view class="box-border px-4 pb-[120px] pt-2">
        <text class="block py-2 pb-4 text-xs text-on-surface-variant">
          共 {{ addressList.length }} 条地址
        </text>

        <view
          v-for="item in addressList"
          :key="item.id"
          class="mb-4 box-border rounded-xl bg-surface-lowest px-4 py-4 shadow-[0_4px_15px_rgba(0,51,102,0.08)]"
        >
          <view>
            <view class="mb-1 flex flex-wrap items-center gap-2">
              <text class="text-xl text-on-surface font-semibold">
                {{ item.name }}
              </text>
              <text class="text-sm text-on-surface-variant">
                {{ item.phone }}
              </text>
              <view v-if="item.isDefault" class="rounded-full bg-primary-container px-2 py-0.5 text-[10px] text-[#799dd6] font-bold">
                默认
              </view>
            </view>
            <text class="block text-sm text-on-surface-variant leading-relaxed">
              {{ item.address }}
            </text>
          </view>
          <view class="mt-4 flex justify-end gap-6 border-t border-outline-variant pt-4">
            <view class="flex items-center gap-1 text-xs text-on-surface-variant" @tap="handleEdit">
              <u-icon name="edit-pen" color="#43474f" size="16" />
              <text>编辑</text>
            </view>
            <view class="flex items-center gap-1 text-xs text-on-surface-variant active:text-[#ba1a1a]" @tap="handleDelete(item.id)">
              <u-icon name="trash" color="#43474f" size="16" />
              <text>删除</text>
            </view>
          </view>
        </view>

        <view class="flex flex-col items-center gap-2 py-12 text-xs text-on-surface-variant opacity-20">
          <u-icon name="map" color="#cfdaf2" size="48" />
          <text>Ocean Fresh · 极速送达</text>
        </view>
      </view>
    </scroll-view>

    <view class="fixed bottom-0 left-0 right-0 box-border bg-surface/85 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4 backdrop-blur-[8px]">
      <view
        class="box-border h-14 flex items-center justify-center gap-2 rounded-full bg-secondary-container text-xl text-[var(--of-on-secondary-fixed-variant)] font-semibold shadow-[0_8px_20px_rgba(254,126,79,0.35)]"
        @tap="handleAdd"
      >
        <u-icon name="plus" color="#822800" size="20" />
        <text>新增收货地址</text>
      </view>
    </view>
  </view>
</template>
