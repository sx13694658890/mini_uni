<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import AppHeader from '~/components/ocean/app-header.vue'
import RegionPicker from '~/components/ocean/region-picker.vue'
import { useAddressStore } from '~/store'
import { navigateBack } from '~/utils'

const { getById, addAddress, updateAddress, removeAddress } = useAddressStore()

const editId = ref('')
const name = ref('')
const phone = ref('')
const region = ref<string[]>([])
const detail = ref('')
const isDefault = ref(false)
const openerEventChannel = ref<UniApp.EventChannel>()

const focusedField = ref('')

const isEdit = computed(() => !!editId.value)
const pageTitle = computed(() => (isEdit.value ? '编辑收货地址' : '新增收货地址'))
const regionText = computed(() => region.value.filter(Boolean).join(' '))

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '编辑收货地址',
  },
})

onLoad((options) => {
  const page = getCurrentPages().at(-1) as {
    getOpenerEventChannel?: () => UniApp.EventChannel
  }
  openerEventChannel.value = page.getOpenerEventChannel?.()

  if (options?.id) {
    editId.value = options.id as string
    loadForm(options.id as string)
  }
})

function loadForm(id: string) {
  const item = getById(id)
  if (!item) {
    uni.showToast({ title: '地址不存在', icon: 'none' })
    setTimeout(() => uni.navigateBack(), 1500)
    return
  }

  name.value = item.name
  phone.value = item.phone.includes('*') ? '' : item.phone
  if (item.region?.length) {
    region.value = [...item.region]
    detail.value = item.detail ?? ''
  }
  else {
    region.value = []
    detail.value = item.detail ?? item.address
  }
  isDefault.value = !!item.isDefault
}

function onDefaultChange(e: { detail: { value: boolean } } | Event) {
  isDefault.value = (e as { detail: { value: boolean } }).detail.value
}

function setFocus(field: string) {
  focusedField.value = field
}

function clearFocus() {
  focusedField.value = ''
}

function validatePhone(value: string) {
  return /^1\d{10}$/.test(value)
}

function handleSave() {
  const trimmedName = name.value.trim()
  const trimmedPhone = phone.value.trim()
  const trimmedDetail = detail.value.trim()

  if (!trimmedName) {
    uni.showToast({ title: '请填写收货人姓名', icon: 'none' })
    return
  }
  if (!validatePhone(trimmedPhone)) {
    uni.showToast({ title: '请填写正确的手机号码', icon: 'none' })
    return
  }
  if (region.value.length < 3 || region.value.some(item => !item)) {
    uni.showToast({ title: '请选择省、市、区', icon: 'none' })
    return
  }
  if (!trimmedDetail) {
    uni.showToast({ title: '请填写详细地址', icon: 'none' })
    return
  }

  const payload = {
    name: trimmedName,
    phone: trimmedPhone,
    region: [...region.value],
    detail: trimmedDetail,
    isDefault: isDefault.value,
  }

  if (isEdit.value)
    updateAddress(editId.value, payload)
  else
    addAddress(payload)

  openerEventChannel.value?.emit('refreshAddressList')
  navigateBack()
}

function handleDelete() {
  uni.showModal({
    title: '提示',
    content: '确定要删除这个地址吗？',
    confirmColor: '#ba1a1a',
    success(res) {
      if (!res.confirm)
        return
      removeAddress(editId.value)
      openerEventChannel.value?.emit('refreshAddressList', { message: '已删除' })
      navigateBack()
    },
  })
}

function fieldWrapClass(field: string) {
  return focusedField.value === field ? 'field-wrap field-wrap--focus' : 'field-wrap'
}
</script>

<template>
  <view class="box-border h-screen w-full flex flex-col overflow-hidden bg-surface">
    <AppHeader
      show-back
      :title="pageTitle"
      :right-icon="isEdit ? 'trash' : ''"
      @right-click="handleDelete"
    />

    <scroll-view scroll-y class="box-border min-h-0 w-full flex-1" :show-scrollbar="false">
      <view class="box-border px-4 py-6">
        <!-- Contact Info -->
        <view class="mb-4 box-border overflow-hidden rounded-xl bg-surface-lowest shadow-[0_4px_15px_rgba(0,51,102,0.06)]">
          <view class="box-border p-3">
            <view class="mb-4">
              <text class="field-label" :class="{ 'field-label--focus': focusedField === 'name' }">
                收货人
              </text>
              <view :class="fieldWrapClass('name')">
                <input
                  v-model="name"
                  class="field-input"
                  placeholder="请填写收货人姓名"
                  placeholder-class="field-placeholder"
                  maxlength="20"
                  @focus="setFocus('name')"
                  @blur="clearFocus"
                >
                <u-icon name="account-fill" :color="focusedField === 'name' ? '#001e40' : '#c3c6d1'" size="18" />
              </view>
            </view>

            <view>
              <text class="field-label" :class="{ 'field-label--focus': focusedField === 'phone' }">
                手机号码
              </text>
              <view :class="fieldWrapClass('phone')">
                <input
                  v-model="phone"
                  class="field-input"
                  type="number"
                  placeholder="请填写手机号码"
                  placeholder-class="field-placeholder"
                  maxlength="11"
                  @focus="setFocus('phone')"
                  @blur="clearFocus"
                >
                <u-icon name="phone" :color="focusedField === 'phone' ? '#001e40' : '#c3c6d1'" size="18" />
              </view>
            </view>
          </view>
        </view>

        <!-- Address -->
        <view class="mb-4 box-border overflow-hidden rounded-xl bg-surface-lowest shadow-[0_4px_15px_rgba(0,51,102,0.06)]">
          <view class="box-border p-3">
            <view class="mb-4">
              <text class="field-label">
                所在地区
              </text>
              <RegionPicker v-model="region">
                <view class="field-wrap field-wrap--picker">
                  <text :class="regionText ? 'field-value' : 'field-placeholder'">
                    {{ regionText || '请选择省、市、区' }}
                  </text>
                  <u-icon name="arrow-right" color="#c3c6d1" size="16" />
                </view>
              </RegionPicker>
            </view>

            <view>
              <text class="field-label" :class="{ 'field-label--focus': focusedField === 'detail' }">
                详细地址
              </text>
              <view :class="fieldWrapClass('detail')" class="field-wrap field-wrap--textarea">
                <textarea
                  v-model="detail"
                  class="field-textarea"
                  placeholder="街道门牌、楼层房间号等信息"
                  placeholder-class="field-placeholder"
                  maxlength="120"
                  :auto-height="false"
                  @focus="setFocus('detail')"
                  @blur="clearFocus"
                />
              </view>
            </view>
          </view>
        </view>

        <!-- Default Switch -->
        <view class="mb-4 box-border flex items-center justify-between rounded-xl bg-surface-lowest p-3 shadow-[0_4px_15px_rgba(0,51,102,0.06)]">
          <view class="min-w-0 flex flex-1 items-center gap-3">
            <view class="bg-primary-fixed/30 h-9 w-9 flex shrink-0 items-center justify-center rounded-lg">
              <u-icon name="checkmark-circle" color="#003366" size="20" />
            </view>
            <view class="min-w-0 flex-1">
              <text class="block text-base text-on-surface font-semibold">
                设为默认地址
              </text>
              <text class="mt-0.5 block text-xs text-on-surface-variant">
                每次下单时将优先使用此地址
              </text>
            </view>
          </view>
          <switch
            :checked="isDefault"
            color="#003366"
            class="address-switch shrink-0"
            @change="onDefaultChange"
          />
        </view>

        <!-- Hint -->
        <view class="box-border flex items-start gap-3 border border-primary-container/10 rounded-xl bg-primary-container/5 p-4">
          <u-icon name="info-circle" color="#003366" size="18" />
          <text class="min-w-0 flex-1 text-xs text-on-surface-variant leading-relaxed">
            为了确保您的海鲜产品能够以最佳新鲜度送达，请准确填写配送地址。我们优先支持冷链配送覆盖区域。
          </text>
        </view>

        <view class="h-[calc(120px+env(safe-area-inset-bottom))]" />
      </view>
    </scroll-view>

    <!-- Save Button -->
    <view class="fixed bottom-0 left-0 right-0 z-80 box-border border-t border-outline-variant/20 bg-surface/85 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4 backdrop-blur-[8px]">
      <view
        class="box-border h-14 flex items-center justify-center gap-2 rounded-xl bg-primary-container text-lg text-white font-semibold shadow-[0_8px_20px_rgba(0,51,102,0.25)]"
        @tap="handleSave"
      >
        <u-icon name="checkmark" color="#fff" size="20" />
        <text>保存并使用</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.field-label {
  display: block;
  margin-bottom: 8px;
  margin-left: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #43474f;
  transition: color 0.2s;

  &--focus {
    color: #001e40;
  }
}

.field-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  padding: 12px 16px;
  background: #f9f9ff;
  border: 1px solid #c3c6d1;
  border-radius: 8px;
  transition: border-color 0.2s;

  &--focus {
    border-color: #003366;
  }

  &--picker {
    min-height: 48px;
  }

  &--textarea {
    align-items: flex-start;
    min-height: 96px;
  }
}

.field-input,
.field-textarea {
  flex: 1;
  min-width: 0;
  font-size: 16px;
  color: #111c2d;
  background: transparent;
}

.field-textarea {
  width: 100%;
  height: 72px;
  line-height: 1.5;
}

.field-value {
  flex: 1;
  min-width: 0;
  font-size: 16px;
  color: #111c2d;
}

.field-placeholder {
  color: rgba(115, 119, 128, 0.6);
}

.address-switch {
  transform: scale(0.85);
  transform-origin: center right;
}
</style>
