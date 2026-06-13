'use client'
import React, { useEffect } from 'react'

import { useCityStore, useWeatherStore } from '@/store'

import WeatherCard from '../WeatherCard/WeatherCard'

import WeatherDetailsList from './WeatherDetailsList'

interface Props {
  city: string
}

const WeatherDetails = ({ city }: Props) => {
  const fetchWeatherByCity = useWeatherStore((state) => state.fetchWeatherByCity)
  const setCity = useCityStore((state) => state.setCity)

  useEffect(() => {
    let active = true

    void fetchWeatherByCity(city).then((id) => {
      if (active && id) {
        setCity(id)
      }
    })

    return () => {
      active = false
    }
  }, [city, fetchWeatherByCity, setCity])

  return (
    <>
      <WeatherCard isShowButton={false} />
      <WeatherDetailsList />
    </>
  )
}

export default WeatherDetails
