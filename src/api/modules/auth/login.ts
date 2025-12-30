import type { ILoginResponse, IUserInfo } from './login.type'
import { getAction, postAction } from '~/api/instance'

// 使用微信一键获取手机号的 code 登录
export function loginByWxPhoneCode(code: string, phoneCode: string) {
  return postAction<ILoginResponse>('/blade-auth/oauth/wx-mini-program/token', {
    code,
    phoneCode,
  })
}

export function getUserInfo() {
  return getAction<IUserInfo>(`/blade-system/user-oauth/user-info`)
}
