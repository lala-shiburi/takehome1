import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { WeatherData } from "../types/weather";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormattedWeatherDay = {
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

export const formatWeatherData = (
  weatherData: WeatherData
): FormattedWeatherDay[] => {
  if (!weatherData) return [];

  const { historical, current, forecast, location } = weatherData;
  const today = new Date(location.localtime.split(" ")[0]);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const mapDay = (date: string, data: any): FormattedWeatherDay => {
    const parsedDate = new Date(date);
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    return {
      date,
      temperature: data.temperature,
      weather_code: data.weather_code,
      weather_icons: data.weather_icons,
      weather_descriptions: data.weather_descriptions,
      wind_speed: data.wind_speed,
      pressure: data.pressure,
      precip: data.precip,
      displayDay: dayNames[parsedDate.getDay()],
    };
  };

  const sevenDay: FormattedWeatherDay[] = [];

  // 1. Historical (last 3 days)
  const historicalDates = historical ? Object.keys(historical).sort() : [];
  const recentHistorical = historicalDates.slice(-3);
  recentHistorical.forEach((date) => {
    const hourly = historical[date]?.hourly?.[0];
    if (hourly) {
      sevenDay.push(mapDay(date, hourly));
    }
  });

  // 2. Current day
  const todayFormatted = formatDate(today);
  sevenDay.push(
    mapDay(todayFormatted, {
      ...current,
    })
  );

  // 3. Forecast (next 3 days)
  const forecastDates = forecast ? Object.keys(forecast).sort() : [];
  const upcomingForecast = forecastDates.slice(0, 3);
  upcomingForecast.forEach((date) => {
    const hourly = forecast[date]?.hourly?.[0];
    if (hourly) {
      sevenDay.push(mapDay(date, hourly));
    }
  });

  return sevenDay;
};
