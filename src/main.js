import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/config/rules.js'
import '@/config/messages.js'
import i18n from '@/i18n/index.js'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
