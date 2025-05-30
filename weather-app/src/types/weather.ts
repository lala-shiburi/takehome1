export interface CurrentWeather {
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  pressure: number;
  precip: number;
}

export type FormattedWeatherDay = {
  date: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  pressure: number;
  precip: number;
  displayDay: string;
};

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
  date: string;
  hourly: HourlyWeather[];
};

export type WeatherData = {
  location: { localtime: string };
  historical?: Record<string, WeatherDay>;
  current: HourlyWeather;
  forecast?: Record<string, WeatherDay>;
};
