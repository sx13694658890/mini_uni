<script setup lang="ts">
import { computed, ref } from 'vue'
import SignCard from '~/components/biz/sign-card/index.vue'
import DButton from '~/components/d-button/index.vue'
import DCard from '~/components/d-card/index.vue'
import DCustomBar from '~/components/d-custom-bar/d-custom-bar.vue'
import DMenuGrid from '~/components/d-menu-grid/index.vue'
import DRelationTag from '~/components/d-relation-tag/index.vue'
import ModelPicker from '~/components/model-picker/index.vue'

import { usePage } from '~/hooks'
import { useServicePage } from '~/hooks/useServicePage'
import { useUserStore } from '~/store'
import { maskSurname } from '~/utils'
import DLoginButton from './components/d-login-button/index.vue'
import { useUserList } from './useUserList'

const { list, handleConfirmUser, familyModalShow, handleOpenFamilyModal } = useUserList()

const { goToRealName, goToSignUp, goLogin } = useServicePage()
const { menuServiceList, serviceClick } = usePage()
const { isLogin, isRealName, currentSignPatientUser, currentPatientUser, currentSign, currentPatientUserId } = useUserStore()

// 控制导航栏显示的滚动状态
const isScrolled = ref(false)

console.log('currentSignPatientUser', currentSignPatientUser.value)
const signInfoItems = computed(() => {
  return currentSignPatientUser.value?.signInfo.list || {}
})

definePage({
  style: {
    navigationBarTitleText: '',
    navigationStyle: 'custom',
  },
})
</script>

<template>
  <view class="min-h-screen w-full bg-bg-page">
    <DCustomBar
      v-if="isScrolled"
      :fixed="true"
      background-color="#ffffff"
      :capsule-left="false"
      :capsule-right="false"
    >
      <view class="nav-title">
        家庭医生服务平台
      </view>
    </DCustomBar>

    <!-- 顶部欢迎区域 -->
    <view class="relative w-full overflow-hidden">
      <image
        class="h-[300px] w-full"
        src="/static/images/home/home-top-bg.png"
        mode="widthFix"
      />
      <!-- 中间签约信息区域 -->
      <view class="relative z-10 mt-[-145px] px-5">
        <DCard padding-y="0" padding-x="0">
          <view v-if="!isLogin" class="relative flex px-5 py-4">
            <view class="flex-row-center cursor-pointer text-lg text-primary line-height-2.5" @click="goLogin">
              当前未登录，请先登录 <text class="i-icon-park-outline:right h-[18px] w-[18px] text-primary" />
            </view>
            <DLoginButton v-if="!isRealName" label="去实名" @click="goToRealName" />
          </view>
          <view v-if="isLogin" class="relative flex px-5 py-4">
            <ModelPicker v-model:show="familyModalShow" has-bar title="请选择家庭成员" :value="currentPatientUserId" :list="list" inline @confirm="handleConfirmUser">
              <template #item="{ item }">
                <view>
                  <text>{{ maskSurname(item.realName) }}</text>
                  <DRelationTag :value="item.relation" class="ml-2" />
                </view>
              </template>
            </ModelPicker>
            <view class="font-sm h-full flex-row-center">
              <text class="mr-1 max-w-20 truncate text-[36rpx] text-text-main">
                {{ currentPatientUser?.name }}
              </text>
              <DRelationTag v-if="isRealName" :value="`${currentPatientUser?.relation}`" class="ml-2 mr-2" />
              <view v-if="isRealName">
                <text class="i-custom:switch ml-1 h-4 w-4 text-blue" @click="handleOpenFamilyModal" />
              </view>
            </view>
            <!-- 当前登录人 是否实名 -->
            <DLoginButton v-if="!isRealName" label="去实名" @click="goToRealName" />
            <DLoginButton
              v-else
              label="查看签约信息"
              @click="goToSignUp('detail')"
            />
          </view>
          <view class="box-border w-full flex-col-center py-5">
            <view v-if="currentSign" class="mx-5">
              <SignCard :items="signInfoItems" :is-show-icon="true" :show-header="false" />
            </view>
            <view v-else class="font-sm box-border w-full flex-col-center text-text-main">
              <image class="h-30 w-45" src="/static/images/common/nodata.png" mode="widthFix" />
              <text class="mt-3 text-[28rpx] text-[#999999]">
                未查询到近期的签约信息
              </text>
              <DButton text="立即签约" class="mt-7 w-full" @click="goToSignUp('create')" />
            </view>
          </view>
        </DCard>
      </view>
    </view>

    <view class="mx-5">
      <DCard :bordered="false" title="家医服务" class="service-card mx-20">
        <DMenuGrid :list="menuServiceList" @click="serviceClick" />
      </DCard>
    </view>
  </view>
</template>
