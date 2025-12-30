import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  json: true,
  vue: true,
  ignores: [
    'src/pages.json',
    'src/manifest.json',
    'src/env.d.ts',
    '*.nvue',
    'dist',
  ],
}, {
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
  },
})
