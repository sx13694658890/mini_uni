<script setup lang="ts">
import { computed, ref } from 'vue'
import { updateAvatar } from '~/api'
import { useDictData } from '~/components/dict-data/useDictData'
import { useUserStore } from '~/store'
import { navigateBack } from '~/utils'
import FooterButton from '../components/footer_button.vue'

definePage({
  style: {
    navigationBarTitleText: '账号设置',
  },
})

const { loginUser, getCurrentUser } = useUserStore()
const cacheAvatar = ref('')
const allowUpload = ref<boolean>(true)
const { mapDict: sexDictData } = useDictData('sys_user_sex')

const dataDetail = computed(() => ({
  头像: cacheAvatar.value || loginUser.value?.avatar || '',
  姓名: !loginUser.value?.name ? `用户${loginUser.value?.phone.slice(-4)}` : loginUser.value?.name,
  手机号: loginUser.value?.phone,
  性别: sexDictData.value[`${loginUser.value?.gender || '2'}`],
}))
// 选择头像
function handlerSelectAvatar() {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res: any) => {
      console.log('res----', res)

      if (res.tempFiles[0].size > 1024 * 1024 * 5) {
        uni.showToast({
          title: '图片大小不能超过5MB',
          icon: 'none',
          duration: 2000,
        })
        allowUpload.value = false
        return
      }
      if (!['jpg', 'jpeg', 'png'].includes(res.tempFilePaths[0].split('.')[1])) {
        uni.showToast({
          title: '请选择jpg、jpeg、png格式的图片',
          icon: 'none',
          duration: 2000,
        })
        allowUpload.value = false
        return
      }
      allowUpload.value = true
      cacheAvatar.value = res.tempFilePaths[0]
    },
  })
}
async function handlerSubmit() {
  if (cacheAvatar.value && allowUpload.value) {
    console.log('cacheAvatar.value------', cacheAvatar.value)
    await updateAvatar(cacheAvatar.value)
    await getCurrentUser()
  }
  navigateBack()
}
</script>

<template>
  <view
    class="box-border min-h-screen flex flex-col bg-[#EFF4FA] pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
  >
    <!-- 顶部胶囊区域占位 -->
    <!-- <view :style="{ height: topBarHeight + 'px' }" class="w-full bg-[#9F8F47FF]"></view> -->
    <!-- 内容区域，占据剩余空间 -->
    <view class="mt-[16rpx] box-border w-full flex flex-1 flex-col bg-[#FFFFFF] pl-[26rpx] pr-[32rpx] pt-[26rpx]">
      <view>
        <view v-for="(value, key) in dataDetail" :key="key" class="mb-4">
          <view v-if="key === '头像'" class="mb-2 pl-[26rpx] pr-[14rpx]">
            <view class="mb-2 flex items-center justify-between">
              <text class="text-[28rpx] text-text-main font-500">
                {{ key }}
              </text>
              <view class="flex items-center" @click="handlerSelectAvatar">
                <image v-if="value" :src="value" class="h-[80rpx] w-[80rpx] rounded-full" />
                <text v-else class="i-custom:avator h-[80rpx] w-[80rpx] rounded-full" />
                <text class="i-custom:mr ml-1 h-8 w-6" />
              </view>
            </view>
          </view>
          <view v-else class="mb-4 flex items-center justify-between pl-[26rpx] pr-[18rpx]">
            <text class="text-[28rpx] text-text-main font-500">
              {{ key }}
            </text>
            <view class="flex items-center justify-between">
              <text class="text-[28rpx] text-[#999999] font-500">
                {{ value }}
              </text>
            </view>
          </view>
          <u-line v-if="key !== '性别'" :hairline="false" color="#ECECEC" />
        </view>
      </view>
    </view>
    <!-- 底部按钮区域，始终在底部 -->
    <FooterButton text="确定" @click="handlerSubmit" />
  </view>
</template>
