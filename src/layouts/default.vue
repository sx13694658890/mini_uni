<script lang="ts" setup>
import LoginModal from '~/components/auth/d-login-modal/index.vue'
</script>

<template>
  <div>
    <!-- parent layout -->
    <view>
      <slot />
    </view>
  </div>

  <!-- 全局 登录弹窗 -->
  <LoginModal />
</template>
