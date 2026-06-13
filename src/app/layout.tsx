import '@/styles/globals.css'

import { roboto } from '@/theme/fonts'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Актуальна погода',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" suppressHydrationWarning className={roboto.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
