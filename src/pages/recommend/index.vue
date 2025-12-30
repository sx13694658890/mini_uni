<script setup lang="ts">
import ModelPicker from '~/components/model-picker/index.vue'
import LoadCard from './components/load-card.vue'
import { usePage } from './usePage'

const { authLocation, areaList, searchList, searchValue, searchPageList } = usePage()

definePage({
  style: {
    navigationBarTitleText: '家医推荐',
  },
})
</script>

<template>
  <view class="content h-screen flex flex-col overflow-hidden bg-bg-page">
    <view class="flex items-center bg-white py-3 pl-5 pr-4">
      <view class="mr-2.5 flex items-center">
        <text class="i-custom-position mr-1 h-3 w-3" />
        <ModelPicker :value="searchValue.areaValue" click-away class="ml-2" :list="areaList" has-bar @confirm="searchPageList">
          <template #default="{ renderText }">
            <view class="flex items-center">
              <text class="whitespace-nowrap text-sm text-[#3D3D3D]">
                {{ authLocation ? '定位中' : renderText }}
              </text>
              <text class="i-icon-park-outline:right h-4 w-4 text-[#6F6F6FE5]" />
            </view>
          </template>
        </ModelPicker>
      </view>
      <view class="flex flex-1 items-center border border-primary rounded-3 border-solid py-1 pl-2 pr-1">
        <text class="i-icon-park-outline-search mr-1 h-3.5 w-3.5 text-primary" />
        <u-input v-model="searchValue.hybridSearch" placeholder="请输入机构名称、医生姓名" class="border-none !p-0" />
        <button class="ml-1.5 flex rounded-2.5 bg-[#EDF3FF] px-2 py-1 after:border-none" @click="searchPageList()">
          <text class="text-sm text-primary">
            搜索
          </text>
        </button>
      </view>
    </view>
    <view class="flex-1 overflow-auto px-5 pb-0.5 pt-3.5">
      <LoadCard v-for="item of searchList" :key="item.tenantId" :data="item" />
    </view>
  </view>
</template>
