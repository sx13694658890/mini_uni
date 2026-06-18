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
    navigationBarBackgroundColor: '#f9f9ff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '海味鲜',
    backgroundColor: '#f9f9ff',
  },
  tabBar: {
    color: '#43474f',
    selectedColor: '#001e40',
    backgroundColor: '#f9f9ff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'static/tab/home.png',
        selectedIconPath: 'static/tab/home-active.png',
      },
      {
        pagePath: 'pages/category/index',
        text: '分类',
        iconPath: 'static/tab/category.png',
        selectedIconPath: 'static/tab/category-active.png',
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: 'static/tab/cart.png',
        selectedIconPath: 'static/tab/cart-active.png',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'static/tab/mine.png',
        selectedIconPath: 'static/tab/mine-active.png',
      },
    ],
  },
})
