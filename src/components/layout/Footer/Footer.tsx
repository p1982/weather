'use client'

import { useTranslation } from 'react-i18next'

import PageContainer from '../PageContainer/PageContainer'

import { StyledFooterInner, StyledFooterShell } from './styled'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <StyledFooterShell>
      <PageContainer>
        <StyledFooterInner>
          {t('footer.title')} &copy; {new Date().getFullYear()} {t('footer.text')}
        </StyledFooterInner>
      </PageContainer>
    </StyledFooterShell>
  )
}

export default Footer
