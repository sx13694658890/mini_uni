import type { UnConfig } from '@uni-helper/uni-network'
import { useUserStore } from '~/store'

export const isAuthUrl = (url?: string) => url?.includes('/social/oauth/token')

export function requestInterceptors(config: UnConfig) {
  const { loginToken } = useUserStore()
  if (!config.headers) {
    config.headers = {}
  }
  config.headers.Authorization = `Basic ZmFtaWx5RG9jdG9yV3hNaU5pUHJvZ3JhbTpGYW1eRG9jXk1pbmleUHJvJDIwMjU=`
  config.headers['blade-auth'] = `Bearer ${loginToken.value}`
  config.headers['blade-requested-with'] = 'BladeHttpRequest'

  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  return config
}

export function requestInterceptorsError(error: unknown) {
  return Promise.reject(error)
}
