<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { getRecommendUser } from '~/api'
import SignCard from '~/components/biz/sign-card/index.vue'
import DButton from '~/components/d-button/index.vue'
import DCard from '~/components/d-card/index.vue'
import DCustomBar from '~/components/d-custom-bar/d-custom-bar.vue'
import { useServicePage } from '~/hooks'
import { useUserStore } from '~/store'

const { goToSignUp } = useServicePage()
const { currentSign } = useUserStore()
const currentId = ref('')
definePage({
  style: {
    navigationBarTitleText: '医生详情',
    navigationStyle: 'custom',
  },
})

interface Doctor {
  tenantName: string
  areaValueLabel: string
  doctorName: string
  deptValueLabel: string
  doctorsProfile: string
  outpatientTime: string
}
const labelMap: Record<keyof Doctor, string> = {
  doctorName: '家医姓名',
  areaValueLabel: '所属区域',
  tenantName: '所属机构',
  deptValueLabel: '所属部门',
  doctorsProfile: '医生简介',
  outpatientTime: '门诊时间',
}
const order: Array<keyof Doctor> = ['doctorName', 'areaValueLabel', 'tenantName', 'deptValueLabel', 'doctorsProfile', 'outpatientTime']
const doctor = ref<Doctor>({
  doctorName: '',
  areaValueLabel: '',
  tenantName: '',
  deptValueLabel: '',
  doctorsProfile: '',
  outpatientTime: '',
})
const doctorItems = computed(() =>
  order.map(key => ({
    label: labelMap[key],
    value: doctor.value[key],
  })),
)

// const doctorCode = ref('https://public.rehabilitation-qiniu-file.dph.cn//miniprogram/wxcode/qiwei-code_new.png')
const doctorCode = ref('')

onLoad((options) => {
  const { id } = options as { id: string }
  currentId.value = id
  console.log('currentId==', id)
})

onShow(() => {
  getRecommendUser(currentId.value).then((res: any) => {
    console.log('getRecommendUser==', res)
    doctor.value = res
    doctorCode.value = res.qrCodeUrl || doctorCode.value
  })
})

function handleBack() {
  console.log('返回')
  uni.navigateBack()
}
</script>

<template>
  <view class="doctor-detail-wrapper relative min-h-screen w-full">
    <image src="/static/images/doctor/doctor-detaill-bg.webp" class="absolute left-0 top-0 h-[200rpx] w-full" mode="widthFix" />
    <DCustomBar
      title="家庭医生详情"
      :fixed="true"
      background-color="transparent"
      :single-icon="true"
      :stop-dui-go-back="true"
      @click-back="handleBack"
    />
    <!-- 顶部占位 -->
    <view class="w-full pt-[100rpx]" />

    <!-- 医生信息卡片 -->
    <view class="content-pd relative mx-[34rpx] mb-[100rpx] mb-[100rpx]">
      <view class="doctor-header z-20 h-[132rpx] flex items-center">
        <text class="text-doctor-name ml-[56rpx] mt-[-22rpx] text-[40rpx] text-white font-700">
          家庭医生
        </text>
        <image
          class="doctor-image absolute right-0 top-[-110rpx] z-[10] h-[222rpx] w-[150rpx]"
          src="/static/images/doctor/doctor.png"
          mode="widthFix"
        />
      </view>
      <view class="z-0 mt-[-36rpx]">
        <DCard padding-y="0" padding-x="0">
          <SignCard :items="doctorItems" :is-show-icon="true" :show-header="false" bg-color="#ffffff" />
        </DCard>
        <view class="relative mt-[28rpx]">
          <DCard padding-y="0" padding-x="0" class="mt-[124rpx]">
            <image src="/static/images/doctor/code-left.png" class="absolute bottom-0 left-0 h-[102rpx] w-[112rpx]" mode="aspectFit" />
            <image src="/static/images/doctor/code-right.png" class="absolute bottom-0 right-0 h-[152rpx] w-[150rpx]" mode="aspectFit" />

            <view class="mb-[20rpx] mt-[40rpx] flex items-center justify-center">
              <text class="text-main-content">
                长按下方二维码,添加家医为好友
              </text>
            </view>
            <view class="qr-wrap mx-auto my-[54rpx] h-[340rpx] w-[342rpx] flex items-center justify-center border rounded-[16rpx] bg-[#EDF3FF]">
              <image
                class="h-[306rpx] w-[306rpx]" :src="doctorCode" :show-menu-by-longpress="true"
                mode="widthFix"
              />
            </view>
          </DCard>
        </view>
      </view>
    </view>
    <!-- 底部安全区占位 -->
    <view class="p-safe-bottom fixed bottom-0 left-0 right-0 z-10 border-t border-gray-200 p-4">
      <DButton v-if="!currentSign" text="立即签约" class="mt-7 w-full" @click="goToSignUp('create')" />
      <DButton v-else text="查看签约信息" class="mt-7 w-full" @click="goToSignUp('detail')" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.p-safe-bottom {
  padding-bottom: calc(env(safe-area-inset-bottom) + 40rpx);
}

.content-pd{
  padding-bottom: calc(env(safe-area-inset-bottom) + 180rpx);
}
.doctor-detail-wrapper {
  background: linear-gradient( 91deg, #E6F4FE 0%, #BCD8F9 100%);
}
.doctor-header {
  background-image: url('@/static/images/doctor/doctor-title-bg.png');
  background-size: cover;
  background-position: left top;
  width: 100%;
}

.text-doctor-name {
  font-family: Alimama ShuHeiTi, Alimama ShuHeiTi;
}
</style>
