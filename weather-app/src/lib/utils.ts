import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormattedWeatherDay, WeatherData, WeatherDay } from "../types/weather";
import { weatherCodes } from "./constants";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import moment from "moment";

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

// const getRandomWeather = () => {
//   const weatherCodesArray = Object.keys(weatherCodes);
//   const randomCode =
//     weatherCodesArray[Math.floor(Math.random() * weatherCodesArray.length)];
//   const weather = weatherCodes[randomCode];

//   return {
//     weather_code: randomCode,
//     weather_description: weather.description,
//     weather_icon: `https://raw.githubusercontent.com/Makin-Things/weather-icons/refs/heads/main/animated/${weather.slug}.svg`, // Example icon URL pattern
//   };
// };
const getRandomWeather = () => {
  const weatherCodesArray = Object.keys(weatherCodes);
  const randomCode = weatherCodesArray[
    Math.floor(Math.random() * weatherCodesArray.length)
  ] as keyof typeof weatherCodes;
  const weather = weatherCodes[randomCode];

  return {
    weather_code: Number(randomCode),
    weather_description: weather.description,
    weather_icon: `https://raw.githubusercontent.com/Makin-Things/weather-icons/refs/heads/main/animated/${weather.slug}.svg`,
  };
};

export const generateMockWeatherData = () => {
  const today = moment(); // Get today's date
  const forecast: Record<string, WeatherDay> = {};
  const historical: Record<string, WeatherDay> = {};

  // Generate forecast and historical data for the last 5 days and next 5 days
  for (let i = -3; i < 4; i++) {
    const randomWeather = getRandomWeather();
    const date = today.clone().add(i, "days"); // Get the date for the next i days
    const dateString = date.format("YYYY-MM-DD");

    // Generate a single hourly data entry for the specific time (e.g., "0")
    const hourlyData = [
      {
        time: "0", // For simplicity, always using time "0" here, you can adjust if you want specific hours
        temperature: Math.floor(Math.random() * 30), // Random temperature
        weather_code: randomWeather.weather_code, // Example weather code (Clear)
        weather_icons: [
          randomWeather.weather_icon, // Example sunny icon
        ],
        weather_descriptions: [randomWeather.weather_description], // Example description
        wind_speed: Math.floor(Math.random() * 20), // Random wind speed
        pressure: Math.floor(Math.random() * 10) + 1000, // Random pressure value between 1000 and 1010 mb
        precip: Math.floor(Math.random() * 10) / 10, // Random precipitation value between 0.0 and 1.0 mm
      },
    ];

    // Forecast Data (Future dates)
    if (i > 0) {
      forecast[dateString] = {
        date: dateString,
        hourly: hourlyData,
      };
    }

    // Historical Data (Past dates)
    if (i < 0) {
      historical[dateString] = {
        date: dateString,
        hourly: hourlyData,
      };
    }
  }

  return { forecast, historical };
};

// Example usage of mock data
const { forecast, historical } = generateMockWeatherData();
console.log("Forecast:", forecast);
console.log("Historical:", historical);
