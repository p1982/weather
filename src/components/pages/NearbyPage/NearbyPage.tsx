'use client'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getLocationByIp } from '@/api/geo-service'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import WeatherCard from '@/components/layout/WeatherCard/WeatherCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import { useCityStore, useWeatherStore } from '@/store'

const NearbyPage = () => {
    const { t } = useTranslation()
    const fetchWeatherByCity = useWeatherStore((state) => state.fetchWeatherByCity)
    const setCity = useCityStore((state) => state.setCity)

    const [isLocating, setIsLocating] = useState(true)
    const [geoError, setGeoError] = useState<string | null>(null)

    useEffect(() => {
        let active = true

        const loadNearbyWeather = async () => {
            try {
                const location = await getLocationByIp()
                const id = await fetchWeatherByCity(location)

                if (active && id) {
                    setCity(id)
                }
            } catch {
                if (active) {
                    setGeoError(t('states.error'))
                }
            } finally {
                if (active) {
                    setIsLocating(false)
                }
            }
        }

        void loadNearbyWeather()

        return () => {
            active = false
        }
    }, [fetchWeatherByCity, setCity, t])

    return (
        <PageContainer>
            {isLocating ? (
                <LoadingSpinner />
            ) : geoError ? (
                <Typography variant="body1" align="center" color="text.secondary">
                    {geoError}
                </Typography>
            ) : (
                <WeatherCard />
            )}
        </PageContainer>
    )
}

export default NearbyPage
