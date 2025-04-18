import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "../api/services/weatherService";

export const useCurrentWeather = (location: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["weather", location],
    queryFn: () => fetchCurrentWeather(location),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minut
    refetchOnWindowFocus: false,
  });
};
