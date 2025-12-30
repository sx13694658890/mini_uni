import type { IUserEntity } from './user.type'
import { getAction, uploadFile } from '~/api/instance'

export function fetchUser(id: IUserEntity['id']) {
  return getAction<IUserEntity>(`/user/${id}`)
}

export function updateAvatar(avatar: string) {
  return uploadFile(`/blade-system/user-oauth/update-avatar`, avatar)
}
