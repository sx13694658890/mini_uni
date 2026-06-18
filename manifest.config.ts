import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  'name': 'uni-app-template',
  'appid': 'wx37a9232519fa4cab',
  'description': 'uni-app 基础框架模板',
  'versionName': '1.0.0',
  'versionCode': '100',
  'transformPx': false,
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    modules: {},
    distribute: {
      android: {
        permissions: [],
      },
      ios: {},
      sdkConfigs: {},
      icons: {
        android: {},
        ios: {},
      },
    },
  },
  'quickapp': {},
  'mp-weixin': {
    appid: '',
    setting: {
      urlCheck: false,
    },
    lazyCodeLoading: 'requiredComponents',
    mergeVirtualHostAttributes: true,
    usingComponents: true,
  },
  'mp-alipay': {
    usingComponents: true,
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  'uniStatistics': {
    enable: false,
  },
  'vueVersion': '3',
})
