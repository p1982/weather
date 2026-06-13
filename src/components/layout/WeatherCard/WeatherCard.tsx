'use client'
import { getWeatherIconUrl } from '@/api/mappers/weather-mapper'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import { defaultLocale } from '@/i18n/settings'
import {useWeatherStore, useCityStore} from '@/store'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Button, IconButton } from '@mui/material'
import NextLink from 'next/link'
import { useParams } from 'next/navigation'
import Error from '../Error/Error'
import { StyledBox, StyledCard, StyledCardContent, StyledCardHeader, StyledCardTitle, StyledCardText, StyledWeatherIcon, StyledHeaderBox, StyledEmpty } from './styled'
import { useTranslation } from 'react-i18next'


const WeatherCard = ({isShowButton = true}: {isShowButton?: boolean}) => {
    const { t } = useTranslation()
    const params = useParams()
    const locale = typeof params.locale === 'string' ? params.locale : defaultLocale
    const { weatherByCity, isLoading, error } = useWeatherStore()
    const { city, favoritesCity, toggleFavoriteCity } = useCityStore()

    if (isLoading) return <LoadingSpinner />
    if (error) return <Error />

    const weather = city ? weatherByCity[city] : undefined
    if (!city || !weather) return <StyledEmpty variant="body1">{t('states.empty')}</StyledEmpty>

    const { current } = weather
    const isFavorite = favoritesCity.includes(city)
    const toggleFavorite = () => toggleFavoriteCity(city)

    return (
        <StyledCard>
            <StyledCardContent>
                <StyledCardHeader>
                    <StyledWeatherIcon
                        src={getWeatherIconUrl(current.icon)}
                        alt={current.condition}
                    />
                    <StyledHeaderBox>
                        <StyledCardTitle variant="h4">{t('weather.city')}: {current.city}</StyledCardTitle>
                        <IconButton aria-label="favorite" onClick={toggleFavorite}>
                            {isFavorite ? (
                                <FavoriteIcon sx={{ color: 'error.main' }} />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                        </IconButton>
                    </StyledHeaderBox>
                </StyledCardHeader>
                <StyledBox>
                    <StyledCardText variant='body1' >{t('weather.temperature')}: {current.temperature}</StyledCardText>
                    <StyledCardText variant='body1'>{t('weather.feelsLike')}: {current.feelsLike}</StyledCardText>
                    <StyledCardText variant='body1'>{t('weather.humidity')}: {current.humidity}</StyledCardText>
                    <StyledCardText variant='body1'>{t('weather.wind')}: {current.windSpeed}</StyledCardText>
                    <StyledCardText variant='body1'>{t('weather.condition')}: {current.condition}</StyledCardText>
                    <StyledCardText variant='body1'>{t('weather.description')}: {current.description}</StyledCardText>
                </StyledBox>
                {isShowButton && <Button
                    component={NextLink}
                    href={`/${locale}/weather-details?city=${encodeURIComponent(current.city)}`}
                    variant="contained"
                    size="small"
                    sx={{ mt: 2, alignSelf: 'flex-start', textTransform: 'none', fontWeight: 600 }}
                >
                    {t('weather.details')}
                </Button>}
            </StyledCardContent>
        </StyledCard>
    )
}

export default WeatherCard