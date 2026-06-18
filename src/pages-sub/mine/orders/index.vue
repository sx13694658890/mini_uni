<script setup lang="ts">
import type { TOrderTab } from '~/data/mine'
import { computed, ref } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'
import { orders, orderTabs } from '~/data/mine'

const activeTab = ref<TOrderTab>('all')

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的订单',
  },
})

const filteredOrders = computed(() =>
  activeTab.value === 'all'
    ? orders
    : orders.filter(order => order.tab.includes(activeTab.value)),
)

function onAction(action: string) {
  uni.showToast({ title: `${action}功能开发中`, icon: 'none' })
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader show-back title="我的订单" />

    <view class="flex justify-between border-b border-outline-variant/30 bg-surface/90 px-4 py-3">
      <view
        v-for="tab in orderTabs"
        :key="tab.key"
        class="relative px-2 text-xs font-medium"
        :class="activeTab === tab.key ? 'text-primary font-bold' : 'text-on-surface-variant'"
        @tap="activeTab = tab.key"
      >
        {{ tab.label }}
        <view
          v-if="activeTab === tab.key"
          class="absolute bottom-[-12px] left-[20%] right-[20%] h-[3px] rounded-full bg-primary-container"
        />
      </view>
    </view>

    <scroll-view scroll-y class="box-border min-h-0 w-full flex-1" :show-scrollbar="false">
      <view class="box-border p-4">
        <view
          v-for="order in filteredOrders"
          :key="order.id"
          class="mb-3 box-border border border-surface-container rounded-xl bg-surface-lowest p-4 shadow-[0_4px_15px_rgba(0,51,102,0.04)]"
        >
          <view class="mb-4 flex items-center justify-between">
            <view class="flex items-center gap-2 text-xs text-on-surface-variant">
              <u-icon name="calendar" color="#001e40" size="16" />
              <text>{{ order.date }}</text>
            </view>
            <text class="text-xs font-bold" :style="{ color: order.statusColor }">
              {{ order.statusText }}
            </text>
          </view>

          <template v-if="order.multiImages">
            <scroll-view scroll-x class="mb-4 whitespace-nowrap" :show-scrollbar="false">
              <view class="inline-flex gap-3">
                <image
                  v-for="(img, index) in order.multiImages"
                  :key="index"
                  class="h-20 w-20 border border-surface-container rounded-lg"
                  :src="img"
                  mode="aspectFill"
                />
                <view v-if="order.multiCount" class="h-20 w-20 inline-flex items-center justify-center rounded-lg bg-surface-low text-xs text-on-surface-variant">
                  +{{ order.multiCount }} 件
                </view>
              </view>
            </scroll-view>
            <view class="mb-4 flex items-center justify-between text-xs text-on-surface-variant">
              <text>共 {{ order.totalItems }} 件商品</text>
              <view>
                <text>合计: </text>
                <text class="text-[22px] text-secondary font-bold">
                  ¥{{ order.totalPrice?.toFixed(2) }}
                </text>
              </view>
            </view>
          </template>

          <view v-else class="mb-4 flex gap-4">
            <image class="h-24 w-24 shrink-0 rounded-lg bg-surface-container" :src="order.image" mode="aspectFill" />
            <view class="min-w-0 flex flex-1 flex-col justify-between py-1">
              <view>
                <text class="block text-base text-primary font-bold">
                  {{ order.name }}
                </text>
                <text class="mt-1 block text-xs text-on-surface-variant">
                  {{ order.spec }}
                </text>
              </view>
              <view class="flex items-end justify-between">
                <text class="text-xs text-on-surface-variant">
                  数量: x{{ order.quantity }}
                </text>
                <text class="text-[22px] text-secondary font-bold">
                  ¥{{ order.price.toFixed(2) }}
                </text>
              </view>
            </view>
          </view>

          <view class="flex justify-end gap-3 border-t border-outline-variant/20 pt-4">
            <view
              v-for="(action, index) in order.actions"
              :key="action"
              class="border border-primary rounded-full px-5 py-2 text-xs text-primary"
              :class="index === order.actions.length - 1 && order.status === 'pending_receive' || (index === order.actions.length - 1 && action === '再次购买') ? 'border-secondary bg-secondary text-white shadow-[0_4px_12px_rgba(164,60,18,0.2)]' : ''"
              @tap="onAction(action)"
            >
              {{ action }}
            </view>
          </view>
        </view>

        <view v-if="filteredOrders.length === 0" class="flex flex-col items-center gap-4 py-20 text-base text-on-surface-variant">
          <u-icon name="bag" color="#cfdaf2" size="48" />
          <text>暂无相关订单</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
