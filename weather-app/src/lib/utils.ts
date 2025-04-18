import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import {
  FormattedWeatherDay,
  HourlyWeather,
  WeatherData,
  WeatherDay,
} from "../types/weather";
import { weatherCodes } from "./constants";

// ========== Utility ==========
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ========== Constants ==========
const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const mapDay = (date: string, data: HourlyWeather): FormattedWeatherDay => {
  const parsedDate = new Date(date);

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

// ========== Format Real Weather Data ==========
export const formatWeatherData = (
  weatherData: WeatherData
): FormattedWeatherDay[] => {
  if (!weatherData) return [];

  const { historical, current, forecast, location } = weatherData;
  const today = new Date(location.localtime.split(" ")[0]);
  const todayFormatted = formatDate(today);

  const weeklyWeather: FormattedWeatherDay[] = [];

  // 1. Historical (last 3 days)
  const historicalDates = historical
    ? Object.keys(historical).sort().slice(-3)
    : [];
  historicalDates.forEach((date) => {
    const hourly = historical?.[date]?.hourly?.[0];
    if (hourly) {
      weeklyWeather.push(mapDay(date, hourly));
    }
  });

  // 2. Current day
  if (current) {
    weeklyWeather.push(mapDay(todayFormatted, current));
  }

  // 3. Forecast (next 3 days)
  const forecastDates = forecast
    ? Object.keys(forecast).sort().slice(0, 3)
    : [];
  forecastDates.forEach((date) => {
    const hourly = forecast?.[date]?.hourly?.[0];
    if (hourly) {
      weeklyWeather.push(mapDay(date, hourly));
    }
  });

  return weeklyWeather;
};

// ========== Mock Weather Generator ==========
const getRandomWeather = () => {
  const weatherCodesArray = Object.keys(
    weatherCodes
  ) as unknown as (keyof typeof weatherCodes)[];
  const randomCode =
    weatherCodesArray[Math.floor(Math.random() * weatherCodesArray.length)];
  const weather = weatherCodes[randomCode];

  return {
    weather_code: Number(randomCode),
    weather_description: weather.description,
    weather_icon: `https://raw.githubusercontent.com/Makin-Things/weather-icons/refs/heads/main/animated/${weather.slug}.svg`,
  };
};

export const generateMockWeatherData = () => {
  const today = moment();
  const forecast: Record<string, WeatherDay> = {};
  const historical: Record<string, WeatherDay> = {};

  for (let i = -3; i < 4; i++) {
    const date = today.clone().add(i, "days");
    const dateString = date.format("YYYY-MM-DD");
    const { weather_code, weather_description, weather_icon } =
      getRandomWeather();

    const hourlyData = [
      {
        time: "0",
        temperature: Math.floor(Math.random() * 30),
        weather_code,
        weather_icons: [weather_icon],
        weather_descriptions: [weather_description],
        wind_speed: Math.floor(Math.random() * 20),
        pressure: 1000 + Math.floor(Math.random() * 10),
        precip: Math.floor(Math.random() * 10) / 10,
      },
    ];

    if (i > 0) {
      forecast[dateString] = { date: dateString, hourly: hourlyData };
    } else if (i < 0) {
      historical[dateString] = { date: dateString, hourly: hourlyData };
    }
  }

  return { forecast, historical };
};
