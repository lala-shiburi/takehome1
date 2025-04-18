import { useMemo } from "react";
import { useCurrentWeather } from "./useCurrentWeather";
import {
  formatWeatherData,
  generateMockWeatherData,
  getWeatherIconUrl,
} from "../lib/utils";
import { weatherCodes } from "../lib/constants";

export const useWeatherData = (location: string, enabled: boolean) => {
  const { data, isLoading, isError, error } = useCurrentWeather(
    location,
    enabled
  );

  const { forecast, historical } = useMemo(() => generateMockWeatherData(), []);

  const fullData = useMemo(() => {
    if (!data) return undefined;
    const iconUrl = getWeatherIconUrl(
      data.current.weather_code.toString() as keyof typeof weatherCodes
    );

    if (iconUrl) {
      data.current.weather_icons = [iconUrl];
    }
    return {
      ...data,
      forecast,
      historical,
    };
  }, [data, forecast, historical]);

  const formattedData = useMemo(() => {
    if (!fullData) return undefined;
    return formatWeatherData(fullData);
  }, [fullData]);

  return {
    isLoading,
    isError,
    error,
    weather: formattedData,
  };
};
