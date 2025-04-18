export interface CurrentWeather {
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  pressure: number;
  precip: number;
}

export type HourlyWeather = {
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  pressure: number;
  precip: number;
};

export type WeatherDay = {
  hourly: HourlyWeather[];
};

export type WeatherData = {
  location: { localtime: string };
  historical?: Record<string, WeatherDay>;
  current: HourlyWeather & {
    humidity: number;
    feelslike: number;
    observation_time: string;
  };
  forecast?: Record<string, WeatherDay>;
};
