export interface ILocationParams {
  lat: string
  lon: string
}

export interface ILocationRes {
  city: string
}

export interface IRecommendListParams extends ILocationParams {
  hybridSearch: string
  areaValue: string
}

export interface IDoctorList {
  /**
   * 用户扩展id
   */
  pcaId: number
  /**
   * 用户id
   */
  userId: number
  /**
   * 用户名称
   */
  doctorName: string
  /**
   * 部门值
   */
  deptValue: string
  /**
   * 部门名称
   */
  deptValueLabel: string
  /**
   * 医生简介
   */
  doctorsProfile: string
  /**
   * 出诊时间
   */
  outpatientTime: string
  /**
   * 二维码
   */
  qrCodeUrl: string
  /**
   * 卡片类型
   */
  cardType: string
  /**
   * 卡片类型名称
   */
  cardTypeLabel: string
}

export interface IRecommendListRes {
  tenantId: string
  tenantName: string
  exactAddress: string
  areaValueLabel: string
  distance: string
  userList: IDoctorList[]
}
