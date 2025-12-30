<script setup lang="ts">
import type { IFamilyPerson } from '../types/index.type'
import { onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { fetchFamilyDelete, fetchFamilyList } from '~/api/modules/mine'
import { useDictData } from '~/components/dict-data/useDictData'
import ModelConfirm from '~/components/model-confirm/index.vue'
import { useConfirm, useUserStore } from '~/store'

import { navigateTo } from '~/utils'
import FimalyCardCustom from '../components/fimalycard_custom.vue'
import FooterButton from '../components/footer_button.vue'

const { showConfirm, confirm, confirmText, msg, closeConfirm } = useConfirm()

const listFimalyPerson = ref<IFamilyPerson[]>([])
const currentItem = ref<IFamilyPerson>()
definePage({
  style: {
    navigationBarTitleText: '家庭成员管理',
  },
})
const { switchFirstUser } = useUserStore()
// 字典-性别类型
const { dictData: sexDict } = useDictData('sys_user_sex')

onShow(() => {
  fetchFamilyList().then((res: any) => {
    console.log('res----', res)
    listFimalyPerson.value = res
  })
})
const list = computed(() => {
  return listFimalyPerson.value.map((item) => {
    return {
      ...item,

      gender: sexDict.value.find((dict: { dictKey: string }) => `${dict.dictKey}` === item.gender)?.dictValue || '',
    }
  })
})

// 处理添加家庭成员点击事件
function handleAddFimalyPerson() {
  navigateTo('/pages-sub/submine/homedoctor/addFimalyPerson', {})
}
function handlerToDetail(item: IFamilyPerson) {
  console.log('handleToDetail------', item)
  navigateTo('/pages-sub/submine/detalSign/index', { id: item.id })
}
// 处理删除家庭成员点击事件
function handlerDelete(item: IFamilyPerson) {
  fetchFamilyDelete(item.id).then(() => {
    closeConfirm()
    fetchFamilyList().then((res: any) => {
      switchFirstUser(item.id)
      listFimalyPerson.value = res
    })
  })
}

function handleTip(item: IFamilyPerson) {
  currentItem.value = item
  showConfirm({
    title: '提示信息',
    msg: '确定解绑该家庭成员么?',
  })
}

function confirmCb() {
  if (!currentItem.value)
    return
  handlerDelete(currentItem.value)
}
</script>

<template>
  <!-- 根容器，使用flex布局撑满屏幕 -->
  <view class="box-border min-h-screen flex flex-col bg-[#EFF4FA] pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] text-xl">
    <!-- 顶部胶囊区域占位 -->
    <!-- <view :style="{ height: topBarHeight + 'px' }" class="w-full bg-[#9F8F47FF]"></view> -->
    <!-- 内容区域，占据剩余空间 -->
    <view class="box-border w-full flex flex-1 flex-col pl-[38rpx] pr-[32rpx] pt-[36rpx]">
      <FimalyCardCustom v-for="item in list" :key="item.id" :current-item="item" @click="handlerToDetail" @delete="handleTip" />
    </view>

    <!-- 底部按钮区域，始终在底部 -->
    <FooterButton text="添加家庭成员" @click="handleAddFimalyPerson" />
    <ModelConfirm
      v-model:show="confirm"
      :title="confirmText"
      :msg="msg"
      confirm-text="确定解绑"
      @confirm="confirmCb"
    />
  </view>
</template>

<style>
.test {

  position: fixed;
  padding-top: 20px;
  font-size: 23px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
