<script setup lang="ts">
import type { IADDFamily } from '~/api/modules/mine/mine.type'
import { onShow } from '@dcloudio/uni-app'
import { computed, reactive, ref } from 'vue'
import { fetchRealNameAuthentication } from '~/api/modules/mine/index'
import { useDictData } from '~/components/dict-data/useDictData'
import { useUserStore } from '~/store'
import { cardid, validatename } from '~/utils/common'
import FooterButton from '../components/footer_button.vue'

definePage({
  style: {
    navigationBarTitleText: '实名认证',
  },
})
const { loginUser, initPage } = useUserStore()

interface IAddFamilyExtend {
  connect?: string
  sex?: string
}
type IADD = IADDFamily & IAddFamilyExtend
const userform = ref<any>(null)
const userInfo = reactive<IADD>({
  realName: '',
  idCard: '',
  gender: '',
  relation: 0,
  phone: '',
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
    message: '请选择关系',
    trigger: ['blur', 'change'],
  }],
})
const { dictData: sexDict } = useDictData('sys_user_sex')
onShow(() => {
  userInfo.connect = '本人'
  if (loginUser.value && loginUser.value!.phone) {
    userInfo.phone = loginUser.value!.phone
  }
})

const sexList = computed(() => {
  return sexDict.value.map((item: { dictKey: string, dictValue: string }) => {
    return {
      id: item.dictKey,
      name: item.dictValue,
    }
  })
})

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
    fetchRealNameAuthentication(payload).then(() => {
      uni.showToast({
        title: '认证成功',
        icon: 'success',
      })
      initPage()
      uni.navigateBack({
        delta: 1,
      })
    })
  }
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
            <u-input v-model="userInfo.idCard" cursor-color="#333333" type="idcard" border="none" placeholder="请输入身份证号码" />
          </u-form-item>

          <u-form-item border-bottom label="性别" prop="sex" required>
            <view v-if="userInfo.sex" class="py-[7.2rpx] text-[#333333]">
              {{ userInfo.sex }}
            </view>
            <view v-else class="py-[7rpx] text-[#c0c4cc]">
              由身份证号码识别
            </view>
          </u-form-item>
          <u-form-item border-bottom label="关系" prop="connect" required>
            <!-- <view class="w-full">
              <u-input disabled border="none" placeholder-style="color: '#c0c4cc'" :placeholder="userInfo.connect" />
            </view> -->
            <view class="w-full bg-[#CCCCCC32] py-[7.6rpx]">
              <text class="text-[#c0c4cc]">
                {{ userInfo.connect }}
              </text>
            </view>
          </u-form-item>
          <u-form-item border-bottom label="手机号码" prop="phone" required>
            <view v-if="userInfo.phone" class="w-full bg-[#CCCCCC32] py-[7.6rpx]">
              <text class="text-[#c0c4cc]">
                {{ userInfo.phone }}
              </text>
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
          <text class="text-[24rpx] text-text-content leading-[44rpx] font-[400]">
            请补充当前账户下的用户信息，包括姓名、身份证号。我们将通过您的实名信息关联查询您的签约信息，以便为您提供更好的线上服务。
          </text>
        </view>
      </view>
    </view>
    <FooterButton background-color="#FFFFFF" text="确定" @click="handleSubmit" />
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
</style>
