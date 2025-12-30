<script lang="ts" setup>
import type { IRecommendListRes } from '~/api'
import { computed, ref } from 'vue'
import { navigateTo } from '~/utils'

defineOptions({
  name: 'LoadCard',
})

const props = withDefaults(defineProps<{ data: IRecommendListRes }>(), {})

const renderBaseData = computed(() => ({
  ...props.data,
  distance: props.data.distance ? `${(+props.data.distance / 1000).toFixed(2)}km` : '',
}))

const currentPage = ref(1)

const renderList = computed(() => {
  return props.data.userList.slice(0, currentPage.value * 5)
})

const showMore = computed(() => {
  return renderList.value.length < props.data.userList.length
})

function handleNextPage() {
  currentPage.value++
}

function handleClick(item: IRecommendListRes['userList'][0]) {
  navigateTo('/pages-sub/homedoctor/detail/index', {
    id: item.userId,
  })
}
</script>

<template>
  <view class="mb-3 overflow-hidden">
    <view class="mb-3 flex items-start">
      <view class="flex flex-1 flex-col">
        <text class="mb-1 text-sm text-text-main">
          {{ renderBaseData.tenantName }}
        </text>
        <text class="text-[24rpx] text-text-content leading-5">
          {{ renderBaseData.exactAddress }}
        </text>
      </view>
      <view v-if="renderBaseData.distance" class="flex items-center">
        <text class="i-custom-location mr-1 h-4.5 w-4.5" />
        <text class="text-sm text-text-content leading-5">
          {{ renderBaseData.distance }}
        </text>
      </view>
    </view>
    <view class="flex flex-col rounded-2 bg-white">
      <view
        v-for="(item, index) of renderList" :key="item.userId"
        class="mx-3.5 flex items-end overflow-hidden border-b border-b-[#ececec] border-b-solid py-3.5"
        :class="{ 'border-b-0': renderList.length === index + 1 }" @click="handleClick(item)"
      >
        <view class="flex-1 overflow-hidden">
          <view class="flex items-center">
            <text class="mr-2.5 text-base text-text-main">
              {{ item.doctorName }}
            </text>
            <view class="flex items-center rounded-br-2 rounded-tl-2 bg-primary px-1.2 py-1">
              <text class="text-[24rpx] text-white">
                {{ item.deptValueLabel }}
              </text>
            </view>
          </view>
          <view class="mt-2.5 w-full overflow-hidden">
            <text class="inline-block w-full truncate text-[24rpx] text-text-main">
              简介: {{ item.doctorsProfile }}
            </text>
          </view>
        </view>
        <button class="mb-1 ml-2 flex flex-none items-center border border-primary rounded-8 border-solid bg-[#2855B333] px-3.5 py-1 text-primary">
          <text class="i-fa-weixin mr-1 h-4 w-4" />
          <text class="text-base">
            添加
          </text>
        </button>
      </view>
      <view v-if="showMore" class="rounded-b-2 bg-[#D4DDF0] py-2.5 text-center" @click="handleNextPage">
        <text class="text-sm text-primary font-bold">
          {{ data.userList.length }}个医生可选, 点击展开更多
        </text>
        <text class="i-icon-park-outline:down ml-4 h-5 w-5 text-primary" />
      </view>
    </view>
  </view>
</template>
