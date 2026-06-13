import { describe, expect, it } from 'vitest'

import { createCitySearchSchema } from '@/schemas/schema-city-search'

describe('createCitySearchSchema', () => {
  const schema = createCitySearchSchema('City is required')

  it('accepts valid city names', () => {
    const result = schema.safeParse({ city: 'Kyiv' })

    expect(result.success).toBe(true)
  })

  it('trims city value before validation', () => {
    const result = schema.safeParse({ city: '  Kyiv  ' })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.city).toBe('Kyiv')
    }
  })

  it('rejects values shorter than two characters', () => {
    const result = schema.safeParse({ city: 'K' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('City is required')
    }
  })

  it('rejects empty values', () => {
    const result = schema.safeParse({ city: '   ' })

    expect(result.success).toBe(false)
  })
})
