<script setup lang="ts">
import { ref } from 'vue'
import DButton from '~/components/d-button/index.vue'

import { useServicePage } from '~/hooks/useServicePage'

const { goToSignUp } = useServicePage()

// 长图地址，支持通过路由参数传入 img
const imgUrl = ref('https://fdself.test.dph.cn/familydoctorself/applet/signup-result.png')
const currentSignId = ref('')
definePage({
  style: {
    navigationBarTitleText: '签约申请结果',
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
      <view class="mx-5 mt-8 flex-col-center">
        <text class="text-center text-[32rpx] text-text-main font-[500]">
          恭喜您，签约申请已成功！
        </text>
        <text class="mt-3 text-center text-sm text-text-content">
          您的家医签约申请已提交，预计<text class="text-primary">
            1-3
          </text>个工作日完成审核，请您耐心等待！
        </text>
      </view>

      <!-- 底部固定操作栏：立即签约 -->
      <view class="p-safe-bottom fixed bottom-0 left-0 right-0 z-10 border-t border-gray-200 p-4">
        <!-- TODO 获取查询签约人id -->
        <DButton text="查看签约信息" border-color="#2855B3" text-color="#2855B3" bg-color="#ffffff" class="mt-7 w-full" @click="goToSignUp('detail', currentSignId)" />
      </view>
    </view>
  </view>
</template>

<style scoped>
.p-safe-bottom {
  padding-bottom: calc(env(safe-area-inset-bottom) + 40rpx);
}
</style>
