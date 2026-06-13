import axios from 'axios'

import ApiServices from '@/api/abstract-api-services'
import { weatherApiClient } from '@/api/axios-client'
import endpoints from '@/api/constants/endpoints'
import { mapTimelineToWeatherData } from '@/api/mappers/weather-mapper'

import type { VisualCrossingTimelineResponse } from '@/types/visual-crossing'
import type { WeatherData } from '@/types/weather-type'

const getApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY

  if (!apiKey) {
    throw new Error('Add NEXT_PUBLIC_WEATHER_API_KEY to .env.local')
  }

  return apiKey
}

interface TimelineOptions {
  date1?: string
  date2?: string
  locale?: string
}

class WeatherService extends ApiServices {
  constructor() {
    super(weatherApiClient)
  }

  private buildTimelinePath(location: string, date1?: string, date2?: string): string {
    const encodedLocation = encodeURIComponent(location)

    if (date1 && date2) {
      return `${endpoints.weather.timeline}/${encodedLocation}/${date1}/${date2}`
    }

    return `${endpoints.weather.timeline}/${encodedLocation}`
  }

  getTimeline(location: string, options?: TimelineOptions) {
    return this.get<VisualCrossingTimelineResponse>(
      this.buildTimelinePath(location, options?.date1, options?.date2),
      {
        params: {
          key: getApiKey(),
          unitGroup: 'metric',
          include: 'days,hours,current',
        },
      },
    )
  }

  async getWeatherByCity(city: string, options?: TimelineOptions): Promise<WeatherData> {
    try {
      const data = await this.getTimeline(city, options)

      return mapTimelineToWeatherData(data, options?.locale)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400 || error.response?.status === 404) {
          throw new Error('Місто не знайдено. Перевірте назву та спробуйте ще раз.')
        }

        if (error.response?.status === 401 || error.response?.status === 403) {
          throw new Error('Невірний API-ключ. Перевірте NEXT_PUBLIC_WEATHER_API_KEY.')
        }

        throw new Error('Не вдалося отримати погоду. Спробуйте пізніше.')
      }

      throw error
    }
  }
}

const weatherService = new WeatherService()

export default weatherService
