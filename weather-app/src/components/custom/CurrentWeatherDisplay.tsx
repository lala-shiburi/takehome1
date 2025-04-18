import { motion, AnimatePresence } from "framer-motion";
import { FormattedWeatherDay } from "../../types/weather";

type CurrentWeatherDisplayProps = {
  weather: FormattedWeatherDay;
  displayKey?: string;
};

export const CurrentWeatherDisplay = ({
  weather,

  displayKey,
}: CurrentWeatherDisplayProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={displayKey || weather.date}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          {/* Weather Icon & Description */}
          <div className="flex flex-col items-center sm:items-start">
            <motion.div
              className="w-14 h-14 sm:w-16 sm:h-16"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <img
                src={weather.weather_icons[0]}
                alt={weather.weather_descriptions?.[0] || "Weather icon"}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <p className="capitalize text-sm font-bold">
              {weather.weather_descriptions?.[0]}
            </p>
          </div>

          {/* Temperature */}
          <motion.div
            className="text-[32px]  order-first sm:order-none"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {weather.temperature}°C
          </motion.div>

          {/* Weather Details */}
          <div className="grid grid-cols-1 sm:block gap-x-4 gap-y-1 text-sm sm:text-right">
            <p>Wind: {weather.wind_speed} kmph</p>
            <p>Precip: {weather.precip} mm</p>
            <p>Pressure: {weather.pressure} mb</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
