'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import LanguageSwitcher from '@/components/ui/LanguageSwitcher/LanguageSwitcher'
import { isLocale } from '@/i18n/settings'

import Nav from '../Nav/Nav'
import PageContainer from '../PageContainer/PageContainer'

import { StyledHeaderInner, StyledHeaderShell } from './styled'

const Header = () => {
  const { t } = useTranslation()
  const params = useParams()
  const locale = typeof params.locale === 'string' && isLocale(params.locale) ? params.locale : 'uk'

  return (
    <StyledHeaderShell>
      <PageContainer>
        <StyledHeaderInner>
          <Link href={`/${locale}`}>{t('header.title')}</Link>
          <LanguageSwitcher />
          <Nav />
        </StyledHeaderInner>
      </PageContainer>
    </StyledHeaderShell>
  )
}

export default Header
