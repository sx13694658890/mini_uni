export interface IADDFamily {
  realName?: string
  idCard?: string
  gender?: string
  relation?: number
  phone?: string
  code?: string
}

export interface IUserList {
  id: string
  pduId: string
  name: string
  linkPhone: string
  gender: string
  realName: string
  relation: string
  age: null | string
  birthday: Date | null
  relationLabel: string
  isSelf: boolean
  signInfo: Record<string, string>
}

export interface ICardInfo {
  phone: string
  realName: string
}
