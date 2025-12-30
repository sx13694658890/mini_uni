import type { IDictData } from '~/api'
import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useCacheMaps = createGlobalState(() => {
  const cacheMaps = ref<Record<string, IDictData[]>>({})

  function getDictListFromCache(code: string) {
    return cacheMaps.value[code] || []
  }

  function setDictListToCache(code: string, dictList: IDictData[]) {
    cacheMaps.value[code] = dictList
  }

  return {
    cacheMaps,
    setDictListToCache,
    getDictListFromCache,
  }
})
