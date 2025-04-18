import { motion, AnimatePresence } from "framer-motion";
import { FormattedWeatherDay } from "../../types/weather";

type CurrentWeatherDisplayProps = {
  weather: FormattedWeatherDay;
  key?: number;
};

export const CurrentWeatherDisplay = ({
  weather,
  key,
}: CurrentWeatherDisplayProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key || weather.date}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between gap-4 text-center"
      >
        <div className="flex flex-col items-center">
          <motion.img
            src={weather.weather_icons[0]}
            alt={weather.weather_descriptions?.[0] || "Weather icon"}
            className="w-16 h-16"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          />
          <p className="capitalize text-lg mt-1">
            {weather.weather_descriptions?.[0]}
          </p>
        </div>
        <motion.div
          className="text-5xl font-light"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {weather.temperature}°C
        </motion.div>
        <div className="mt-4 sm:mt-0 text-sm sm:text-right space-y-1">
          <p>Wind: {weather.wind_speed} kmph</p>
          <p>Precip: {weather.precip} mm</p>
          <p>Pressure: {weather.pressure} mb</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
