import { useLoginModal } from '~/hooks'
import { useUserStore } from '~/store'
import { navigateTo } from '~/utils'

export function useServicePage() {
  const { openLoginModal } = useLoginModal()
  const { isLogin, isRealName, currentPatientUserId } = useUserStore()

  function goLogin() {
    if (!isLogin.value) {
      openLoginModal()
    }
  }

  function goToRealName() {
    console.log('isLogin.value=====', isLogin.value)
    if (!isLogin.value) {
      openLoginModal()
      return
    }
    // 实名认证的页面
    const url: NavigateToOptions['url'] = '/pages-sub/submine/homedoctor/addCertification'
    navigateTo(url, {
      isIdentity: true,
    })
  }

  // 跳转到签约页面
  function goToSignUp(type: string, id?: string) {
    const query: any = {}
    console.log('id=====', id)
    id ? query.id = id : query.id = currentPatientUserId.value

    if (!isLogin.value) {
      // 未登录
      openLoginModal()
      return
    }
    else {
      if (!isRealName.value) {
        // 未实名 去实名
        goToRealName()
        return
      }
    }
    // TODO 去签约页面路径待完善
    const url: NavigateToOptions['url'] = type === 'create' ? '/pages-sub/submine/homedoctor/addFimalyPerson' : '/pages-sub/submine/detalSign/index'
    // 登录后跳转到签约页面，create 时携带参数：是否为去实名认证的判断
    if (type === 'create') {
      navigateTo(url, query)
    }
    else {
      navigateTo(url, query)
    }
  }

  return {
    goToRealName,
    goToSignUp,
    goLogin,
  }
}
