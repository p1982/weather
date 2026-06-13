'use client'
import React from 'react'
import { useCityStore, useWeatherStore } from '@/store'
import WeatherDetailsCard from './WeatherDetailsCard'
import { StyledList } from './styled'


const WeatherDetailsList = () => {
    const { forecastByCity } = useWeatherStore()
    const { city } = useCityStore()
    if (!city) return null
    return (
        <StyledList>
            {forecastByCity[city]?.map((forecast, index) => (
                <WeatherDetailsCard key={index} forecast={forecast} />
            ))}
        </StyledList>

    )
}

export default WeatherDetailsList