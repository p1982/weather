import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import weatherService from '@/api/weather-service'
import { getCurrentLocale } from '@/i18n/settings'

import type { ForecastData, WeatherData } from '@/types/weather-type'

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

interface WeatherState {
  weatherByCity: Record<string, WeatherData>
  forecastByCity: Record<string, ForecastData[]>
  fetchWeatherByCity: (city: string) => Promise<string | null>
  clearError: () => void
  isLoading: boolean
  error: string | null
}

const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get): WeatherState => ({
      weatherByCity: {},
      forecastByCity: {},
      isLoading: false,
      error: null,
      clearError: () => set({ error: null }),
      fetchWeatherByCity: async (city: string) => {
        set({ isLoading: true, error: null })

        try {
          const weather = await weatherService.getWeatherByCity(city, {
            locale: getCurrentLocale(),
          })
          set({ weatherByCity: { ...get().weatherByCity, [weather.id]: weather } })
          set({
            forecastByCity: {
              ...get().forecastByCity,
              [weather.id]: weather.forecast.map((forecast) => ({
                date: new Date(forecast.date),
                label: forecast.label,
                temperature: forecast.temperature,
                condition: forecast.condition,
                icon: forecast.icon,
              })),
            },
          })

          return weather.id
        } catch (error) {
          set({ error: getErrorMessage(error) })

          return null
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'weather-storage',
      partialize: (state) => ({
        weatherByCity: state.weatherByCity,
      }),
    },
  ),
)

export default useWeatherStore
