import { defineConfig, presetIcons, transformerVariantGroup } from 'unocss'
import { presetWeapp } from 'unocss-preset-weapp'

import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts}',
      ],
    },
  },
  shortcuts: {
    'flex-col-center': 'flex flex-col items-center justify-center',
    'flex-row-center': 'flex flex-row items-center justify-center',
  },
  presets: [
    presetWeapp({
      designWidth: 375,
      whRpx: false,
    }),
    presetWeappAttributify() as any,
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      scale: 24,
      unit: 'rpx',
      collections: {
        custom: FileSystemIconLoader(
          './svgs',
        ),
      },
    }),
  ],
  theme: {
    colors: {
      'primary': 'var(--theme-primary)',
      'success': 'var(--theme-success)',
      'warning': 'var(--theme-warning)',
      'error': 'var(--theme-error)',
      'text-main': 'var(--theme-main-color)',
      'text-content': 'var(--theme-content-color)',
      'text-tips': 'var(--theme-tips-color)',
      'text-light': 'var(--theme-light-color)',
      'text-disabled': 'var(--theme-disabled-color)',
      'bg-main': 'var(--theme-bg-color)',
      'bg-secondary': 'var(--theme-bg-color-secondary)',
      'bg-page': 'var(--theme-bg-page-color)',
      'border-main': 'var(--theme-border-color)',
    },
  },
  transformers: [
    transformerVariantGroup(),
    transformerAttributify() as any,
    transformerClass(),
  ],
})
