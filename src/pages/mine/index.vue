<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import FooterButton from '~/components/d-button/index.vue'
import ModelConfirm from '~/components/model-confirm/index.vue'
import { usePage } from '~/hooks'
import { useServicePage } from '~/hooks/useServicePage'
import { useConfirm, useUserStore } from '~/store'
import { maskSurname, navigateTo } from '~/utils'
import CardCustom from './components/card_custom.vue'
// 顶部胶囊区域高度
const topBarHeight = ref(0)
const { isLogin, loginUser, logout } = useUserStore()
const { menuList, serviceClick, navigateToWithAuth } = usePage()
const { goLogin } = useServicePage()

const name = computed(() => {
  if (!isLogin.value) {
    return ''
  }
  return !loginUser.value?.name
    ? `用户${loginUser.value?.phone.slice(-4)}`
    : maskSurname(loginUser.value?.name || '')
})

const renderAvatar = computed(() => {
  return loginUser.value?.avatar
})

const { showConfirm, confirm, confirmText, msg, closeConfirm } = useConfirm()

// 获取胶囊按钮信息
function getMenuButtonInfo() {
  try {
    // 获取胶囊按钮信息
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    // 获取系统状态栏高度
    const { statusBarHeight = 0 } = uni.getSystemInfoSync()

    // 计算顶部总高度 = 状态栏高度 + 胶囊按钮高度 + 胶囊按钮与状态栏之间的间距
    // 胶囊按钮底部坐标减去状态栏高度得到胶囊按钮高度和间距之和
    const totalHeight = menuButtonInfo.bottom - statusBarHeight + 10 // 额外增加10px的间距

    topBarHeight.value = totalHeight

    console.log('胶囊按钮信息:', menuButtonInfo)
    console.log('状态栏高度:', statusBarHeight)
    console.log('计算的顶部高度:', totalHeight)
  }
  catch (error) {
    console.error('获取胶囊按钮信息失败:', error)
    // 失败时使用默认值
    topBarHeight.value = 80
  }
}

onMounted(() => {
  getMenuButtonInfo()
})
// 跳转用户管理
function handleNavigateToUserInfo() {
  console.log('跳转用户管理')
  // uni.navigateTo({ // 测试快捷修改
  //   url: '/pages-sub/submine/homedoctor/addCertification',
  // })
  navigateToWithAuth('/pages-sub/submine/homedoctor/index', {})
}
// 编辑个人信息
const editPersonMessage = () => navigateTo('/pages-sub/submine/userInfoEdit/index', { query: '123', query2: ['123', '2333'] })
definePage({
  style: {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom',
  },
})

function handleLogout() {
  showConfirm({
    title: '提示信息',
    msg: '确定退出登录吗？',
  })
}

function handleLogoutUser() {
  closeConfirm()
  logout()
  uni.switchTab({
    url: '/pages/home/index',
  })
}
</script>

<template>
  <!-- 根容器，设置安全区padding -->
  <view
    class="container-mine box-border min-h-screen flex flex-col bg-cover bg-center bg-no-repeat pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
  >
    <!-- 顶部胶囊区域占位 -->
    <view :style="{ height: `${topBarHeight}px` }" class="w-full" />
    <!-- 内容区域 -->

    <view class="header-top box-border pb-[46rpx] pl-[26rpx] pr-[22rpx] pt-8">
      <view class="positive mb-[58rpx] flex flex-col items-center" @click="goLogin">
        <view class="relative h-[128rpx] w-[128rpx] rounded-full">
          <image v-if="isLogin && renderAvatar" :src="renderAvatar" class="h-[128rpx] w-[128rpx] rounded-full" />
          <text v-else class="i-custom:avator h-[128rpx] w-[128rpx]" />

          <view
            v-if="isLogin"
            class="absolute bottom-0 right-0 h-[58rpx] w-[58rpx] flex items-center justify-center rounded-full"
            @click="editPersonMessage"
          >
            <text class="i-custom:me h-[58rpx] w-[58rpx]" />
            <!-- <image src="/static/images/min_autor.webp" class="h-[58rpx] w-[58rpx]" /> -->
          </view>
        </view>
        <text v-if="isLogin" class="mt-[30rpx] text-[36rpx] text-black">
          {{ name }}
        </text>
        <text v-else class="mt-[30rpx] text-[36rpx] text-[#2855B3]">
          当前未登录,请先登录<text class="i-custom:mrblue relative top-[-6rpx] h-4 w-4" />
        </text>
      </view>
      <view class="relative mb-[42rpx] h-[222rpx] w-full" @click="handleNavigateToUserInfo">
        <image class="absolute h-[224rpx] w-full" src="https://fdself.test.dph.cn/familydoctorself/applet/mine_manage.png" alt="">
          <view class="absolute left-[260rpx] top-[66rpx]">
            <view class="mb-[34rpx]">
              <text class="i-custom:mt h-[32rpx] w-[130rpx]" />
            </view>
            <view class="pl-[2rpx]">
              <text class="text-[24rpx] text-[#DBE6FF]">
                绑定亲友实名信息,查看签约信息
              </text>
            </view>
          </view>
        </image>
      </view>
      <view class="pl-[20rpx]">
        <view class="flex flex-col">
          <text class="text=[32rpx] z-[1] text-[#3d3d3d]">
            家医服务
          </text>
          <view class="relative left-[5rpx] top-[-12rpx] h-[12rpx] w-[114rpx] rounded-[8rpx] bg-[#A6BAE2]" />
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="container-list box-border flex flex-1 flex-col pl-[44rpx] pr-[26rpx]">
      <!-- 图标测试组件 -->

      <CardCustom v-for="(item, index) in menuList" :key="index" :item="item" @click="serviceClick(item)">
        <template #title-left>
          <text :class="item.icon" class="h-5 w-5 text-blue" />
        </template>
      </CardCustom>
    </view>

    <!-- 底部安全区占位 -->
    <FooterButton v-if="isLogin" text="退出登录" class="mb-5" @click="handleLogout" />

    <ModelConfirm
      v-model:show="confirm"
      :title="confirmText"
      :msg="msg"
      confirm-text="确定"
      @confirm="handleLogoutUser"
    />
    <!-- <view class="h-8" /> -->
  </view>
</template>

<style lang="scss" scoped>
.container-mine{
  background-image: url('@/static/images/mine/minebg.webp');
  background-size: cover;
  background-position: left top;
  width: 100%;
}
.header-home {
  background-image: url('@/static/images/mine/mine_home.webp');
  background-size: cover;
  background-position: center;
  width: 100%;
}
</style>
