import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useLoginModalStore = createGlobalState(() => {
  const visible = ref(false)
  const loading = ref(false)

  const openModal = () => {
    visible.value = true
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
