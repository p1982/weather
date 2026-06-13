import axios, { AxiosHeaders } from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { setupInterceptors } from '@/api/interceptors'
import * as i18nSettings from '@/i18n/settings'

import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const createConfig = (params: Record<string, unknown>): InternalAxiosRequestConfig => ({
  headers: new AxiosHeaders(),
  params,
})

const getRequestHandler = (instance: AxiosInstance) => {
  const handler = instance.interceptors.request.handlers?.[0]?.fulfilled

  if (!handler) {
    throw new Error('Request handler not found')
  }

  return handler
}

const getResponseErrorHandler = (instance: AxiosInstance) => {
  const handler = instance.interceptors.response.handlers?.[0]?.rejected

  if (!handler) {
    throw new Error('Response handler not found')
  }

  return handler
}

describe('setupInterceptors', () => {
  beforeEach(() => {
    vi.spyOn(i18nSettings, 'getCurrentLocale').mockReturnValue('en')
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('adds locale to request params', async () => {
    const instance = axios.create()
    setupInterceptors(instance)

    const handler = getRequestHandler(instance)
    const config = await handler(createConfig({ key: 'test' }))

    expect(config?.params).toEqual({ key: 'test', lang: 'en' })
  })

  it('keeps existing lang param', async () => {
    const instance = axios.create()
    setupInterceptors(instance)

    const handler = getRequestHandler(instance)
    const config = await handler(createConfig({ lang: 'uk' }))

    expect(config?.params).toEqual({ lang: 'uk' })
  })

  it('logs api errors and rejects response', async () => {
    const instance = axios.create()
    setupInterceptors(instance)

    const handler = getResponseErrorHandler(instance)
    const error = {
      response: {
        status: 404,
        data: { message: 'Not found' },
      },
      config: { url: '/timeline/kyiv' },
    }

    await expect(handler(error)).rejects.toEqual(error)
    expect(console.warn).toHaveBeenCalledWith('API Error:', {
      message: 'Not found',
      url: '/timeline/kyiv',
      status: 404,
    })
  })

  it('returns fallback message when response has no payload', async () => {
    const instance = axios.create()
    setupInterceptors(instance)

    const handler = getResponseErrorHandler(instance)
    const error = {
      response: {
        status: 500,
        data: null,
      },
      config: { url: '/timeline/kyiv' },
    }

    await expect(handler(error)).rejects.toEqual(error)
    expect(console.warn).toHaveBeenCalledWith('API Error:', {
      message: 'Request failed with status 500',
      url: '/timeline/kyiv',
      status: 500,
    })
  })

  it('returns message for network errors', async () => {
    const instance = axios.create()
    setupInterceptors(instance)

    const handler = getResponseErrorHandler(instance)
    const error = { config: { url: '/timeline/kyiv' } }

    await expect(handler(error)).rejects.toEqual(error)
    expect(console.warn).toHaveBeenCalledWith('API Error:', {
      message: 'No response received from server',
      url: '/timeline/kyiv',
      status: undefined,
    })
  })
})
