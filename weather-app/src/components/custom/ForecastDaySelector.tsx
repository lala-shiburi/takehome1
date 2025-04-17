export const ForecastDaySelector = () => {
  const mockForecast = [
    {
      day: "FRI",
      icon: "☁️",
      temp: "17°C",
      details: "Cloudy with light breeze",
    },
    { day: "SAT", icon: "☁️", temp: "18°C", details: "Overcast" },
    { day: "SUN", icon: "☀️", temp: "20°C", details: "Sunny and warm" },
    { day: "MON", icon: "☀️", temp: "21°C", details: "Sunny" },
    { day: "TUE", icon: "☀️", temp: "22°C", details: "Clear skies" },
  ];
  return (
    <div className="mt-6">
      <div className="grid grid-cols-5 gap-4 text-center">
        {mockForecast.map((day, index) => (
          <button
            key={index}
            onClick={() => console.log(day)}
            className={`p-2 rounded-md`}
          >
            <div className="text-sm font-semibold">{day.day}</div>
            <div className="text-2xl">{day.icon}</div>
            <div className="text-sm">{day.temp}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
