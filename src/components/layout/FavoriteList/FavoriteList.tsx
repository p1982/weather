'use client'
import { useTranslation } from 'react-i18next'

import { useCityStore } from '@/store/'

import FavoriteCard from './FavoriteCard'
import { StyledEmptyList, StyledList } from './styled'

const FavoriteList = () => {
  const { t } = useTranslation()
  const { favoritesCity } = useCityStore()

  const isFavorite = (city: string) => favoritesCity.includes(city)
  if (!favoritesCity.length) {
    return <StyledEmptyList>{t('favorites.empty')}</StyledEmptyList>
  }

  return (
    <StyledList>
      {favoritesCity.map((value) => (
        <FavoriteCard key={value} city={value} isFavorite={isFavorite(value)} />
      ))}
    </StyledList>
  )
}

export default FavoriteList
