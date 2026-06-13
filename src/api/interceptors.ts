import { getCurrentLocale } from '@/i18n/settings'

import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const getErrorMessage = (error: AxiosError): string => {
  const { response } = error

  if (!response) {
    return 'No response received from server'
  }

  const { data, status } = response

  if (typeof data === 'string' && data) {
    return data
  }

  if (data && typeof data === 'object') {
    const payload = data as Record<string, unknown>
    const message = payload.message ?? payload.error

    if (typeof message === 'string' && message) {
      return message
    }
  }

  return `Request failed with status ${status}`
}

export const setupInterceptors = (apiInstance: AxiosInstance) => {
  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.params = {
        ...config.params,
        lang: config.params?.lang ?? getCurrentLocale(),
      }

      return config
    },
    (error) => Promise.reject(error),
  )

  apiInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      console.warn('API Error:', {
        message: getErrorMessage(error),
        url: error.config?.url,
        status: error.response?.status,
      })

      return Promise.reject(error)
    },
  )
}
