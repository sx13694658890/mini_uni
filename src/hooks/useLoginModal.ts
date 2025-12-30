import { computed } from 'vue'
import { useLoginModalStore, useUserStore } from '~/store'

export function useLoginModal() {
  const loginModalStore = useLoginModalStore()
  const { isLogin } = useUserStore()

  const openLoginModal = () => {
    console.log('useLoginModal: 尝试打开登录弹窗')
    uni.hideTabBar()
    loginModalStore.openModal()

    console.log('useLoginModal: 弹窗状态已设置为:', loginModalStore.visible.value)
  }

  const closeLoginModal = () => {
    uni.showTabBar()
    loginModalStore.closeModal()
  }

  const isLoginModalVisible = computed(() => {
    return loginModalStore.visible.value
  })

  // 检查登录状态，如果未登录则打开登录弹窗
  const checkLoginAndExecute = (callback: () => void) => {
    if (!isLogin.value) {
      openLoginModal()
      return false
    }
    callback()
    return true
  }

  return {
    openLoginModal,
    closeLoginModal,
    isLoginModalVisible,
    checkLoginAndExecute,
  }
}
