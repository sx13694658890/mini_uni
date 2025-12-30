import type { IDictData } from '../system'
import type { ILocationParams, IRecommendListParams, IRecommendListRes } from './recommend.type'
import { getAction } from '~/api/instance'

const baseUrl = `/wechat/mini/program/api`

export function getLocation(params: ILocationParams) {
  return getAction<string>(`${baseUrl}/location`, params)
}

export function getRecommendList(params: IRecommendListParams) {
  return getAction<IRecommendListRes[]>(`${baseUrl}/deptUserList`, params)
}

export function getLocationList() {
  return getAction<IDictData[]>(`${baseUrl}/dictionary`, { code: 'area_value' })
}

export function getRecommendUser(id: string) {
  return getAction<IRecommendListRes>(`${baseUrl}/userInfo`, { userId: id })
}
