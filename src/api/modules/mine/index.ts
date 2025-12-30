import type { IADDFamily, ICardInfo, IUserList } from './mine.type'
import { getAction, postAction } from '~/api/instance'

export * from './recommend'
export * from './recommend.type'

export function getCurrentPatientUser(id: string) {
  return getAction<{ basicInfo: IUserList, signInfo: Record<string, string> }>('/managefamily/getFamilyMemberDetail', { id })
}

// 获取家庭列表
export function fetchFamilyList() {
  return getAction<IUserList[]>('/managefamily/getFamilyMember')
}

// 添加家庭成员
export function fetchFamilyAdd(data: IADDFamily) {
  return postAction<IADDFamily>('/managefamily/addFamilyMember', data)
}

// 解绑家庭成员
export function fetchFamilyDelete(id: string) {
  return postAction<{ id: string }>('/managefamily/removeFamilyMember', { id })
}

// 添加家庭成员
export function fetchRealNameAuthentication(data: IADDFamily) {
  return postAction<IADDFamily>('/managefamily/realNameAuthentication', data)
}

// 短信验证
export function fetchSendCode(phone: string) {
  return postAction<{ phone: string }>('/managefamily/sendCode', { phone })
}

export function getInfoByCard(idCard: string) {
  return getAction<ICardInfo>('/managefamily/getPduInfo', { idCard })
}
// 获取查看

export function getDetailCard(relationId: string) {
  return getAction('/wechat/mini/program/loginApi/querySignHistory', { relationId })
}
