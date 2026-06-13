'use client'

import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { defaultLocale } from '@/i18n/settings'
import { useCityStore, useWeatherStore } from '@/store'

export default function WeatherLocaleSync() {
  const params = useParams()
  const locale = typeof params.locale === 'string' ? params.locale : defaultLocale
  const previousLocale = useRef(locale)

  useEffect(() => {
    if (previousLocale.current === locale) {
      return
    }

    previousLocale.current = locale

    const { weatherByCity, fetchWeatherByCity } = useWeatherStore.getState()
    const { city, favoritesCity } = useCityStore.getState()

    const idsToRefetch = new Set<string>(favoritesCity)
    if (city) {
      idsToRefetch.add(city)
    }

    idsToRefetch.forEach((id) => {
      const query = weatherByCity[id]?.current.city ?? id
      void fetchWeatherByCity(query)
    })
  }, [locale])

  return null
}
