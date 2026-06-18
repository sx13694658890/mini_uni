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
        custom: FileSystemIconLoader('./svgs'),
      },
    }),
  ],
  theme: {
    colors: {
      'primary': 'var(--of-primary)',
      'secondary': 'var(--of-secondary)',
      'secondary-container': 'var(--of-secondary-container)',
      'primary-container': 'var(--of-primary-container)',
      'surface': 'var(--of-surface)',
      'surface-lowest': 'var(--of-surface-container-lowest)',
      'surface-container': 'var(--of-surface-container)',
      'surface-low': 'var(--of-surface-container-low)',
      'surface-high': 'var(--of-surface-container-high)',
      'on-surface': 'var(--of-on-surface)',
      'on-surface-variant': 'var(--of-on-surface-variant)',
      'outline': 'var(--of-outline)',
      'outline-variant': 'var(--of-outline-variant)',
      'text-main': 'var(--theme-main-color)',
      'text-content': 'var(--theme-content-color)',
      'text-tips': 'var(--theme-tips-color)',
      'bg-page': 'var(--theme-bg-page-color)',
    },
  },
  transformers: [
    transformerVariantGroup(),
    transformerAttributify() as any,
    transformerClass(),
  ],
})
