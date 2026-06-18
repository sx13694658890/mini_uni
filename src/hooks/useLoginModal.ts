import { computed } from 'vue'
import { useLoginModalStore, useUserStore } from '~/store'

export function useLoginModal() {
  const loginModalStore = useLoginModalStore()
  const { isLogin } = useUserStore()

  const openLoginModal = () => {
    loginModalStore.openModal()
  }

  const closeLoginModal = () => {
    loginModalStore.closeModal()
  }

  const isLoginModalVisible = computed(() => loginModalStore.visible.value)

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
