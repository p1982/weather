import { beforeEach, describe, expect, it, vi } from 'vitest'

import weatherService from '@/api/weather-service'
import useWeatherStore from '@/store/weather-store/weather-store'

import type { WeatherData } from '@/types/weather-type'

vi.mock('@/api/weather-service', () => ({
  default: {
    getWeatherByCity: vi.fn(),
  },
}))

vi.mock('@/i18n/settings', () => ({
  getCurrentLocale: () => 'uk',
}))

const mockWeather: WeatherData = {
  id: '50.45,30.52',
  current: {
    city: 'Kyiv',
    temperature: 12,
    feelsLike: 11,
    humidity: 65,
    windSpeed: 4.5,
    condition: 'Clear',
    description: 'Clear',
    icon: 'clear-day',
  },
  forecast: [
    {
      date: '2026-06-13',
      label: 'Fri, Jun 13',
      temperature: 14,
      condition: 'Clear',
      icon: 'clear-day',
    },
  ],
}

describe('weather-store', () => {
  beforeEach(() => {
    vi.mocked(weatherService.getWeatherByCity).mockReset()
    useWeatherStore.setState({
      weatherByCity: {},
      forecastByCity: {},
      isLoading: false,
      error: null,
    })
  })

  it('fetches weather and stores it by coordinate id', async () => {
    vi.mocked(weatherService.getWeatherByCity).mockResolvedValue(mockWeather)

    const id = await useWeatherStore.getState().fetchWeatherByCity('Kyiv')

    expect(id).toBe('50.45,30.52')
    expect(useWeatherStore.getState().weatherByCity['50.45,30.52']).toEqual(mockWeather)
    expect(useWeatherStore.getState().forecastByCity['50.45,30.52']).toHaveLength(1)
    expect(useWeatherStore.getState().isLoading).toBe(false)
    expect(useWeatherStore.getState().error).toBeNull()
  })

  it('stores api errors and returns null', async () => {
    vi.mocked(weatherService.getWeatherByCity).mockRejectedValue(new Error('City not found'))

    const id = await useWeatherStore.getState().fetchWeatherByCity('Unknown')

    expect(id).toBeNull()
    expect(useWeatherStore.getState().error).toBe('City not found')
    expect(useWeatherStore.getState().isLoading).toBe(false)
  })

  it('clears stored error', () => {
    useWeatherStore.setState({ error: 'City not found' })

    useWeatherStore.getState().clearError()

    expect(useWeatherStore.getState().error).toBeNull()
  })
})
