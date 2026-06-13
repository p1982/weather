const IP_GEO_URL = 'https://get.geojs.io/v1/ip/geo.json'

interface GeoJsResponse {
  city?: string
  region?: string
  country?: string
  latitude?: string
  longitude?: string
}

export const getLocationByIp = async (): Promise<string> => {
  const response = await fetch(IP_GEO_URL)

  if (!response.ok) {
    throw new Error('Failed to detect location by IP')
  }

  const data = (await response.json()) as GeoJsResponse

  if (data.city) {
    return data.city
  }

  if (data.latitude && data.longitude) {
    return `${data.latitude},${data.longitude}`
  }

  throw new Error('Failed to detect location by IP')
}
