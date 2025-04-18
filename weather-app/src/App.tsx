import { CurrentWeatherDisplay } from "./components/custom/CurrentWeatherDisplay";
import { ForecastDaySelector } from "./components/custom/ForecastDaySelector";
import { SearchBar } from "./components/custom/SearchBar";
import { CurrentWeather } from "./types/weather";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import mock from "./api/mock.json";

export const App = () => {
  const { current } = mock;
  const {
    observation_time,
    temperature,
    weather_code,
    weather_icons,
    weather_descriptions,
    wind_speed,
    pressure,
    precip,
  } = current;
  const CurrentWeather: CurrentWeather = {
    observation_time,
    temperature,
    weather_code,
    weather_icons,
    weather_descriptions,
    wind_speed,
    pressure,
    precip,
  };
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
          <ForecastDaySelector />
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
