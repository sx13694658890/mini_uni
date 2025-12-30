<script setup lang="ts">
import type { IProps } from '../types/index.type'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { computed, reactive, ref } from 'vue'
import { getDetailCard } from '~/api'
import SignCard from '~/components/biz/sign-card/index.vue'
import { useUserStore } from '~/store'
import CardInfo from '../components/card_Info.vue'
import Empty from '../components/empty.vue'
import FooterButton from '../components/footer_button.vue'
import FooterEmpty from '../components/footer_empty.vue'
import userInfoMessage from '../components/userInfoMessage.vue'

const { currentPatientUserId } = useUserStore()
const currentId = ref('') // 当前Id
const currentList = ref<any[]>([]) // 当前列表
const contentInfo = reactive<Record<keyof IProps, string>>({
  '姓名:': '',
  '性别:': '',
  '身份证号码:': '',
  '手机号码:': '',
  '关系:': '',
})
onLoad((options) => {
  const { id } = options as { id: string }
  currentId.value = id || currentPatientUserId.value
})

onShow(() => {
  getDetailCard(currentId.value).then((res: any) => {
    contentInfo['姓名:'] = res.realName
    contentInfo['性别:'] = res.genderLabel
    contentInfo['身份证号码:'] = res.idCard
    contentInfo['手机号码:'] = res.phone
    contentInfo['关系:'] = res.relationLabel
    currentList.value = res.list
  })
})
const signList = computed(() => currentList.value)

definePage({
  style: {
    navigationBarTitleText: '查看签约信息',
  },
})

// 处理添加家庭成员点击事件
function handleSignContract() {
  console.log('立即签约')
}
</script>

<template>
  <!-- 根容器，使用flex布局撑满屏幕 -->
  <view class="box-border min-h-screen flex flex-col bg-[#EFF4FA] pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] text-xl">
    <!-- 顶部胶囊区域占位 -->
    <!-- <view :style="{ height: topBarHeight + 'px' }" class="w-full bg-[#9F8F47FF]"></view> -->
    <view class="box-border w-full flex flex-1 flex-col pl-[38rpx] pr-[32rpx] pt-[36rpx]">
      <CardInfo :type="1" title="个人信息">
        <template #content>
          <userInfoMessage :content-info="contentInfo" />
        </template>
      </CardInfo>
      <CardInfo :type="2" title="签约信息">
        <template #content>
          <view v-if="currentList.length === 0" class="mb-[28rpx] pb-[114rpx] pl-[38rpx] pr-[28rpx] pt-[120rpx]">
            <Empty />
          </view>
          <view class="pb-[32rpx]">
            <view v-for="(item, index) in signList" :key="index" class="pl-[38rpx] pr-[28rpx] pt-[32rpx]">
              <SignCard :items="item" :is-show-icon="false" :show-header="false" />
            </view>
          </view>
        </template>
      </CardInfo>
    </view>
    <!-- 底部按钮区域，始终在底部 -->
    <FooterEmpty v-show="currentList.length !== 0" text="暂无更多数据" />
    <FooterButton text="立即签约" @click="handleSignContract" />
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
