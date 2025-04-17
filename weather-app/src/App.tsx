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

export const App = () => {
  return (
    <div>
      <Card>
        {" "}
        <CardHeader>
          <SearchBar />
          <CardTitle>Pretoria,Gauteng,South Africa</CardTitle>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <CurrentWeatherDisplay />
        </CardContent>
        <CardFooter>
          <ForecastDaySelector />
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
