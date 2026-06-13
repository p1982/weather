import { WEATHER_ICON_BASE_URL } from '@/api/constants/config'

import type {
  VisualCrossingConditions,
  VisualCrossingDay,
  VisualCrossingTimelineResponse,
} from '@/types/visual-crossing'
import type { CurrentCityWeather, Forecast, WeatherData } from '@/types/weather-type'

export const getWeatherIconUrl = (icon: string): string => `${WEATHER_ICON_BASE_URL}/${icon}.png`

const mapCurrentWeather = (
  city: string,
  conditions: VisualCrossingConditions,
): CurrentCityWeather => ({
  city,
  temperature: Math.round(conditions.temp),
  feelsLike: Math.round(conditions.feelslike),
  humidity: Math.round(conditions.humidity),
  windSpeed: conditions.windspeed,
  condition: conditions.conditions,
  description: conditions.conditions,
  icon: conditions.icon,
})

const mapForecastDay = (day: VisualCrossingDay, locale: string): Forecast => ({
  date: day.datetime,
  label: new Date(day.datetime).toLocaleDateString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }),
  temperature: Math.round(day.temp),
  condition: day.conditions,
  icon: day.icon,
})

export const mapTimelineToWeatherData = (
  data: VisualCrossingTimelineResponse,
  locale = 'uk',
): WeatherData => {
  const city = (data.resolvedAddress || data.address).split(',')[0].trim()
  const id = `${data.latitude.toFixed(2)},${data.longitude.toFixed(2)}`

  return {
    id,
    current: mapCurrentWeather(city, data.currentConditions),
    forecast: data.days.slice(0, 5).map((day: VisualCrossingDay) => mapForecastDay(day, locale)),
  }
}
