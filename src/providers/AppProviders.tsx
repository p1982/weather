'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { I18nextProvider } from 'react-i18next'

import i18n from '@/i18n/client'
import I18nLocaleSync from '@/providers/I18nLocaleSync'
import WeatherLocaleSync from '@/providers/WeatherLocaleSync'
import theme from '@/theme/theme'

interface AppProvidersProps {
  children: React.ReactNode
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <I18nextProvider i18n={i18n}>
          <I18nLocaleSync />
          <WeatherLocaleSync />
          {children}
        </I18nextProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
