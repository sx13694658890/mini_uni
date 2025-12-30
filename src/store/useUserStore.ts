import type { IUserInfo, IUserList } from '~/api'
import { useStorage } from '@uni-helper/uni-use'
import { createGlobalState } from '@vueuse/core'
import { computed, onMounted } from 'vue'
import { getCurrentPatientUser, getUserInfo, loginByWxPhoneCode } from '~/api'
import { maskSurname } from '~/utils'

export const useUserStore = createGlobalState(() => {
  const loginToken = useStorage<string | null>('user-token', null)

  const loginUser = useStorage<IUserInfo | null>('user-login', null, {
    serializer: {
      read: (value: string) => JSON.parse(value),
      write: (value: IUserInfo | null) => JSON.stringify(value),
    },
  })

  const currentPatientUserId = useStorage<string>('user-patient-id', '')

  const patientUser = useStorage<IUserList | null>('user-patient', null, {
    serializer: {
      read: (value: string) => JSON.parse(value),
      write: (value: IUserList | null) => JSON.stringify(value),
    },
  })

  const isLogin = computed(() => !!loginToken.value && !!loginUser.value)

  const currentPatientUser = computed(() => {
    if (!patientUser.value || !patientUser.value) {
      return null
    }

    const { id, realName, linkPhone, relation } = patientUser.value
    const isSelf = id === loginUser.value?.id
    return {
      id,
      phone: linkPhone,
      relation,
      isSelf,
      name: isSelf
        ? !realName
            ? `用户${linkPhone.slice(-4)}`
            : maskSurname(realName)
        : maskSurname(realName),
    }
  })

  const currentSignPatientUser = computed(() => {
    if (!patientUser.value || !patientUser.value) {
      return null
    }

    const { signInfo } = patientUser.value
    return {
      signInfo,
    }
  })

  const currentSign = computed(() => patientUser.value?.signInfo?.status === '1' || false)

  const isRealName = computed(() => !!loginUser.value?.name)

  async function loginUserAction(code: string, phoneCode: string) {
    const loginRes = await loginByWxPhoneCode(code, phoneCode)

    if (loginRes) {
      loginToken.value = loginRes.access_token
      initPage()
    }
  }

  async function getCurrentUser() {
    const userInfo = await getUserInfo()
    if (userInfo) {
      loginUser.value = userInfo
    }
  }

  async function getCurrentBindPatientUser(userId: string) {
    currentPatientUserId.value = userId
    const patientRes = await getCurrentPatientUser(userId)
    if (patientRes) {
      patientUser.value = patientRes.basicInfo
      patientUser.value.signInfo = patientRes.signInfo
      console.log('patientRes', patientUser.value.signInfo)
    }
  }

  const clearLoginUser = () => {
    loginUser.value = null
  }

  onMounted(initPage)

  function clearPatientUser() {
    currentPatientUserId.value = ''
    patientUser.value = null
  }

  function logout() {
    loginToken.value = null
    currentPatientUserId.value = ''
    clearLoginUser()
    clearPatientUser()
  }

  async function switchFirstUser(userId: string) {
    if (userId === currentPatientUserId.value) {
      if (loginUser.value?.id === userId) {
        initCurrentUser()
        return
      }
      await getCurrentBindPatientUser(loginUser.value!.id)
    }
  }

  async function initCurrentUser() {
    const { phone, gender } = loginUser.value!
    currentPatientUserId.value = loginUser.value!.id
    patientUser.value = {
      id: currentPatientUserId.value,
      pduId: '',
      name: '',
      linkPhone: phone,
      gender: gender ? `${gender}` : '',
      realName: '',
      relation: '0',
      age: '',
      birthday: null,
      relationLabel: '',
      isSelf: true,
      signInfo: {},
    }
  }

  async function initPage() {
    await getCurrentUser()
    if (isRealName.value) {
      await getCurrentBindPatientUser(currentPatientUserId.value || loginUser.value!.id)
      return
    }
    initCurrentUser()
  }

  return {
    loginToken,
    loginUser,
    isLogin,
    isRealName,
    currentSign,
    currentPatientUserId,
    currentPatientUser,
    currentSignPatientUser,
    logout,
    switchFirstUser,
    getCurrentUser,
    loginUserAction,
    getCurrentBindPatientUser,
    clearLoginUser,
    clearPatientUser,
    initPage,
  }
})
