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

export const App = () => {
  const formattedData = formatWeatherData(mock);
  const today = formattedData[3];

  const [location, setLocation] = useState("Pretoria, Gauteng, South Africa");
  const [currentWeather, setCurrentWeather] = useState(today);

  const forecastDays = [
    ...formattedData.slice(0, 3),
    ...formattedData.slice(4),
  ];

  const handleSearch = (city: string) => {
    setLocation(city);
  };

  const handleReset = () => {
    setLocation("Pretoria, Gauteng, South Africa");
    setCurrentWeather(today);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <SearchBar onReset={handleReset} onSearch={handleSearch} />
          <CardTitle>{location}</CardTitle>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <CurrentWeatherDisplay weather={currentWeather} />
        </CardContent>
        <CardFooter>
          <ForecastDaySelector
            forecast={forecastDays}
            selectedDay={currentWeather}
            onSelectDay={setCurrentWeather}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
