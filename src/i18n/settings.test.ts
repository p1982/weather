import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { defaultLocale, getCurrentLocale, isLocale, locales } from '@/i18n/settings'

describe('i18n settings', () => {
  const originalPathname = window.location.pathname

  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  afterEach(() => {
    window.history.pushState({}, '', originalPathname)
  })

  it('exposes supported locales', () => {
    expect(locales).toEqual(['uk', 'en'])
    expect(defaultLocale).toBe('uk')
  })

  it('validates locale values', () => {
    expect(isLocale('uk')).toBe(true)
    expect(isLocale('en')).toBe(true)
    expect(isLocale('fr')).toBe(false)
  })

  it('reads locale from pathname', () => {
    window.history.pushState({}, '', '/en/nearby')
    expect(getCurrentLocale()).toBe('en')
  })

  it('falls back to default locale for unknown segment', () => {
    window.history.pushState({}, '', '/de/nearby')
    expect(getCurrentLocale()).toBe(defaultLocale)
  })
})
