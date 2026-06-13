import { notFound } from 'next/navigation'

import Footer from '@/components/layout/Footer/Footer'
import Header from '@/components/layout/Header/Header'
import { isLocale, locales } from '@/i18n/settings'
import AppProviders from '@/providers/AppProviders'
import PageContainer from '@/components/layout/PageContainer/PageContainer'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return (
    <AppProviders>
      <div className="app-layout">
        <Header />
        <PageContainer>{children}</PageContainer>
        <Footer />
      </div>
    </AppProviders>
  )
}
