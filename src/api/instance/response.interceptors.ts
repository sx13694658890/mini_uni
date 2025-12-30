import type { UnResponse } from '@uni-helper/uni-network'
import { useUserStore } from '~/store'

export function responseInterceptors(response: UnResponse<{ code: number, msg: string }>) {
  uni.hideLoading()
  console.log('response======', response)
  if (typeof response.data === 'string') { // 可能存在response为字符串
    response.data = JSON.parse(response.data)
  }
  if (response.status === 200) {
    if (response.data && response.data.code !== 200) {
      uni.showToast({
        title: response.data.msg,
        icon: 'none',
        duration: 2000,
      })
      return Promise.reject(response.data)
    }
    return response
  }
  return response
}

export function responseInterceptorsError(error: { status: number, msg: string }) {
  const { logout } = useUserStore()
  uni.hideLoading()
  if (error.status === 401) {
    logout()
  }
  return Promise.reject(error)
}
