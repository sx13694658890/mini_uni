<script setup lang="ts">
import type { IADDFamily } from '~/api/modules/mine/mine.type'
import { computed, reactive, ref } from 'vue'
import { getInfoByCard } from '~/api'
import { fetchFamilyAdd, fetchSendCode } from '~/api/modules/mine/index'
import { useDictData } from '~/components/dict-data/useDictData'
import ModelPicker from '~/components/model-picker/index.vue'
import { cardid, isvalidatemobile, validatename } from '~/utils/common'
import FooterButton from '../components/footer_button.vue'

definePage({
  style: {
    navigationBarTitleText: '添加家庭成员',
  },
})
interface IAddFamilyExtend {
  connect: string
  sex: string
}
type IADD = IADDFamily & IAddFamilyExtend
const userform = ref<any>(null)
const uSelectRef = ref<any>(null)
const userInfo = reactive<IADD>({
  realName: '',
  idCard: '',
  gender: '',
  relation: 0,
  phone: '',
  code: '',
  connect: '',
  sex: '',
})

const rules = reactive({
  realName: [{
    type: 'string',
    required: true,
    message: '请输入姓名',
    trigger: ['blur', 'change'],
    validator: (rule: any, value: string, callback: any) => {
      if (validatename(value))
        return callback()
      else return false
    },
  }],
  phone: [{
    type: 'string',
    required: true,
    message: '请输入手机号码',
    trigger: ['blur', 'change'],
  },
  // 手机号码格式校验
  {
    required: true,
    message: '请输入正确手机号码',
    trigger: ['blur', 'change'],
    validator: (rule: any, value: string, callback: any) => {
      const [result, msg] = isvalidatemobile(value)
      if (!result)
        return callback() // 验证通过
      else return callback(msg) // 验证失败，返回错误信息
    },
  }],
  idCard: [{
    type: 'string',
    required: true,
    trigger: ['blur', 'change'],
    validator: (rule: any, value: string, callback: any) => {
      const [result, msg] = cardid(value)
      onCardIdChange(value)
      if (!result) {
        return callback()
      }
      else {
        return callback(msg) // 验证失败，返回错误信息
      }
    },
  }],
  sex: [{
    type: 'string',
    required: true,
    message: '请输入身份证号码',
    trigger: ['blur', 'change'],
  }],
  connect: [{
    type: 'string',
    required: true,
    message: '请选择与本人关系',
    trigger: ['blur', 'change'],
  }],
  code: [{
    type: 'string',
    required: true,
    message: '请输入验证码',
    trigger: ['blur', 'change'],
  }],
})
const { dictData: relationDict } = useDictData('family_member_relation')
const { dictData: sexDict } = useDictData('sys_user_sex')

const listAbout = computed(() => {
  return relationDict.value.filter(item => `${item.dictKey}` !== '0').map((item: { dictKey: string, dictValue: string }) => {
    return {
      id: `${item.dictKey}-${item.dictValue}`,
      name: item.dictValue,
    }
  })
})

async function handleSelectUserName() {
  if (cardid(userInfo.idCard)) {
    const res = await getInfoByCard(userInfo.idCard!)
    if (res) {
      res.realName && (userInfo.realName = res.realName)
      res.phone && (userInfo.phone = res.phone)
    }
  }
}

const sexList = computed(() => {
  return sexDict.value.map((item: { dictKey: string, dictValue: string }) => {
    return {
      id: item.dictKey,
      name: item.dictValue,
    }
  })
})
const uCodeRef = ref<any>(null)
const tips = ref<any>('获取验证码')
const timeStart = ref(60)
const isStart = ref(false)
function codeChange(val: number) {
  // 确保val是数字类型，处理倒计时数值
  if (isStart.value) {
    timeStart.value -= 1
    if (timeStart.value <= 0) {
      tips.value = val
      timeStart.value = 60
    }
    else {
      tips.value = `${timeStart.value}秒重新获取`
    }
    console.log('倒计时更新:', timeStart.value)
  }
}
function handlerconfirmValue(val: string) {
  userInfo.connect = val.split('-')[1]
  userInfo.relation = Number.parseInt(val.split('-')[0])
  userform.value.validateField('connect')
}
function getCode() {
  // 直接调用组件的start方法开始倒计时
  if (!userInfo.phone) {
    uni.showToast({
      title: '请输入手机号码',
      icon: 'none',
    })
    return
  }
  const [result] = isvalidatemobile(userInfo.phone)
  if (result) {
    uni.showToast({
      title: '请输入正确手机号',
      icon: 'none',
    })
    return
  }
  // 移除setTimeout，避免延迟导致的问题
  if (uCodeRef.value && uCodeRef.value.canGetCode) {
    isStart.value = true
    uCodeRef.value.start()
    if (userInfo.phone) {
      fetchSendCode(userInfo.phone).then((res: any) => {
        console.log('res----', res)
      })
    }
  }
}
function handlerToRulesNotice() {
  return uni.navigateTo({
    url: '/pages-sub/submine/homedoctor/rulesNotice',
  })
}
// 添加身份证号码变化监听函数
function onCardIdChange(value: string) {
  // 当身份证号码长度足够且校验通过时，尝试识别性别
  if (value.length === 18) {
    const [result] = cardid(value)
    if (!result) {
      // 身份证第17位表示性别，奇数为男，偶数为女
      // 正确使用substring(startIndex, endIndex)方法获取第17位字符
      const genderCode = Number.parseInt(value.substring(16, 17))
      userInfo.sex = genderCode % 2 === 1 ? '男' : '女'
      userInfo.gender = sexList.value.find((item: { name: string }) => item.name === userInfo.sex)?.id || ''
      userform.value.validateField('sex')
      console.log('识别到性别:', userInfo.gender)
    }
  }
  else {
    userInfo.gender = ''
  }
}
// 在handleSubmit中确保性别已正确识别
async function handleSubmit() {
  const result = await userform.value.validate()
  if (result) {
    const payload = {
      ...userInfo,

    }
    // 验证通过，提交表单
    console.log('提交表单:-------', payload)
    fetchFamilyAdd(userInfo).then((res: any) => {
      console.log('res----', res)

      uni.navigateBack({
        delta: 1,
      })
    })
  }
}
function handlerSelect() {
  uSelectRef.value.show()
}
</script>

<template>
  <view
    class="box-border min-h-screen flex flex-col bg-[#FFFFFF] pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
  >
    <!-- 顶部胶囊区域占位 -->
    <view :style="{ height: '28rpx' }" class="w-full bg-[#EFF4FA]" />

    <!-- 内容区域，占据剩余空间 -->
    <view class="box-border w-full flex flex-1 flex-col bg-[#FFFFFF] pl-[50rpx] pr-[32rpx] pt-[20rpx]">
      <view class="form-usr-phone">
        <u-form
          ref="userform" :label-style="{ marginLeft: '10rpx' }" label-width="110" label-position="left"
          :model="userInfo" :rules="rules"
        >
          <u-form-item border-bottom label="姓名" prop="realName" required>
            <u-input v-model="userInfo.realName" cursor-color="#333333" border="none" placeholder="请输入姓名" />
          </u-form-item>

          <u-form-item border-bottom label="身份证号码" prop="idCard" required>
            <u-input v-model="userInfo.idCard" type="idcard" cursor-color="#333333" border="none" placeholder="请输入身份证号码" @blur="handleSelectUserName" />
          </u-form-item>

          <u-form-item class="" border-bottom label="性别" prop="sex" required>
            <view v-if="userInfo.sex" class="py-[7.8rpx] text-[#333333]">
              {{ userInfo.sex }}
            </view>
            <view v-else class="py-[7.8rpx] text-[#c0c4cc]">
              由身份证号码识别
            </view>
          </u-form-item>
          <u-form-item border-bottom label="关系" prop="connect" required>
            <view class="w-full flex items-center justify-end" @click="handlerSelect">
              <u-input v-model="userInfo.connect" disabled border="none" placeholder="请选择与本人关系">
                <template #suffix>
                  <ModelPicker
                    ref="uSelectRef"
                    v-model:value="userInfo.connect"
                    title="请选择与本人关系"
                    :list="listAbout"
                    @confirm="handlerconfirmValue"
                  />
                <!-- <view @click="handlerSelect">
                  <text class="i-custom:mr mr-2 h-5 w-5 text-white" />
                </view> -->
                </template>
              </u-input>
            </view>
          </u-form-item>
          <u-form-item border-bottom label="手机号码" prop="phone" required>
            <u-input v-model="userInfo.phone" cursor-color="#333333" border="none" placeholder="请输入手机号码" type="number" />
          </u-form-item>
          <u-form-item border-bottom label="验证码" prop="code" required class="code-item">
            <u-input v-model="userInfo.code" cursor-color="#333333" border="none" placeholder="请输入验证码" type="number" />
            <view class="w-[212rpx] flex items-center justify-center border-[1rpx] border-[#2855B3] rounded-[60rpx] border-solid bg-[#EDF3FF] py-[11rpx]" @click="getCode">
              <!-- 修改u-code组件配置，移除动态绑定的change-text -->
              <u-code ref="uCodeRef" :seconds="timeStart" change-text="秒重新获取" @change="codeChange" />
              <text>{{ tips }}</text>
            </view>
          </u-form-item>
        </u-form>
      </view>
      <view class="mb-[28rpx] ml-[-14rpx] mt-[32rpx] flex-1 rounded-lg bg-[#EDF3FF] p-4 pb-[20rpx] pr-[16rpx]">
        <view class="pb-[18rpx]">
          <text class="text-[#2855B3] text-[28] font-[500]">
            *温馨提示
          </text>
        </view>
        <view>
          <text class="text-[24rpx] text-text-content line-height-[44rpx] font-[400]">
            1、请补充家庭成员信息，包括姓名、身份证号、手机号码、与本人关系。我们将通过家庭成员的 实名信息关联查询签约信息，以便为成员提供更好的线上服务；\n 2、为了保证家庭成员信息的真实性及隐私保护情况，需要被添加的家庭成员进行人脸识别二次验证； \n3、为了更好的提供服务，可添加儿童（未成年人）身份信息，添加儿童时支持使用家长手机号码验证。
          </text>
        </view>
      </view>
    </view>
    <FooterButton background-color="#FFFFFF" text="确定" @click="handleSubmit">
      <view class="flex items-center justify-center pt-2" @click="handlerToRulesNotice">
        <text class="i-custom:mdouble mr-2 h-5 w-5 text-white" />
        <text class="text-[24rpx] text-text-main font-[400]">
          家庭成员添加规则须知
        </text>
      </view>
    </FooterButton>
    <!-- 底部按钮区域，始终在底部 -->
  </view>
</template>

<style lang="scss" scoped>
:deep(.u-input.disabled){
 background: none !important;
}
:deep(.u-input__content) {
  // padding: 0 !important;
  padding-top: 2px !important;//  解决手机端 输入框右侧插槽上边线遮挡问题

}
:deep(.code-item .u-form-item__body){
  padding: 16rpx 0 !important;

}
</style>
