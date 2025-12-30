import { onHide } from '@dcloudio/uni-app'
import { useToggle } from '@vueuse/core'
import { ref } from 'vue'

export interface IConfirmConfig {
  title: string
  msg: string
}

export function useConfirm() {
  const [confirm, toggleConfirm] = useToggle(false)

  const confirmText = ref('提示信息')
  const msg = ref('确认吗')

  onHide(() => {
    toggleConfirm(false)
  })

  function showConfirm(config: IConfirmConfig) {
    toggleConfirm(true)

    confirmText.value = config.title
    msg.value = config.msg
  }

  function closeConfirm() {
    toggleConfirm(false)
  }

  return {
    confirm,
    confirmText,
    msg,
    showConfirm,
    closeConfirm,
  }
}
