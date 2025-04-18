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
import { useState } from "react";

export const App = () => {
  const data = formatWeatherData(mock);

  const today = data[3];
  const [CurrentWeather, setCurrentWeather] = useState(today);

  const forecastDays = [...data.slice(0, 3), ...data.slice(4)];
  console.log(forecastDays);
  return (
    <div>
      <Card>
        {" "}
        <CardHeader>
          <SearchBar />
          <CardTitle>Pretoria,Gauteng,South Africa</CardTitle>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <CurrentWeatherDisplay weather={CurrentWeather} />
        </CardContent>
        <CardFooter>
          <ForecastDaySelector
            forecast={forecastDays}
            onSelectDay={(day) => setCurrentWeather(day)}
            selectedDay={CurrentWeather}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
