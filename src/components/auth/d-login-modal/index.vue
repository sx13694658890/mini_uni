<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import AgreementModal from '~/components/auth/agreement-modal/index.vue'
import { useLoginModalStore, useUserStore } from '~/store'

const emit = defineEmits(['loginSuccessFun'])

const loginModalStore = useLoginModalStore()
const { loginUserAction } = useUserStore()

const loginPopupShow = computed(() => loginModalStore.visible.value)

const popupData = reactive({
  mode: 'bottom',
  round: 16,
  closeOnClickOverlay: true,
  closeable: false,
  zIndex: 10075,
})

const agreeTerms = ref(false)
const agreementModalShow = ref(false)
const agreementTitle = ref('')
const agreementContentHtml = ref('')

const agreements = {
  privacy: {
    title: '隐私政策',
    content: '<p>此处为隐私政策内容，请根据实际业务替换。</p>',
  },
  service: {
    title: '用户服务协议',
    content: '<p>此处为用户服务协议内容，请根据实际业务替换。</p>',
  },
}

function openAgreementModal(type: 'privacy' | 'service') {
  const agreement = agreements[type]
  agreementTitle.value = agreement.title
  agreementContentHtml.value = agreement.content
  agreementModalShow.value = true
}

function closeAgreementModal() {
  agreementModalShow.value = false
}

function closeLoginPopup() {
  loginModalStore.closeModal()
  agreeTerms.value = false
}

function handleGetPhoneNumber(e: any) {
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    const phoneCode = e.detail.code
    uni.login({
      provider: 'weixin',
      success: async (res) => {
        await loginUserAction(res.code, phoneCode)
      },
    })
    emit('loginSuccessFun', phoneCode)
    closeLoginPopup()
  }
  else if (e.detail.errMsg === 'getPhoneNumber:fail user deny') {
    uni.showModal({
      title: '提示',
      showCancel: false,
      content: '为了获得更好的服务，请允许手机授权',
    })
    closeLoginPopup()
  }
  else {
    uni.showToast({ icon: 'none', title: '获取手机号失败' })
    closeLoginPopup()
  }
}
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
      <view class="mb-5">
        <view class="mb-2 text-lg text-text-main fw-[600]">
          获取您的手机号
        </view>
        <view class="text-sm text-text-tips">
          用于登录和身份验证
        </view>
      </view>

      <view class="mb-5">
        <view class="checkbox-container">
          <u-checkbox-group>
            <u-checkbox
              v-model="agreeTerms"
              shape="circle"
              active-color="#2855B3"
              size="20"
            />
          </u-checkbox-group>
          <text class="text-[24rpx] text-text-content line-height-[48rpx]">
            我已阅读并同意
            <text class="text-primary" @click.stop="openAgreementModal('privacy')">
              《隐私政策》
            </text>
            和
            <text class="text-primary" @click.stop="openAgreementModal('service')">
              《用户服务协议》
            </text>
          </text>
        </view>
      </view>

      <view class="mb-5">
        <u-button
          v-if="agreeTerms"
          type="primary"
          shape="circle"
          style="width: 100%"
          open-type="getPhoneNumber"
          text="登录"
          @getphonenumber="handleGetPhoneNumber"
        />
        <u-button
          v-else
          type="primary"
          shape="circle"
          style="width: 100%"
          disabled
          text="登录"
        />
      </view>
    </view>
  </u-popup>

  <AgreementModal
    v-if="agreementModalShow"
    :title="agreementTitle"
    :content="agreementContentHtml"
    @close="closeAgreementModal"
  />
</template>

<style lang="scss" scoped>
.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
</style>
