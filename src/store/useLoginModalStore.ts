import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useLoginModalStore = createGlobalState(() => {
  const visible = ref(false)
  const loading = ref(false)

  const openModal = () => {
    console.log('store: 打开弹窗，当前状态:', visible.value)
    visible.value = true
    console.log('store: 弹窗状态已更新为:', visible.value)
  }

  const closeModal = () => {
    visible.value = false
  }

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  return {
    visible,
    loading,
    openModal,
    closeModal,
    setLoading,
  }
})
