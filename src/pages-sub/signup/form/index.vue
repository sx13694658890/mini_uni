<script lang="ts" setup>
import { computed, ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '家医签约',
  },
})

const formList = computed(() => ([
  { label: '签约医生姓名', prop: 'realName' },
  { label: '签约人姓名', prop: 'realName' },
  { label: '签约人身份证号', prop: 'realName' },
  { label: '签约人手机号码', prop: 'realName' },
  { label: '签约人所在地区', prop: 'realName' },
  { label: '签约人详细地址', prop: 'realName' },
]))

const userInfo = ref({
  realName: '',
  idCard: '',
  sex: '',
  connect: '',
})
const rules = ref({})
const userForm = ref()
</script>

<template>
  <view
    class="box-border min-h-screen flex flex-col bg-white pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
  >
    <view class="h-3.5 w-full bg-[#EFF4FA]" />

    <up-form ref="userForm" label-width="260rpx" label-style="padding-left: 32rpx" :rules="rules">
      <view class="flex flex-col px-4.5 pt-0.5">
        <view>
          <u-form-item v-for="item of formList" :key="item.label" :label="item.label" :prop="item.prop" required class="border-0.25 border-border-main border-b-solid py-4.5 pl-[26rpx] pr-[18rpx]">
            <text>{{ userInfo[item.prop as keyof typeof userInfo] }}</text>
          </u-form-item>
        </view>
        <view class="mb-3 mt-5 flex flex-1 flex-col rounded-lg bg-[#EDF3FF] pb-2.5 pl-3.5 pr-2 pt-3.5">
          <text class="text-base text-primary">
            *温馨提示
          </text>
          <view class="flex flex-col text-[24rpx] text-text-content leading-5 space-y-1">
            <text>1、如需变更协议或解除协议，请联系医生，持医保卡到社区卫生服务中心进行操作；</text>
            <text>2、若您提交申请，即代表您已授权医生调阅您的档案；</text>
            <text>3、若您选择签约多年服务，当前只需支付第一年的签约费用用。后续费用在每年服务期满时按照续签规则进行支付。</text>
          </view>
        </view>
        <view class="flex items-center">
          <up-checkbox
            class="mr-1"
            :size="20"
            shape="circle"
            name="agree"
          />
          <view class="flex items-center">
            <text class="text-[24rpx] text-text-content leading-5.5">
              本人已理解并同意
            </text>
            <text class="text-[24rpx] text-primary leading-5.5">
              《家庭医生签约服务协议》
            </text>
          </view>
        </view>
      </view>
    </up-form>

    <!-- <view class="box-border w-full flex flex-1 flex-col bg-[#FFFFFF] pl-[50rpx] pr-[32rpx] pt-[20rpx]">
      <view class="form-usr-phone">
        <u-form
          ref="userform" :label-style="{ marginLeft: '10rpx' }" label-width="110" label-position="left"
          :model="userInfo" :rules="rules"
        >
          <u-form-item border-bottom label="姓名" prop="realName" required>
            <u-input v-model="userInfo.realName" border="none" placeholder="请输入姓名" />
          </u-form-item>
        </u-form>
      </view>
      <view class="mb-[28rpx] ml-[-14rpx] mt-[32rpx]">
        <view class="pb-[18rpx]">
          <text class="text-[#2855B3] text-[28] font-[500]">
            *温馨提示
          </text>
        </view>
        <view>
          <text class="text-[24rpx] text-text-content line-height-[44rpx] font-[400]">
            1、如需变更协议或解除协议，请联系医生，持医保卡到社区卫生服务中心进行操作； 2、若您提交申请，即代表您已授权医生调阅您的档案； 3、若您选择签约多年服务，当前只需支付第一年的签约费用用。后续费用在每年服务期满时按照续签规则进行支付。
          </text>
        </view>
      </view>
    </view> -->
  </view>
</template>

<style lang="scss" scoped>
  :deep(.u-form-item__body) {
    padding: 0 !important;
  }
</style>
