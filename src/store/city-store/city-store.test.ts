import { beforeEach, describe, expect, it } from 'vitest'

import useCityStore from '@/store/city-store/city-store'

describe('city-store', () => {
  beforeEach(() => {
    useCityStore.setState({
      city: null,
      favoritesCity: [],
      isLoading: false,
      error: null,
    })
  })

  it('sets active city', () => {
    useCityStore.getState().setCity('50.45,30.52')

    expect(useCityStore.getState().city).toBe('50.45,30.52')
  })

  it('adds city to favorites', () => {
    useCityStore.getState().toggleFavoriteCity('50.45,30.52')

    expect(useCityStore.getState().favoritesCity).toEqual(['50.45,30.52'])
  })

  it('removes city from favorites when toggled twice', () => {
    const { toggleFavoriteCity } = useCityStore.getState()

    toggleFavoriteCity('50.45,30.52')
    toggleFavoriteCity('50.45,30.52')

    expect(useCityStore.getState().favoritesCity).toEqual([])
  })

  it('keeps other favorites when removing one city', () => {
    const { toggleFavoriteCity } = useCityStore.getState()

    toggleFavoriteCity('50.45,30.52')
    toggleFavoriteCity('51.50,-0.12')
    toggleFavoriteCity('50.45,30.52')

    expect(useCityStore.getState().favoritesCity).toEqual(['51.50,-0.12'])
  })
})
