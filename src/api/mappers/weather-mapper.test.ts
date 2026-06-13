import { describe, expect, it } from 'vitest'

import { WEATHER_ICON_BASE_URL } from '@/api/constants/config'
import { getWeatherIconUrl, mapTimelineToWeatherData } from '@/api/mappers/weather-mapper'

import type { VisualCrossingTimelineResponse } from '@/types/visual-crossing'

const createTimelineResponse = (
  overrides: Partial<VisualCrossingTimelineResponse> = {},
): VisualCrossingTimelineResponse => ({
  address: 'Kyiv, Ukraine',
  resolvedAddress: 'Kyiv, Kyiv City, Ukraine',
  latitude: 50.4501,
  longitude: 30.5234,
  currentConditions: {
    temp: 12.4,
    feelslike: 10.8,
    humidity: 65.2,
    windspeed: 4.5,
    conditions: 'Partly cloudy',
    icon: 'partly-cloudy-day',
  },
  days: [
    {
      datetime: '2026-06-13',
      temp: 14.2,
      feelslike: 13.1,
      humidity: 60,
      windspeed: 3.2,
      conditions: 'Clear',
      icon: 'clear-day',
    },
    {
      datetime: '2026-06-14',
      temp: 16.8,
      feelslike: 15.9,
      humidity: 58,
      windspeed: 2.8,
      conditions: 'Rain',
      icon: 'rain',
    },
  ],
  ...overrides,
})

describe('weather-mapper', () => {
  it('builds weather icon url', () => {
    expect(getWeatherIconUrl('clear-day')).toBe(`${WEATHER_ICON_BASE_URL}/clear-day.png`)
  })

  it('maps timeline response to weather data with coordinate id', () => {
    const result = mapTimelineToWeatherData(createTimelineResponse(), 'uk')

    expect(result.id).toBe('50.45,30.52')
    expect(result.current.city).toBe('Kyiv')
    expect(result.current.temperature).toBe(12)
    expect(result.current.feelsLike).toBe(11)
    expect(result.current.humidity).toBe(65)
    expect(result.current.windSpeed).toBe(4.5)
    expect(result.current.condition).toBe('Partly cloudy')
    expect(result.forecast).toHaveLength(2)
    expect(result.forecast[0].temperature).toBe(14)
    expect(result.forecast[0].condition).toBe('Clear')
  })

  it('uses address when resolvedAddress is missing', () => {
    const result = mapTimelineToWeatherData(
      createTimelineResponse({
        resolvedAddress: '',
        address: 'London, UK',
      }),
    )

    expect(result.current.city).toBe('London')
  })

  it('limits forecast to five days', () => {
    const days = Array.from({ length: 7 }, (_, index) => ({
      datetime: `2026-06-${String(13 + index).padStart(2, '0')}`,
      temp: 10 + index,
      feelslike: 9 + index,
      humidity: 50,
      windspeed: 2,
      conditions: 'Clear',
      icon: 'clear-day',
    }))

    const result = mapTimelineToWeatherData(createTimelineResponse({ days }))

    expect(result.forecast).toHaveLength(5)
  })
})
