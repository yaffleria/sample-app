import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import ko from './locales/ko.json'

const userLocale = navigator.language.startsWith('ko') ? 'ko' : 'en'

const i18n = createI18n({
  legacy: false,
  locale: userLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    ko,
  },
})

export default i18n
