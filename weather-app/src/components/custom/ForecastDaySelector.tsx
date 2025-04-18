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
    // <div className="mt-6 overflow-x-auto">
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 text-center w-full">
      {forecast.map((day) => (
        <button
          key={day.date}
          onClick={() => onSelectDay(day)}
          data-testid={`forecast-day-${day.displayDay}`}
          className={`
              p-2 rounded-md transition-all duration-300 ease-in-out transform
              min-w-[60px] sm:min-w-0
              ${
                selectedDay?.date === day.date
                  ? "bg-blue-100 border-2 border-blue-500 scale-105"
                  : "bg-white hover:bg-gray-50 border-2 border-transparent"
              }
              hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          aria-label={`Weather forecast for ${day.displayDay}`}
        >
          <div className="text-xs ">{day.displayDay}</div>
          <div className="flex justify-center items-center py-1">
            <img
              src={day.weather_icons[0]}
              className="w-5 h-5 sm:w-6 sm:h-6"
              alt={day.weather_descriptions?.[0] || "Weather icon"}
            />
          </div>
          <div className="text-xs ">{day.temperature}°C</div>
        </button>
      ))}
    </div>
    // </div>
  );
};
