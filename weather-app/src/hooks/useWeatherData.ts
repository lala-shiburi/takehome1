import { useMemo } from "react";
import { useCurrentWeather } from "./useCurrentWeather";
import { formatWeatherData, generateMockWeatherData } from "../lib/utils";

export const useWeatherData = () => {
  const { data, isLoading, isError, error } = useCurrentWeather("Pretoria");

  const { forecast, historical } = useMemo(() => generateMockWeatherData(), []);

  const fullData = useMemo(() => {
    if (!data) return undefined;

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
