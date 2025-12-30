<script lang="ts" setup generic="T">
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  confirmText?: string
  inline?: boolean
  clickAway?: boolean
  hasBar?: boolean
  list?: (T extends { id: string, name: string } ? T : never)[]
}>(), {
  title: '',
  confirmText: '确定',
  list: () => ([]),
  inline: false,
  clickAway: false,
  hasBar: false,
})

const emits = defineEmits<{
  (e: 'confirm', id: string): void
}>()

const value = defineModel<string>('value', {
  default: undefined,
})
const selectValue = ref<number[]>([0])
const renderText = computed(() => props.list.find(item => item.id === value.value)?.name || '')
const columns = computed(() => [props.list])

const firstSelect = computed(() => {
  const [firstValue] = selectValue.value
  return firstValue
})

function handleChangeValue(e: CustomEvent) {
  const { detail } = e
  selectValue.value = [detail.value[0]]
}

const showValue = defineModel<boolean>('show', {
  default: false,
})

function handleOpenPopup() {
  showValue.value = true
}
defineExpose({
  show: handleOpenPopup,
})
function confirmValue() {
  const realKey = props.list[firstSelect.value]?.id
  emits('confirm', realKey)
  if (!props.inline) {
    // value.value = realKey
    handleClosePopup()
  }
}

watch(showValue, (val) => {
  if (val) {
    selectValue.value = value.value ? [props.list.findIndex(item => item.id === value.value)] : [0]
  }
  if (props.hasBar) {
    val ? uni.hideTabBar() : uni.showTabBar()
  }
})

function handleClosePopup() {
  showValue.value = false
}
</script>

<template>
  <view>
    <up-popup
      :close-on-click-overlay="false"
      :show="showValue" mode="bottom" overlay @close="handleClosePopup"
    >
      <view class="w-full overflow-hidden rounded-3">
        <view class="mx-7 py-5">
          <view class="flex justify-between">
            <text class="text-base text-text-content" @click="handleClosePopup">
              取消
            </text>
            <view class="flex-1 text-center">
              <text class="text-base text-text-main font-500">
                {{ title }}
              </text>
            </view>
            <text class="text-base text-primary font-500" @click="confirmValue">
              {{ confirmText }}
            </text>
          </view>
          <view class="h-68.5 w-full flex flex-col">
            <picker-view indicator-class="dph-picker" class="h-full w-full" :value="selectValue" @change="handleChangeValue">
              <picker-view-column v-for="(renderItem, renderIndex) in columns" :key="renderIndex">
                <view
                  v-for="(item, index) in renderItem" :key="item.id"
                  class="flex items-center justify-center text-base"
                  :class="firstSelect === index ? ' text-primary font-500' : ' text-text-tips'"
                >
                  <slot name="item" :item="item">
                    {{ item.name }}
                  </slot>
                </view>
              </picker-view-column>
            </picker-view>
          </view>
        </view>
      </view>
    </up-popup>
    <view v-if="!inline" class="w-[100rpx] flex items-center justify-end" @tap="handleOpenPopup">
      <slot :render-text="renderText">
        <text class="i-custom:mr h-5 w-5" />
      </slot>
    </view>
  </view>
</template>

<style lang="scss">
.dph-picker {
  height: 40px;
  line-height: 40px;
}
</style>
