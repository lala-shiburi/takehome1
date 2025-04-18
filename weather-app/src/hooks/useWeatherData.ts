import { useMemo } from "react";
import { useCurrentWeather } from "./useCurrentWeather";
import { formatWeatherData, generateMockWeatherData } from "../lib/utils";

export const useWeatherData = (location: string, enabled: boolean) => {
  const { data, isLoading, isError, error } = useCurrentWeather(
    location,
    enabled
  );

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
