import { onMounted, ref } from 'vue'
import { useLoginModal, useServicePage } from '~/hooks'
import { useUserStore } from '~/store'
import { navigateTo, switchTab } from '~/utils'

export interface IServiceMenuItem {
  id: string
  name: string
  icon: string
  color: string
  bgColor: string
  url: NavigateToOptions['url']
  auth?: boolean
  isTab?: boolean
}

export function usePage() {
  const { openLoginModal } = useLoginModal()
  const { isLogin, isRealName } = useUserStore()
  const { goToRealName } = useServicePage()
  const menuServiceList = ref<IServiceMenuItem[]>([])
  const menuList = ref<IServiceMenuItem[]>([
    {
      id: 'healthRecord',
      name: '健康档案',
      icon: 'i-custom-md',
      color: '#3190e8',
      bgColor: '#f0f7ff',
      url: '/pages-sub/homedoctor/detail/index',
      auth: true,
      isTab: false,
    },
    {
      id: 'signUpInfo',
      name: '签约信息',
      icon: 'i-custom-mq',
      color: '#3190e8',
      bgColor: '#f0f7ff',
      url: '/pages-sub/submine/detalSign/index',
      auth: true,
      isTab: false,
    },
    {
      id: 'doctorRecommend',
      name: '家医推荐',
      icon: 'i-custom-mh',
      color: '#3190e8',
      bgColor: '#f0f7ff',
      url: '/pages/recommend/index',
      isTab: true,
    },
    {
      id: 'signUpRights',
      name: '签约权益',
      icon: 'i-custom-my',
      color: '#3190e8',
      bgColor: '#f0f7ff',
      url: '/pages-sub/signuprights/index',
      auth: false,
      isTab: false,
    },

  ])
  function getMenuServiceList() {
    menuServiceList.value = [
      {
        id: 'healthRecord',
        name: '健康档案',
        icon: 'i-custom-healthrecord',
        color: '#3190e8',
        bgColor: '#f0f7ff',
        url: '/pages-sub/homedoctor/detail/index',
        auth: true,
        isTab: false,
      },
      {
        id: 'signUpInfo',
        name: '签约信息',
        icon: 'i-custom-signinfo',
        color: '#3190e8',
        bgColor: '#f0f7ff',
        url: '/pages-sub/submine/detalSign/index',
        auth: true,
        isTab: false,
      },
      {
        id: 'doctorRecommend',
        name: '家医推荐',
        icon: 'i-custom-doctorrecommend',
        color: '#3190e8',
        bgColor: '#f0f7ff',
        url: '/pages/recommend/index',
        isTab: true,
      },
      {
        id: 'signUpRights',
        name: '签约权益',
        icon: 'i-custom-signrights',
        color: '#3190e8',
        bgColor: '#f0f7ff',
        url: '/pages-sub/signuprights/index',
        auth: false,
        isTab: false,
      },
    ]
  }

  function serviceClick(item: any) {
    console.log('servieMenuItem1=====', item)
    navigateToService(item)
  }

  function navigateToService(serviceItem: IServiceMenuItem) {
    if (!isLogin.value && serviceItem.auth) {
      openLoginModal()
      return
    }
    else {
      if (!isRealName.value && serviceItem.auth) {
        // 未实名 去实名
        goToRealName()
        return
      }
    }

    const url: NavigateToOptions['url'] = serviceItem.url

    if (serviceItem.isTab) {
      switchTab(url)
    }
    else {
      navigateTo(url)
    }
  }

  function navigateToWithAuth(url: NavigateToOptions['url'], query: any = {}) {
    if (!isLogin.value) {
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
    navigateTo(url, query)
  }
  onMounted(getMenuServiceList)

  return {
    serviceClick,
    menuServiceList,
    menuList,
    navigateToWithAuth,
  }
}
