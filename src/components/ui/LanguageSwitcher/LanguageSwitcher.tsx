'use client'

import { ToggleButtonGroup } from '@mui/material'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { isLocale, locales, type Locale } from '@/i18n/settings'

import { StyledToggleButton } from './styled'

const localeFlags: Record<Locale, string> = {
  uk: '🇺🇦',
  en: '🇬🇧',
}

const LanguageSwitcher = () => {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()

  const currentLocale =
    typeof params.locale === 'string' && isLocale(params.locale) ? params.locale : 'uk'

  const handleChange = (_: React.MouseEvent<HTMLElement>, nextLocale: Locale | null) => {
    if (!nextLocale || nextLocale === currentLocale) {
      return
    }

    const segments = pathname.split('/')
    segments[1] = nextLocale
    router.push(segments.join('/') || `/${nextLocale}`)
  }

  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      value={currentLocale}
      onChange={handleChange}
      aria-label="language switcher"
    >
      {locales.map((locale) => (
        <StyledToggleButton key={locale} value={locale} aria-label={t(`language.${locale}`)}>
          {localeFlags[locale]}
        </StyledToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

export default LanguageSwitcher
