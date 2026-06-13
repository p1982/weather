import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'

import { middleware } from '@/middleware'

describe('middleware', () => {
  it('redirects root path to default locale', () => {
    const request = new NextRequest(new URL('http://localhost:3000/'))

    const response = middleware(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost:3000/uk')
  })

  it('redirects non-localized paths to default locale', () => {
    const request = new NextRequest(new URL('http://localhost:3000/favorites'))

    const response = middleware(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost:3000/uk/favorites')
  })

  it('allows localized paths', () => {
    const request = new NextRequest(new URL('http://localhost:3000/en/nearby'))

    const response = middleware(request)

    expect(response.status).toBe(200)
    expect(response.headers.get('location')).toBeNull()
  })

  it('allows localized home path', () => {
    const request = new NextRequest(new URL('http://localhost:3000/uk'))

    const response = middleware(request)

    expect(response.status).toBe(200)
  })
})
