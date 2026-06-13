export const defaultLocale = 'uk' as const
export const locales = ['uk', 'en'] as const
export type Locale = (typeof locales)[number]

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale)

export const getCurrentLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return defaultLocale
  }

  const segment = window.location.pathname.split('/')[1]
  return segment && isLocale(segment) ? segment : defaultLocale
}
