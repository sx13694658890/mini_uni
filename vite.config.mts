import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import uniPlugin from '@dcloudio/vite-plugin-uni'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import consola from 'consola'
// @ts-expect-error error types
import pxtovw from 'postcss-px-to-viewport'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import UniPolyfill from 'vite-plugin-uni-polyfill'
import { getSubDirs } from './scripts'

// https://vitejs.dev/config/
export default async ({ mode }: any) => {
  const subDirs = await getSubDirs('src/pages-sub')
  const { UNI_PLATFORM } = process.env

  const env = loadEnv(mode, fileURLToPath(new URL('./env', import.meta.url)))

  consola.box('env -> ', UNI_PLATFORM)
  Object.entries(env).forEach(([key, value]) => {
    consola.box(`env: ${key} -> `, value)
  })

  return defineConfig({
    envDir: './env',
    resolve: {
      alias: [
        {
          find: '~',
          replacement: resolve(__dirname, 'src'),
        },
        {
          find: '~~',
          replacement: __dirname,
        },
      ],
    },
    plugins: [
      UnoCSS(),
      UniHelperLayouts(),
      UniPages({
        homePage: 'pages/home/index',
        subPackages: subDirs,
        exclude: [
          '**/components/**/*.vue',
          '**/components/*.vue',
        ],
      }),
      UniManifest(),
      UniPolyfill(),
      (uniPlugin as any).default(),
    ],
    css: {
      postcss: {
        plugins: [
          pxtovw({
            unitToConvert: 'px',
            viewportWidth: 375,
            unitPrecision: 5,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: undefined,
            include: undefined,
            landscape: false,
            landscapeUnit: 'vw',
            landscapeWidth: 568,
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          // 取消sass废弃API的报警
          silenceDeprecations: ['legacy-js-api', 'color-functions', 'import'],
        },
      },
    },
  })
}
