import type { MaybeRefOrGetter } from 'vue'
import { computed, ref, toValue, watch } from 'vue'
import { getDictList } from '~/api'
import { useCacheMaps } from '~/store'

export function useDictData(code: MaybeRefOrGetter<string>) {
  const { setDictListToCache, cacheMaps, getDictListFromCache } = useCacheMaps()
  const dictData = computed(() => cacheMaps.value[toValue(code)] || [])
  const loading = ref(false)

  const mapDict = computed(() => dictData.value.reduce((prev, cur) => ({
    ...prev,
    [cur.dictKey]: cur.dictValue,
  }), {} as Record<string, string>))

  watch(() => toValue(code), (val) => {
    if (val) {
      if (getDictListFromCache(val).length) {
        return
      }
      loading.value = true
      getDictList(val).then((res) => {
        setDictListToCache(val, res || [])
      }).finally(() => {
        loading.value = false
      })
    }
  }, { immediate: true })

  return {
    mapDict,
    dictData,
    loading,
  }
}
