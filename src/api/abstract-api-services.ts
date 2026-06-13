import type { AxiosInstance } from 'axios'

abstract class ApiServices {
  protected apiClient: AxiosInstance

  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient
  }

  protected async get<T>(
    endpoint: string,
    options?: {
      params?: Record<string, unknown>
    },
  ): Promise<T> {
    const response = await this.apiClient.get<T>(endpoint, options)
    return response.data
  }
}

export default ApiServices
