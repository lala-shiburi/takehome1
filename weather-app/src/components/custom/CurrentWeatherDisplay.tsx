import { CurrentWeather } from "../../types/weather";

type CurrentWeatherDisplayProps = {
  weather: CurrentWeather;
};

export const CurrentWeatherDisplay = ({
  weather,
}: CurrentWeatherDisplayProps) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-center">
        <div className="flex flex-col items-center">
          <img
            src={weather.weather_icons[0]}
            alt={weather.weather_descriptions[0]}
            className="w-16 h-16"
          />
          <p className="capitalize text-lg mt-1">
            {weather.weather_descriptions[0]}
          </p>
        </div>
        <div className="text-5xl font-light">{weather.temperature}°C</div>
        <div className="mt-4 sm:mt-0 text-sm sm:text-right">
          <p>Wind: {weather.wind_speed} kmph</p>
          <p>Precip: {weather.precip} mm</p>
          <p>Pressure: {weather.pressure} mb</p>
        </div>
      </div>
    </div>
  );
};
