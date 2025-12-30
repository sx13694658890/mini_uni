<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '家庭成员添加规则须知',
  },
})
</script>

<template>
  <view
    class="box-border min-h-screen flex flex-col bg-[#EFF4FA] pt-[env(safe-area-inset-top)]"
  >
    <!-- 顶部胶囊区域占位 -->
    <!-- <view :style="{ height: topBarHeight + 'px' }" class="w-full bg-[#9F8F47FF]"></view> -->

    <!-- 内容区域，占据剩余空间 -->
    <view class="mt-4 box-border w-full flex flex-1 flex-col bg-[#FFFFFF] pl-[46rpx] pr-[38rpx] pt-[40rpx]">
      <view class="text-[28rpx] text-[#333333] line-height-[44rpx]">
        <text>1、同一个账户最多可添加8个不同的家庭成员;\n</text>
        <text>2、同一个家庭成员最多可被6个不同账户添加为家庭成员；\n</text>
        <text>3、添加的儿童信息需要使用儿童本人身份证号码信息，手机号码支持使用家长手机号码验证；\n</text>
        <text>4、当前账户以当前登录手机号码及实名认证信息为准；\n</text>
        <text> 5、解绑家庭成员即表示当前账户不再允许查看该成员信息。\n</text>
      </view>
    </view>
  </view>
</template>
