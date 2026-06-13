'use client'
import { useTranslation } from 'react-i18next'

import { getWeatherIconUrl } from '@/api/mappers/weather-mapper'

import {
  StyledCard,
  StyledCardContent,
  StyledCardHeader,
  StyledCardText,
  StyledCardTitle,
  StyledWeatherIcon,
} from './styled'

import type { ForecastData } from '@/types/weather-type'

interface Props {
  forecast: ForecastData
}

const WeatherDetailsCard = ({ forecast }: Props) => {
  const { t } = useTranslation()

  return (
    <StyledCard>
      <StyledCardContent>
        <StyledCardHeader>
          <StyledCardTitle variant="h6">{forecast.label}</StyledCardTitle>
          <StyledWeatherIcon src={getWeatherIconUrl(forecast.icon)} alt={forecast.condition} />
        </StyledCardHeader>
        <StyledCardText variant="body1">
          {t('weather.temperature')}: {forecast.temperature}
        </StyledCardText>
        <StyledCardText variant="body2">{forecast.condition}</StyledCardText>
      </StyledCardContent>
    </StyledCard>
  )
}

export default WeatherDetailsCard
