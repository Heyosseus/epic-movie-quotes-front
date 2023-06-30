import { createI18n } from 'vue-i18n'
import en from './lang/en/index.js'
import ka from './lang/ka/index.js'

const messages = {
  en,
  ka
}

const i18n = createI18n({
  locale: 'ka',
  fallbackLocale: 'en',
  messages
})

export default i18n
