<script setup lang="ts">
import DButton from '~/components/d-button/index.vue'
import DCard from '~/components/d-card/index.vue'
import { useLoginModal } from '~/hooks'
import { useUserStore } from '~/store'

const { isLogin, loginUser, logout } = useUserStore()
const { openLoginModal } = useLoginModal()

const appEnv = import.meta.env.VITE_APP_ENV

definePage({
  style: {
    navigationBarTitleText: '首页',
  },
})
</script>

<template>
  <view class="min-h-screen bg-bg-page p-4">
    <DCard title="uni-app 基础框架">
      <view class="flex flex-col gap-3">
        <text class="text-sm text-text-content">
          Vue 3 + TypeScript + uview-plus + UnoCSS
        </text>
        <text class="text-sm text-text-tips">
          环境：{{ appEnv }}
        </text>
      </view>
    </DCard>

    <DCard title="登录状态" class="mt-4">
      <view class="flex flex-col gap-3">
        <text v-if="isLogin" class="text-sm text-text-main">
          已登录：{{ loginUser?.phone || loginUser?.name || '用户' }}
        </text>
        <text v-else class="text-sm text-text-tips">
          未登录
        </text>
        <DButton v-if="!isLogin" text="微信登录" @click="openLoginModal" />
        <DButton v-else text="退出登录" bg-color="#f5f5f5" text-color="#333" @click="logout" />
      </view>
    </DCard>
  </view>
</template>
