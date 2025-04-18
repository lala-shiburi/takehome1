import { useState } from "react";
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
import mock from "./api/mock.json";
import { formatWeatherData } from "./lib/utils";
import { FormattedWeatherDay } from "./types/weather";

export const App = () => {
  const formattedData = formatWeatherData(mock);
  const today = formattedData[3];

  const [location, setLocation] = useState("Pretoria, Gauteng, South Africa");
  const [currentWeather, setCurrentWeather] =
    useState<FormattedWeatherDay>(today);
  const [displayKey, setDisplayKey] = useState(Date.now());

  const forecastDays = [
    ...formattedData.slice(0, 3),
    ...formattedData.slice(4),
  ];

  const handleSearch = (city: string) => {
    setLocation(city);
  };

  const handleReset = () => {
    setLocation("Pretoria, Gauteng, South Africa");
    handleDaySelect(today);
  };

  const handleDaySelect = (day: FormattedWeatherDay) => {
    setCurrentWeather(day);
    setDisplayKey(Date.now());
  };

  return (
    <div className="flex p-6 h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-[500px] shadow-lg">
        <CardHeader>
          <SearchBar onReset={handleReset} onSearch={handleSearch} />
          <CardTitle className="text-center text-sm font-bold pt-4">
            {location}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <CurrentWeatherDisplay weather={currentWeather} key={displayKey} />
        </CardContent>
        <CardFooter>
          <ForecastDaySelector
            forecast={forecastDays}
            selectedDay={currentWeather}
            onSelectDay={handleDaySelect}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
