import type { IDictData, ILocationParams, IRecommendListParams, IRecommendListRes } from '~/api'
import { useToggle } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { getLocation, getLocationList, getRecommendList } from '~/api'
import { getCurrentLocal } from '~/utils'

export function usePage() {
  const [authLocation, toggleAuthLocation] = useToggle()
  const areaDict = ref<IDictData[]>([])
  const searchValue = ref<Omit<IRecommendListParams, 'lat' | 'lon'>>({
    hybridSearch: '',
    areaValue: '',
  })

  async function initDictList() {
    areaDict.value = await getLocationList()
  }

  const areaList = computed(() => areaDict.value.map(item => ({
    name: item.dictValue,
    id: item.dictKey,
  })))

  const location = ref<ILocationParams>({
    lat: '',
    lon: '',
  })

  const searchList = ref<IRecommendListRes[]>([])

  async function checkAuthLocation() {
    try {
      toggleAuthLocation(true)
      const { lat, lon } = await getCurrentLocal()
      location.value = { lat, lon }
      const value = await getLocation(location.value)
      await getLocationAction(value)
    }
    catch {
      getLocationAction()
    }
    finally {
      toggleAuthLocation(false)
    }
  }

  async function getLocationAction(location?: string) {
    await initDictList()
    const [first] = areaDict.value || []
    searchValue.value.areaValue = areaDict.value.find(item => item.dictValue === location)?.dictKey || first?.dictKey || ''
    searchPageList()
  }

  function searchPageList(select?: string) {
    if (select) {
      searchValue.value.areaValue = select
    }
    getRecommendList({
      ...location.value,
      ...searchValue.value,
    }).then((res) => {
      searchList.value = res
    })
  }

  onMounted(checkAuthLocation)

  return {
    searchValue,
    areaList,
    authLocation,
    searchList,
    searchPageList,
  }
}
