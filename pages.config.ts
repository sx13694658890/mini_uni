import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^u--(.*)': 'uview-plus/components/u-$1/u-$1.vue',
      '^up-(.*)': 'uview-plus/components/u-$1/u-$1.vue',
      '^u-([^-].*)': 'uview-plus/components/u-$1/u-$1.vue',
    },
  },
  globalStyle: {
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '标题',
    backgroundColor: '#F5F8FA',
  },
  tabBar: {
    color: '#60687e',
    selectedColor: '#2855B3',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'static/images/tab/home.png',
        selectedIconPath: 'static/images/tab/home-select.png',
      },
      {
        pagePath: 'pages/recommend/index',
        text: '家医推荐',
        iconPath: 'static/images/tab/doctor.png',
        selectedIconPath: 'static/images/tab/doctor-select.png',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'static/images/tab/mine.png',
        selectedIconPath: 'static/images/tab/mine-select.png',
      },
    ],
  },
})
