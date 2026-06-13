import React from 'react'

import useWeatherStore from '@/store/weather-store/weather-store'

import { StyledTypography } from './styled'

const Error = () => {
  const { error } = useWeatherStore()
  return <StyledTypography>{error}</StyledTypography>
}

export default Error
