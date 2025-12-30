import type { IDictData } from './dict.type'
import { getAction } from '~/api/instance'

export function getDictList(code: string) {
  return getAction<IDictData[]>(`/blade-system/dict/dictionary`, { code }, {
    enableCache: true,
  })
}
