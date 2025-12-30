import type { UnConfig } from '@uni-helper/uni-network'
import { un } from '@uni-helper/uni-network'
import { requestInterceptors, requestInterceptorsError } from './request.interceptors'
import { responseInterceptors, responseInterceptorsError } from './response.interceptors'

const instance = un.create({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
})

instance.interceptors.request.use(requestInterceptors, requestInterceptorsError)
instance.interceptors.response.use(responseInterceptors, responseInterceptorsError)

export function getAction<T>(url: string, params?: any, options?: UnConfig<{ data: T }>) {
  return instance.get<{ data: T }>(url, { params, ...options }).then(res => res.data?.data as T)
}

export function uploadFile(url: string, filePath: string) {
  return instance.upload<{ data: any }>({
    url,
    filePath,
    name: 'avatar',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data?.data as unknown)
}

export function postAction<T>(url: string, data?: any, options?: UnConfig<{ data: T }>) {
  return instance.post<{ data: T }>(url, data, options).then(res => res.data?.data as T)
}
