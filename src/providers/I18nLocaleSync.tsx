'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { isLocale } from '@/i18n/settings'

export default function I18nLocaleSync() {
  const params = useParams()
  const { i18n } = useTranslation()
  const locale = params.locale

  useEffect(() => {
    if (typeof locale === 'string' && isLocale(locale) && i18n.language !== locale) {
      void i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return null
}
