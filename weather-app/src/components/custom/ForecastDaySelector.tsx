import { FormattedWeatherDay } from "../../types/weather";

export const ForecastDaySelector = ({
  forecast,
  onSelectDay,
  selectedDay,
}: {
  forecast: FormattedWeatherDay[];
  onSelectDay: (day: FormattedWeatherDay) => void;
  selectedDay?: FormattedWeatherDay | null;
}) => {
  if (forecast.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500">
        No forecast data available
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-6  gap-4 text-center">
        {forecast.map((day) => (
          <button
            key={day.date}
            onClick={() => onSelectDay(day)}
            className={`p-2 rounded-md transition-all ${
              selectedDay?.date === day.date
                ? "bg-blue-100 border-2 border-blue-500"
                : "bg-white hover:bg-gray-50 border-2 border-transparent"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label={`Weather forecast for ${day.displayDay}`}
          >
            <div className="text-sm font-semibold ">{day.displayDay}</div>
            <div className="flex justify-center items-center ">
              <img
                src={day.weather_icons[0]}
                className="w-6 h-6"
                alt={day.weather_descriptions?.[0] || "Weather icon"}
              />
            </div>
            <div className="text-sm ">{day.temperature}°C</div>
          </button>
        ))}
      </div>
    </div>
  );
};
