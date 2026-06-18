import type { IUserInfo } from '~/api'
import { useStorage } from '@uni-helper/uni-use'
import { createGlobalState } from '@vueuse/core'
import { computed } from 'vue'
import { getUserInfo, loginByWxPhoneCode } from '~/api'

export const useUserStore = createGlobalState(() => {
  const loginToken = useStorage<string | null>('user-token', null)

  const loginUser = useStorage<IUserInfo | null>('user-login', null, {
    serializer: {
      read: (value: string) => JSON.parse(value),
      write: (value: IUserInfo | null) => JSON.stringify(value),
    },
  })

  const isLogin = computed(() => !!loginToken.value && !!loginUser.value)

  async function loginUserAction(code: string, phoneCode: string) {
    const loginRes = await loginByWxPhoneCode(code, phoneCode)
    if (loginRes) {
      loginToken.value = loginRes.access_token
      await getCurrentUser()
    }
  }

  async function getCurrentUser() {
    const userInfo = await getUserInfo()
    if (userInfo) {
      loginUser.value = userInfo
    }
  }

  function logout() {
    loginToken.value = null
    loginUser.value = null
  }

  return {
    loginToken,
    loginUser,
    isLogin,
    logout,
    getCurrentUser,
    loginUserAction,
  }
})
