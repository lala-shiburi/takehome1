export interface CurrentWeather {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  pressure: number;
  precip: number;
}
