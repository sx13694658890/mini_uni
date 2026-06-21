<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  buildRegionColumns,
  findRegionIndexes,
  getCityList,
  getDistrictList,
  toPickerColumn,
} from '~/utils/region.util'

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [string[]]
}>()

const show = ref(false)
const columns = ref<Array<Array<{ text: string, code: string }>>>([[], [], []])
const defaultIndex = ref<number[]>([0, 0, 0])
const pickerRef = ref<{ setColumnValues: (columnIndex: number, values: Array<{ text: string, code: string }>) => void }>()

const displayText = computed(() => props.modelValue.filter(Boolean).join(' '))

function initPickerState() {
  if (props.modelValue.length >= 3) {
    const { provinceIndex, cityIndex, districtIndex } = findRegionIndexes(props.modelValue)
    const result = buildRegionColumns(provinceIndex, cityIndex)
    columns.value = result.columns
    defaultIndex.value = [provinceIndex, cityIndex, districtIndex]
    return
  }

  const result = buildRegionColumns()
  columns.value = result.columns
  defaultIndex.value = result.defaultIndex
}

function openPicker() {
  initPickerState()
  show.value = true
}

function onChange(e: {
  columnIndex: number
  index: number
  indexs: number[]
}) {
  const { columnIndex, index, indexs } = e

  if (columnIndex === 0) {
    const province = columns.value[0][index]
    if (!province)
      return
    const cities = toPickerColumn(getCityList(province.code))
    const districts = cities.length
      ? toPickerColumn(getDistrictList(cities[0].code))
      : []
    pickerRef.value?.setColumnValues(1, cities)
    pickerRef.value?.setColumnValues(2, districts)
    defaultIndex.value = [indexs[0], 0, 0]
    return
  }

  if (columnIndex === 1) {
    const city = columns.value[1][index]
    if (!city)
      return
    const districts = toPickerColumn(getDistrictList(city.code))
    pickerRef.value?.setColumnValues(2, districts)
    defaultIndex.value = [indexs[0], indexs[1], 0]
  }
}

function onConfirm(e: { value: Array<{ text: string, code: string } | string> }) {
  const names = e.value.map((item) => {
    if (typeof item === 'string')
      return item
    return item.text
  }).filter(Boolean) as string[]

  emit('update:modelValue', names)
  show.value = false
}

watch(show, (visible) => {
  if (visible)
    initPickerState()
})
</script>

<template>
  <view class="region-picker" @tap="openPicker">
    <slot>
      <view class="region-picker-trigger">
        <text :class="displayText ? 'region-value' : 'region-placeholder'">
          {{ displayText || '请选择省、市、区' }}
        </text>
        <u-icon name="arrow-right" color="#c3c6d1" size="16" />
      </view>
    </slot>
  </view>

  <up-picker
    ref="pickerRef"
    v-model:show="show"
    :columns="columns"
    :default-index="defaultIndex"
    key-name="text"
    title="选择地区"
    confirm-color="#003366"
    @change="onChange"
    @confirm="onConfirm"
  />
</template>

<style lang="scss" scoped>
.region-picker {
  width: 100%;
}

.region-picker-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  background: #f9f9ff;
  border: 1px solid #c3c6d1;
  border-radius: 8px;
}

.region-value {
  flex: 1;
  min-width: 0;
  font-size: 16px;
  color: #111c2d;
}

.region-placeholder {
  flex: 1;
  min-width: 0;
  font-size: 16px;
  color: rgba(115, 119, 128, 0.6);
}
</style>
