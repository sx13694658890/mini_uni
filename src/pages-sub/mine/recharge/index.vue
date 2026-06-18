<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'

interface IRechargePlan {
  id: string
  amount: number
  gift: number
  tag?: string
  tagType?: 'popular' | 'value'
}

const plans: IRechargePlan[] = [
  { id: '100', amount: 100, gift: 10 },
  { id: '500', amount: 500, gift: 60, tag: '最受欢迎', tagType: 'popular' },
  { id: '1000', amount: 1000, gift: 150, tag: '超值推荐', tagType: 'value' },
]

const paymentMethods = [
  { id: 'wechat', label: '微信支付', icon: 'weixin-fill', iconColor: '#07c160', bg: '#ecfdf3' },
  { id: 'alipay', label: '支付宝', icon: 'zhifubao-circle-fill', iconColor: '#1677ff', bg: '#eff6ff' },
  { id: 'bank', label: '银行卡支付', icon: 'rmb-circle', iconColor: '#c2410c', bg: '#fff7ed' },
]

const selectedPlanId = ref('500')
const customAmount = ref('')
const selectedPayment = ref('wechat')
const agreed = ref(true)

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '充值',
  },
})

const payAmount = computed(() => {
  if (selectedPlanId.value === 'custom') {
    const value = Number.parseFloat(customAmount.value)
    return Number.isFinite(value) && value > 0 ? value : 0
  }
  const plan = plans.find(item => item.id === selectedPlanId.value)
  return plan?.amount ?? 0
})

const payAmountText = computed(() => `¥${payAmount.value.toFixed(2)}`)

function selectPlan(id: string) {
  selectedPlanId.value = id
  if (id !== 'custom')
    customAmount.value = ''
}

function selectPayment(id: string) {
  selectedPayment.value = id
}

function onCustomInput(e: { detail: { value: string } }) {
  customAmount.value = e.detail.value
  selectedPlanId.value = 'custom'
}

function handleRecharge() {
  if (!agreed.value) {
    uni.showToast({ title: '请先阅读并同意充值协议', icon: 'none' })
    return
  }
  if (payAmount.value <= 0) {
    uni.showToast({ title: '请选择或输入充值金额', icon: 'none' })
    return
  }
  uni.showToast({ title: '充值功能开发中', icon: 'none' })
}

function planItemClass(id: string, isCustom = false) {
  const active = selectedPlanId.value === id
  if (isCustom) {
    return active
      ? 'border-secondary border-solid bg-[var(--of-secondary-fixed)]'
      : 'border-dashed border-outline-variant bg-surface-low'
  }
  return active
    ? 'border-secondary bg-[var(--of-secondary-fixed)]'
    : 'border-outline-variant bg-surface-lowest'
}

function paymentItemClass(id: string) {
  return selectedPayment.value === id
    ? 'border-primary bg-surface-container'
    : 'border-outline-variant bg-surface-lowest'
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader show-back title="充值" />

    <scroll-view scroll-y class="box-border min-h-0 w-full flex-1" :show-scrollbar="false">
      <view class="box-border w-full px-4 pt-6">
        <!-- Balance Card -->
        <view class="relative box-border w-full overflow-hidden rounded-b-[32px] from-primary to-primary-container bg-gradient-to-b px-8 py-8 text-white shadow-[0_8px_24px_rgba(0,30,64,0.2)]">
          <view class="absolute right-0 top-0 opacity-60">
            <u-icon name="grid" color="rgba(255,255,255,0.1)" size="80" />
          </view>
          <text class="block text-xs tracking-widest opacity-80">
            当前可用余额 (元)
          </text>
          <view class="mt-2 flex items-baseline">
            <text class="mr-1 text-2xl font-bold">
              ¥
            </text>
            <text class="text-5xl font-extrabold leading-none tracking-tight">
              1,258.40
            </text>
          </view>
          <view class="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-3 text-xs">
            <u-icon name="checkmark-circle" color="#fff" size="14" />
            <text>资金由银行级加密保障</text>
          </view>
        </view>

        <!-- Recharge Plans -->
        <view class="mt-8 box-border w-full">
          <view class="mb-4 flex items-center justify-between">
            <text class="text-xl text-primary font-semibold">
              选择充值方案
            </text>
            <text class="text-xs text-secondary font-semibold">
              充越多送越多
            </text>
          </view>
          <view class="grid grid-cols-2 w-full gap-4">
            <view
              v-for="plan in plans"
              :key="plan.id"
              class="relative box-border flex flex-col items-center justify-center border-2 rounded-xl px-4 py-6"
              :class="planItemClass(plan.id)"
              @tap="selectPlan(plan.id)"
            >
              <view
                v-if="plan.tag"
                class="absolute left-1/2 top-[-12px] whitespace-nowrap rounded-full px-3 py-1 text-[10px] text-white font-bold shadow-[0_4px_12px_rgba(0,0,0,0.12)] -translate-x-1/2"
                :class="plan.tagType === 'value' ? 'bg-primary' : 'bg-secondary'"
              >
                {{ plan.tag }}
              </view>
              <text
                class="text-xs"
                :class="selectedPlanId === plan.id ? 'text-secondary' : 'text-on-surface-variant'"
              >
                充值
              </text>
              <text class="mt-1 text-2xl text-on-surface font-bold">
                ¥{{ plan.amount }}
              </text>
              <view
                class="mt-2 rounded-full px-3 py-1 text-xs font-bold"
                :class="selectedPlanId === plan.id ? 'bg-secondary text-white' : 'bg-[var(--of-secondary-fixed)] text-[#380c00]'"
              >
                送 ¥{{ plan.gift }}
              </view>
            </view>

            <view
              class="relative box-border flex flex-col items-center justify-center border-2 rounded-xl px-4 py-6"
              :class="planItemClass('custom', true)"
              @tap="selectPlan('custom')"
            >
              <text class="text-xs text-on-surface-variant">
                自定义金额
              </text>
              <view class="mt-2 w-full flex items-center border-b border-outline">
                <text class="text-lg text-on-surface font-bold">
                  ¥
                </text>
                <input
                  class="h-8 min-w-0 flex-1 text-center text-lg text-on-surface font-bold"
                  type="digit"
                  placeholder="输入金额"
                  placeholder-style="color: rgba(115, 119, 128, 0.5); font-size: 14px;"
                  :value="customAmount"
                  @input="onCustomInput"
                  @focus="selectPlan('custom')"
                >
              </view>
            </view>
          </view>
        </view>

        <!-- Payment Methods -->
        <view class="mt-8 box-border w-full">
          <text class="mb-4 block text-xl text-primary font-semibold">
            支付方式
          </text>
          <view class="w-full flex flex-col gap-3">
            <view
              v-for="item in paymentMethods"
              :key="item.id"
              class="box-border w-full flex items-center justify-between border rounded-xl px-4 py-4"
              :class="paymentItemClass(item.id)"
              @tap="selectPayment(item.id)"
            >
              <view class="min-w-0 flex items-center gap-3">
                <view
                  class="h-10 w-10 flex shrink-0 items-center justify-center rounded-full"
                  :style="{ background: item.bg }"
                >
                  <u-icon :name="item.icon" :color="item.iconColor" size="22" />
                </view>
                <text class="text-base text-on-surface font-semibold">
                  {{ item.label }}
                </text>
              </view>
              <u-icon
                v-if="selectedPayment === item.id"
                name="checkmark-circle-fill"
                color="#001e40"
                size="20"
              />
            </view>
          </view>
        </view>

        <!-- Agreement -->
        <view class="mb-8 mt-6 box-border w-full flex items-start gap-2" @tap="agreed = !agreed">
          <view
            class="mt-0.5 h-4 w-4 flex shrink-0 items-center justify-center border border-outline rounded"
            :class="agreed ? 'border-primary bg-primary' : ''"
          >
            <u-icon v-if="agreed" name="checkmark" color="#fff" size="12" />
          </view>
          <text class="min-w-0 flex-1 text-xs text-on-surface-variant leading-relaxed">
            已阅读并同意
            <text class="text-primary-container font-semibold underline">
              《海味鲜会员充值协议》
            </text>
            及
            <text class="text-primary-container font-semibold underline">
              《隐私权政策》
            </text>
            ，充值金额仅限平台内消费使用。
          </text>
        </view>

        <view class="h-[calc(120px+env(safe-area-inset-bottom))]" />
      </view>
    </scroll-view>

    <!-- Footer -->
    <view class="fixed bottom-0 left-0 right-0 z-[100] box-border flex flex-col items-stretch overflow-hidden border-t border-outline-variant/30 bg-surface px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <view class="box-border flex items-center justify-between px-2 pb-2">
        <text class="text-sm text-on-surface-variant font-medium">
          应付金额
        </text>
        <text class="text-2xl text-secondary font-bold">
          {{ payAmountText }}
        </text>
      </view>
      <view
        class="box-border h-[52px] flex items-center justify-center gap-2 rounded-full bg-primary-container text-lg text-white font-bold shadow-[0_8px_20px_rgba(0,51,102,0.25)]"
        @tap="handleRecharge"
      >
        <u-icon name="bell" color="#fff" size="20" />
        <text>立即充值</text>
      </view>
    </view>
  </view>
</template>
