<script setup lang="ts">
import { ref } from 'vue'
import DButton from '~/components/d-button/index.vue'
import { useServicePage } from '~/hooks'
import { useUserStore } from '~/store'

const { goToSignUp } = useServicePage()
const { currentSign } = useUserStore()

// 长图地址，支持通过路由参数传入 img
const imgUrl = ref('https://fdself.test.dph.cn/familydoctorself/applet/signupright2x.jpg')

definePage({
  style: {
    navigationBarTitleText: '签约权益',
    navigationStyle: 'default',
  },
})
</script>

<template>
  <!-- 页面容器：滚动由页面自然撑开，底部按钮固定 -->
  <view class="relative min-h-screen w-full bg-white">
    <!-- 内容区域：为固定按钮预留底部内边距，避免遮挡 -->
    <view class="px-0">
      <image
        class="block w-full"
        :src="imgUrl"
        mode="widthFix"
      />
    </view>

    <!-- 底部固定操作栏：立即签约 -->
    <view class="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-200 p-4 pb-[env(safe-area-inset-bottom)]">
      <DButton v-if="!currentSign" text="立即签约" class="mt-7 w-full" @click="goToSignUp('create')" />
      <DButton v-else text="查看签约信息" class="mt-7 w-full" @click="goToSignUp('detail')" />
    </view>
  </view>
</template>

<style scoped>
</style>
