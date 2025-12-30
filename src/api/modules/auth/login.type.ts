export interface ILoginResponse {
  access_token: string
}

export interface IUserInfo {
  id: string
  unionId: string
  avatar: string
  phone: string
  pduId: number
  gender: number
  name: string
}
