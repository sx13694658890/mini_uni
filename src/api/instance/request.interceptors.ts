import type { UnConfig } from '@uni-helper/uni-network'
import { useUserStore } from '~/store'

export function requestInterceptors(config: UnConfig) {
  const { loginToken } = useUserStore()
  if (!config.headers) {
    config.headers = {}
  }

  if (loginToken.value) {
    config.headers.Authorization = `Bearer ${loginToken.value}`
  }

  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  return config
}

export function requestInterceptorsError(error: unknown) {
  return Promise.reject(error)
}
