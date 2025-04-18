import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "../api/services/weatherService";

export const useCurrentWeather = (city: string) => {
  return useQuery({
    queryKey: ["current-weather", city],
    queryFn: () => fetchCurrentWeather(city),
    enabled: !!city, // only fetch if city is provided
    staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
  });
};
