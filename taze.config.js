import { defineConfig } from 'taze'

export default defineConfig({
  // ignore packages from bumping
  exclude: [
    '@dcloudio/uni-app',
    '@dcloudio/uni-app-harmony',
    '@dcloudio/uni-app-plus',
    '@dcloudio/uni-components',
    '@dcloudio/uni-h5',
    '@dcloudio/uni-mp-alipay',
    '@dcloudio/uni-mp-baidu',
    '@dcloudio/uni-mp-harmony',
    '@dcloudio/uni-mp-jd',
    '@dcloudio/uni-mp-kuaishou',
    '@dcloudio/uni-mp-lark',
    '@dcloudio/uni-mp-qq',
    '@dcloudio/uni-mp-toutiao',
    '@dcloudio/uni-mp-weixin',
    '@dcloudio/uni-mp-xhs',
    '@dcloudio/uni-quickapp-webview',
    '@dcloudio/types',
    '@dcloudio/uni-automator',
    '@dcloudio/uni-cli-shared',
    '@dcloudio/uni-stacktracey',
    '@dcloudio/vite-plugin-uni',
  ],
  ignorePaths: [
    '**/node_modules/**',
    '**/test/**',
  ],
  ignoreOtherWorkspaces: true,
  packageMode: {
  },
  depFields: {
    overrides: false,
  },
})
