import WeatherDetails from '@/components/layout/WeatherDetails/WeatherDetails'
import { redirect } from 'next/navigation'
import React from 'react'
interface Props {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ city?: string }>
}

const WeatheDetailPages = async ({ searchParams }: Props) => {
  const { city } = await searchParams

  if (!city) {
    redirect('/')
  }

  return (
    <WeatherDetails city={city} />
  )
}

export default WeatheDetailPages