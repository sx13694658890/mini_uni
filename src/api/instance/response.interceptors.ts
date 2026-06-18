import type { UnResponse } from '@uni-helper/uni-network'
import { useUserStore } from '~/store'

interface ApiResponse {
  code: number
  msg: string
}

export function responseInterceptors(response: UnResponse) {
  uni.hideLoading()
  if (typeof response.data === 'string') {
    response.data = JSON.parse(response.data)
  }
  const data = response.data as ApiResponse
  if (response.status === 200) {
    if (data && data.code !== 200) {
      uni.showToast({
        title: data.msg,
        icon: 'none',
        duration: 2000,
      })
      return Promise.reject(data)
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
