import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CityState {
  city: string | null
  favoritesCity: string[]
  toggleFavoriteCity: (city: string) => void
  setCity: (city: string) => void
  isLoading: boolean
  error: string | null
}

const useCityStore = create<CityState>()(
  persist(
    (set, get): CityState => ({
      favoritesCity: [],
      city: null,
      isLoading: false,
      setCity: (city: string) => set({ city }),
      error: null,
      toggleFavoriteCity: (city: string) => {
        const isFavorite = get().favoritesCity.includes(city)
        if (isFavorite) {
          set({ favoritesCity: get().favoritesCity.filter((c) => c !== city) })
        } else {
          set({ favoritesCity: [...get().favoritesCity, city] })
        }
      },
    }),
    {
      name: 'city-storage',
      partialize: (state) => ({
        favoritesCity: state.favoritesCity,
      }),
    },
  ),
)

export default useCityStore
