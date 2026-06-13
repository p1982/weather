'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en/common.json'
import uk from './locales/uk/common.json'
import { defaultLocale } from './settings'

const resources = {
  uk: { common: uk },
  en: { common: en },
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  })
}

export default i18n
