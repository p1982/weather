export interface CurrentCityWeather {
  city: string,
  condition: string,
  description: string,
  feelsLike: number,
  humidity: number,
  icon: string,
  temperature: number,
  windSpeed: number,
}


export interface ForecastDay {
  datetime: string,
  datetimeEpoch: number,
  tempmax: number,
  tempmin: number,
  temp: number,
  feelslikemax: number,
  feelslikemin: number,
  feelslike: number,
  humidity: number,
  dew: number,
  precip: number,
  precipprob: number,
  precipcover: number,
  preciptype: string[],
  snow: number,
  snowdepth: number,
  windgust: number,
  windspeed: number,
  winddir: number,
  pressure: number,
  cloudcover: number,
  visibility: number,
  solarradiation: number,
  solarenergy: number,
  uvindex: number,
  severerisk: number,
  sunrise: string,
  sunriseEpoch: number,
  sunset: string,
  sunsetEpoch: number,
  moonphase: number,
  conditions: string,
  description: string,
  icon: string,
  stations: string[],
  source: string,
  hours: ForecastHour[],
}

export interface ForecastHour {
  datetime: string,
  datetimeEpoch: number,
  temp: number,
  feelslike: number,
  humidity: number,
  dew: number,
  precip: number,
  precipprob: number,
  snow: number,
  snowdepth: number,
  preciptype: string[],
  windgust: number,
  windspeed: number,
  winddir: number,
  pressure: number,
  cloudcover: number,
  visibility: number,
  solarradiation: number,
  solarenergy: number,
  uvindex: number,
  severerisk: number,
  conditions: string,
  description: string,
  icon: string,
  stations: string[],
  source: string,
}

export interface Forecast {
  condition: string,
  date: string,
  icon: string,
  label: string,
  temperature: number,
}


export interface WeatherData {
  id: string,
  current: CurrentCityWeather,
  forecast: Forecast[],
}

export type WeatherStatus = 'idle' | 'loading' | 'error'

export interface ForecastData {
  date:Date,
  label:string,
  temperature:number,
  condition:string,
  icon:string
}
