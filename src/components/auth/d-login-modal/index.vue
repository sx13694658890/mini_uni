<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import AgreementModal from '~/components/auth/agreement-modal/index.vue'
import { useAgreement } from '~/hooks'
import { useLoginModalStore, useUserStore } from '~/store'

// 定义组件事件
const emit = defineEmits(['loginSuccessFun'])

// 组件初始化时打印日志
console.log('LoginModal组件开始初始化')

const loginModalStore = useLoginModalStore()
const { loginUserAction } = useUserStore()

// 弹窗显示控制 - 使用计算属性直接绑定到store的visible状态
const loginPopupShow = computed(() => loginModalStore.visible.value)

// 监听visible变化用于调试（可保留）
watch(() => loginModalStore.visible.value, (newValue, oldValue) => {
  console.log('LoginModal: visible 属性从', oldValue, '变化为:', newValue)
})

// 组件挂载完成时打印日志
onMounted(() => {
  console.log('LoginModal组件已完成挂载')
  console.log('LoginModal: 当前visible状态:', loginModalStore.visible.value)
  console.log('LoginModal: 当前loginPopupShow状态:', loginPopupShow.value)
})

// 弹窗配置项（可按需覆盖）
const popupData = reactive({
  mode: 'bottom',
  round: 16, // 顶部圆角
  closeOnClickOverlay: true, // 点击其它区域可关闭弹窗
  closeable: false, // 无右上角关闭图标
  zIndex: 10075,
})

// 同意协议状态 - 默认未选中，确保登录按钮默认不可点击
const agreeTerms = ref(false)

function radioChange() {
  agreeTerms.value = !agreeTerms.value
}

// 协议弹窗控制改为使用 hook 管理
const {
  agreementModalShow,
  agreementTitle,
  agreementContentHtml,
  openAgreementModal,
  closeAgreementModal,
} = useAgreement()

function closeLoginPopup() {
  loginModalStore.closeModal()
  agreeTerms.value = false
  uni.showTabBar()
}

function handleGetPhoneNumber(e: any) {
  // 获取手机号成功
  let phoneCode = ''
  // 这里获取手机号的code
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    // 登陆成功之后拿着信息走后台的登录
    phoneCode = e.detail.code
    console.log('phoneCode', e)
    uni.login({
      provider: 'weixin',
      success: async (res) => {
        loginUserAction(res.code, phoneCode)
      },
      fail: (err) => {
        console.log('login fail', err)
      },
    })
    emit('loginSuccessFun', phoneCode)
    // 关闭弹窗
    closeLoginPopup()
  }
  else if (e.detail.errno === 1400001) {
    console.error('该功能使用次数已达当前小程序上限，暂时无法使用')
    uni.showToast({
      icon: 'none',
      title: '获取手机号次数已达当前小程序上限',
    })
    closeLoginPopup()
  }
  else if (e.detail.errMsg === 'getPhoneNumber:fail user deny' || e.detail.errno === 104) {
    console.error('您已拒绝登录')
    uni.showModal({
      title: '提示',
      showCancel: false,
      content: '为了获得更好的服务，请允许手机授权',
    })
    closeLoginPopup()
  }
  else {
    uni.showToast({
      icon: 'none',
      title: '获取手机号失败',
    })
    console.error('e', e)
    closeLoginPopup()
  }
}

// 复选框直接使用 v-model 控制，无需手动切换
</script>

<template>
  <u-popup
    v-if="loginPopupShow"
    bg-color="#fff"
    :mode="popupData.mode"
    :show="loginPopupShow"
    :round="popupData.round"
    :close-on-click-overlay="popupData.closeOnClickOverlay"
    :z-index="popupData.zIndex"
    @close="closeLoginPopup"
  >
    <view class="p-5">
      <view class="header-section">
        <image class="logo" src="/static/images/logo.png" mode="aspectFit" />
        <view class="text-text-main fw-[500]">
          家庭医生小程序 申请
        </view>
      </view>

      <view class="mb-5">
        <view class="mb-2 text-lg text-text-main fw-[600]">
          获取您的手机号
        </view>
        <view class="text-sm text-text-tips">
          向您提供更好的健康管理服务
        </view>
      </view>

      <view class="mb-5">
        <view class="checkbox-container">
          <u-checkbox-group>
            <u-checkbox
              v-model="agreeTerms"
              shape="circle"
              active-color="#2855B3"
              :disabled="false"
              size="20"
              @change="radioChange()"
            />
          </u-checkbox-group>

          <text class="text-[24rpx] text-text-content line-height-[48rpx]">
            我已阅读并同意
            <text class="text-primary" @click.stop="openAgreementModal('privacy')">
              《隐私政策》
            </text>
            <text class="text-primary" @click.stop="openAgreementModal('service')">
              《家庭医生服务协议》
            </text>，
            未注册的手机号将自动创建为系统登录账号
          </text>
        </view>
      </view>

      <view class="mb-5">
        <u-button
          v-if="agreeTerms"
          type="primary"
          size="default"
          style="width: 100%"
          shape="circle"
          open-type="getPhoneNumber"
          text="登录"
          @getphonenumber="handleGetPhoneNumber"
        />
        <u-button
          v-else
          type="primary"
          size="default"
          shape="circle"
          style="width: 100%"
          class="height-12"
          :disabled="!agreeTerms"
          text="登录"
        />
      </view>
    </view>
  </u-popup>

  <!-- 协议弹窗 -->
  <AgreementModal
    v-if="agreementModalShow"
    :title="agreementTitle"
    :content="agreementContentHtml"
    @close="closeAgreementModal"
  />
</template>

<style lang="scss" scoped>
.header-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.content-section {
  margin-bottom: 20px;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.agreement-text {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
}

/* 协议弹窗样式 */
.agreement-modal-slot {
  width: 85%;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  margin: 0 auto;
}

.agreement-modal-header {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.agreement-modal-title {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #333;
}

.agreement-modal-content {
  padding: 10px 0;
  height: 50vh;
  text-align: justify;
}

.agreement-content-wrapper {
  line-height: 1.3;
}

.agreement-modal-footer {
  padding-top: 16px;
}
</style>
