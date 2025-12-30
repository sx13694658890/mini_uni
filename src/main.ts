import uviewPlus, { setConfig } from 'uview-plus'
import { createSSRApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App)

  app.use(uviewPlus)
  setConfig({
    config: {
      unit: 'px',
    },
  })
  return {
    app,
  }
}
