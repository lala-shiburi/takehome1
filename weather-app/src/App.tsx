import { useEffect, useMemo, useState } from "react";
import { CurrentWeatherDisplay } from "./components/custom/CurrentWeatherDisplay";
import { ForecastDaySelector } from "./components/custom/ForecastDaySelector";
import { SearchBar } from "./components/custom/SearchBar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { FormattedWeatherDay } from "./types/weather";

import { SkeletonWeatherCard } from "./components/custom/SkeletonWeatherCard";
import { useWeatherData } from "./hooks/useWeatherData";

export const App = () => {
  const [location, setLocation] = useState("Pretoria, Gauteng, South Africa");

  const [displayKey, setDisplayKey] = useState(Date.now());
  const { weather, isLoading, isError, error } = useWeatherData(
    location,
    !!location
  );

  const today = weather ? weather[3] : null;
  const forecastDays = useMemo(() => {
    if (weather) {
      return [...weather.slice(0, 3), ...weather.slice(4)];
    }
    return [];
  }, [weather]);
  const [currentWeather, setCurrentWeather] =
    useState<FormattedWeatherDay | null>(today);
  const handleSearch = (location: string) => {
    setLocation(location);
  };

  useEffect(() => {
    if (weather) {
      setCurrentWeather(weather[3]);
    }
  }, [weather]);
  const handleReset = () => {
    setLocation("Pretoria, Gauteng, South Africa");
    handleDaySelect(today!);
  };

  const handleDaySelect = (day: FormattedWeatherDay) => {
    setCurrentWeather(day);
    setDisplayKey(Date.now());
  };

  return isLoading ? (
    <SkeletonWeatherCard />
  ) : (
    <div className="flex p-6 h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-[500px] shadow-lg">
        {isError ? (
          <div className="p-6 text-center text-red-500 font-medium">
            <p>Something went wrong:</p>
            <p className="text-sm mt-2">
              {(error as Error)?.message || "Unknown error"}
            </p>
          </div>
        ) : (
          <>
            <CardHeader>
              <SearchBar onReset={handleReset} onSearch={handleSearch} />
              <CardTitle className="text-center text-sm font-bold pt-4">
                {location}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentWeather && (
                <CurrentWeatherDisplay
                  weather={currentWeather}
                  displayKey={displayKey.toString()}
                />
              )}
            </CardContent>
            <CardFooter>
              <ForecastDaySelector
                forecast={forecastDays}
                selectedDay={currentWeather}
                onSelectDay={handleDaySelect}
              />
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default App;
