'use client'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Button } from '@mui/material'
import NextLink from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { getWeatherIconUrl } from '@/api/mappers/weather-mapper'
import { defaultLocale } from '@/i18n/settings'
import { useCityStore, useWeatherStore } from '@/store'

import {
  StyledBox,
  StyledCardText,
  StyledFavoriteButton,
  StyledFavoriteItem,
  StyledWeatherIcon,
  StyledCardHeader,
  StyledCardTitle,
} from './styled'

import type { MouseEvent } from 'react'

interface FavoriteCardProps {
  city: string
  isFavorite: boolean
}

const FavoriteCard = ({ city, isFavorite }: FavoriteCardProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const params = useParams()
  const locale = typeof params.locale === 'string' ? params.locale : defaultLocale
  const { weatherByCity } = useWeatherStore()
  const { setCity, toggleFavoriteCity } = useCityStore()
  const weather = weatherByCity[city]

  if (!weather) {
    return null
  }

  const { current } = weather

  const openCity = () => {
    setCity(city)
    router.push(`/${locale}`)
  }

  const toggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    toggleFavoriteCity(city)
  }

  return (
    <StyledFavoriteItem disableGutters onClick={openCity}>
      <StyledFavoriteButton aria-label="favorite" onClick={toggleFavorite}>
        {isFavorite ? <FavoriteIcon sx={{ color: 'error.main' }} /> : <FavoriteBorderIcon />}
      </StyledFavoriteButton>
      <StyledCardHeader>
        <StyledWeatherIcon src={getWeatherIconUrl(current.icon)} alt={current.condition} />
        <StyledCardTitle variant="h4">
          {t('weather.city')}: {current.city}
        </StyledCardTitle>
      </StyledCardHeader>
      <StyledBox>
        <StyledCardText variant="body1">
          {t('weather.temperature')}: {current.temperature}
        </StyledCardText>
        <StyledCardText variant="body1">
          {t('weather.feelsLike')}: {current.feelsLike}
        </StyledCardText>
        <StyledCardText variant="body1">
          {t('weather.humidity')}: {current.humidity}
        </StyledCardText>
        <StyledCardText variant="body1">
          {t('weather.wind')}: {current.windSpeed}
        </StyledCardText>
        <StyledCardText variant="body1">
          {t('weather.condition')}: {current.condition}
        </StyledCardText>
        <StyledCardText variant="body1">
          {t('weather.description')}: {current.description}
        </StyledCardText>
      </StyledBox>
      <Button
        component={NextLink}
        href={`/${locale}/weather-details?city=${encodeURIComponent(current.city)}`}
        variant="contained"
        size="small"
        onClick={(event) => event.stopPropagation()}
        sx={{ mt: 2, alignSelf: 'flex-start', textTransform: 'none', fontWeight: 600 }}
      >
        {t('weather.details')}
      </Button>
    </StyledFavoriteItem>
  )
}

export default FavoriteCard
