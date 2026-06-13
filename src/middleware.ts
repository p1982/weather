import { NextResponse } from 'next/server'

import { defaultLocale, locales } from '@/i18n/settings'

import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/', '/((?!api|_next|favicon.ico|.*\\..*).*)'],
}
