import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getLocationByIp } from '@/api/geo-service'

describe('geo-service', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns city when geo service provides it', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ city: 'Kyiv', latitude: '50.45', longitude: '30.52' }),
    } as Response)

    await expect(getLocationByIp()).resolves.toBe('Kyiv')
  })

  it('returns coordinates when city is missing', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ latitude: '50.45', longitude: '30.52' }),
    } as Response)

    await expect(getLocationByIp()).resolves.toBe('50.45,30.52')
  })

  it('throws when response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response)

    await expect(getLocationByIp()).rejects.toThrow('Failed to detect location by IP')
  })

  it('throws when location data is incomplete', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response)

    await expect(getLocationByIp()).rejects.toThrow('Failed to detect location by IP')
  })
})
