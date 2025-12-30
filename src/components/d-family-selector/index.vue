<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { maskSurname } from '~/utils'

interface FamilyMember {
  id: string | number
  name: string
  relation?: string
  isSelf?: boolean
  age?: number
  // 可选签约信息，用于在选择成员后展示
  signStatus?: 'signed' | 'unsigned'
  signStatusLabel?: string
  signInfo?: {
    time?: string
    years?: string
    region?: string
    org?: string
    doctor?: string
    dept?: string
  }
}

const props = withDefaults(defineProps<{
  show: boolean
  familyId: string | number
  title?: string
  confirmText?: string
  cancelText?: string
}>(), {
  title: '请选择家庭成员',
  confirmText: '切换家庭成员',
  cancelText: '取消',
})

const emit = defineEmits<{
  (e: 'update:show', v: boolean): void
  (e: 'confirm', payload: { member: FamilyMember | null }): void
}>()

const members = ref<FamilyMember[]>([])
const selected = ref<FamilyMember | null>(null)

function relationText(m: FamilyMember) {
  return m.relation ?? '成员'
}

function fetchMembers() {
  const mockMap: Record<string | number, FamilyMember[]> = {
    1: [
      { id: '1', name: '张叁', relation: '本人', isSelf: true, signStatus: 'signed', signStatusLabel: '已签约', signInfo: { time: '2025-09-30 15:00:00', years: '1年', region: '铁西区', org: '铁西区重工街道社区卫生服务中心', doctor: '王子轩', dept: '神经内科' } },
      { id: '2', name: '张爸爸', relation: '父亲' },
      { id: '3', name: '张妈妈', relation: '母亲', signStatus: 'unsigned', signStatusLabel: '未签约' },
      { id: '4', name: '张配偶', relation: '配偶', signStatus: 'unsigned', signStatusLabel: '未签约' },
      { id: '5', name: '张儿子', relation: '儿子' },
      { id: '6', name: '张女儿', relation: '女儿' },
      { id: '7', name: '张孙子', relation: '孙子' },
      { id: '8', name: '张孙女', relation: '孙女' },
    ],
    2: [
      { id: '21', name: '李**', relation: '本人', isSelf: true, signStatus: 'unsigned', signStatusLabel: '未签约' },
      { id: '22', name: '李父', relation: '父亲' },
      { id: '23', name: '李母', relation: '母亲' },
    ],
  }

  const data = mockMap[props.familyId] ?? [
    { id: '1', name: '张叁', relation: '本人', isSelf: true },
    { id: '2', name: '张爸爸', relation: '父亲' },
    { id: '3', name: '张妈妈', relation: '母亲' },
  ]

  members.value = data
  selected.value = members.value.find(m => m.isSelf) ?? members.value[0] ?? null
}

function select(m: FamilyMember) {
  selected.value = m
}

function confirm() {
  emit('confirm', { member: selected.value })
  emit('update:show', false)
}

function close() {
  emit('update:show', false)
}

watch(() => props.show, (val) => {
  if (val)
    fetchMembers()
})

onMounted(() => {
  if (props.show)
    fetchMembers()
})
</script>

<template>
  <u-popup
    :show="show"
    mode="center"
    bg-color="#fff"
    :round="20"
    :close-on-click-overlay="true"
    @close="close"
  >
    <view class="selector-wrap">
      <view class="selector-title">
        {{ title }}
      </view>

      <scroll-view class="selector-list" scroll-y>
        <view
          v-for="(member, idx) in members"
          :key="member.id ?? idx"
          class="selector-item" :class="[(selected && selected.id === member.id) ? 'active' : '']"
          @click="select(member)"
        >
          <view class="item-left">
            <text class="item-name">
              {{ maskSurname(member.name) }}
            </text>
          </view>
          <view class="item-right">
            <u-tag
              :text="member.isSelf ? '本人' : relationText(member)"
              type="primary"
              size="mini"
              plain
            />
          </view>
        </view>
      </scroll-view>

      <view class="selector-actions">
        <u-button
          class="confirm-btn"
          type="primary"
          :text="confirmText"
          @click="confirm"
        />
        <text class="cancel-text" @click="close">
          {{ cancelText }}
        </text>
      </view>
    </view>
  </u-popup>
</template>

<style scoped lang="scss">
.selector-wrap {
  width: 640rpx;
  padding: 24rpx 24rpx 16rpx;
  border-radius: 20rpx;
}
.selector-title {
  text-align: center;
  font-weight: 600;
  font-size: 30rpx;
  margin-bottom: 12rpx;
}
.selector-list {
  max-height: 500rpx;
  overflow: auto;
  padding: 10rpx 0;
}
.selector-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18rpx 10rpx;
  border-bottom: 1rpx solid #f0f0f0;
  transition: background-color 0.2s ease;
}
.item-name {
  font-size: 28rpx;
}
.selector-item.active {
  background-color: #f0f7ff; // 选中高亮
}
.selector-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  padding-top: 24rpx;
}
.confirm-btn {
  width: 520rpx;
  border-radius: 60rpx;
}
.cancel-text {
  color: #999;
  font-size: 26rpx;
}
</style>
