import { areaList } from '@vant/area-data'

export interface IRegionOption {
  code: string
  name: string
}

function mapEntries(record: Record<string, string>) {
  return Object.entries(record).map(([code, name]) => ({ code, name }))
}

export function getProvinceList(): IRegionOption[] {
  return mapEntries(areaList.province_list)
}

export function getCityList(provinceCode: string): IRegionOption[] {
  const prefix = provinceCode.slice(0, 2)
  return mapEntries(areaList.city_list).filter(item => item.code.slice(0, 2) === prefix)
}

export function getDistrictList(cityCode: string): IRegionOption[] {
  const prefix = cityCode.slice(0, 4)
  return mapEntries(areaList.county_list).filter(item => item.code.slice(0, 4) === prefix)
}

export function toPickerColumn(list: IRegionOption[]) {
  return list.map(item => ({ text: item.name, code: item.code }))
}

export function buildRegionColumns(provinceIndex = 0, cityIndex = 0) {
  const provinces = getProvinceList()
  const province = provinces[provinceIndex] ?? provinces[0]
  const cities = getCityList(province.code)
  const city = cities[cityIndex] ?? cities[0]
  const districts = city ? getDistrictList(city.code) : []

  return {
    columns: [
      toPickerColumn(provinces),
      toPickerColumn(cities),
      toPickerColumn(districts),
    ],
    defaultIndex: [
      provinceIndex,
      cityIndex,
      0,
    ] as [number, number, number],
  }
}

export function findRegionIndexes(names: string[]) {
  const [provinceName, cityName, districtName] = names
  const provinces = getProvinceList()
  const provinceIndex = Math.max(provinces.findIndex(item => item.name === provinceName), 0)
  const province = provinces[provinceIndex]
  const cities = getCityList(province.code)
  const cityIndex = Math.max(cities.findIndex(item => item.name === cityName), 0)
  const city = cities[cityIndex]
  const districts = city ? getDistrictList(city.code) : []
  const districtIndex = Math.max(districts.findIndex(item => item.name === districtName), 0)

  return {
    provinceIndex,
    cityIndex,
    districtIndex,
  }
}

export function getRegionNames(indexes: [number, number, number]) {
  const { columns } = buildRegionColumns(indexes[0], indexes[1])
  return [
    columns[0][indexes[0]]?.text,
    columns[1][indexes[1]]?.text,
    columns[2][indexes[2]]?.text,
  ].filter(Boolean) as string[]
}
