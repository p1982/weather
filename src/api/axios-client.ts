import axios from 'axios'

import { WEATHER_API_BASE_URL, WEATHER_API_TIMEOUT } from '@/api/constants/config'
import { setupInterceptors } from '@/api/interceptors'

export const weatherApiClient = axios.create({
  baseURL: WEATHER_API_BASE_URL,
  timeout: WEATHER_API_TIMEOUT,
})

setupInterceptors(weatherApiClient)
