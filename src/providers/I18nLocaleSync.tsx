'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { defaultLocale, isLocale } from '@/i18n/settings'

export default function I18nLocaleSync() {
  const pathname = usePathname()
  const { i18n } = useTranslation()

  const segment = pathname.split('/')[1]
  const locale = isLocale(segment) ? segment : defaultLocale

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return null
}
