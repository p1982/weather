export interface VisualCrossingConditions {
  temp: number
  feelslike: number
  humidity: number
  windspeed: number
  conditions: string
  icon: string
}

export interface VisualCrossingDay extends VisualCrossingConditions {
  datetime: string
}

export interface VisualCrossingTimelineResponse {
  address: string
  resolvedAddress: string
  latitude: number
  longitude: number
  currentConditions: VisualCrossingConditions
  days: VisualCrossingDay[]
}
