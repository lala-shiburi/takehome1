import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export const App = () => {
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
    <div>
      <Card>
        {" "}
        <CardHeader>
          <CardTitle>Pretoria,Gauteng,South Africa</CardTitle>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <div className=" ">
            <div className="flex items-center justify-between  gap-4 text-center ">
              <div className="flex flex-col items-center">
                <div className="text-6xl">{"🌙"}</div>
                <p className="capitalize text-lg mt-1">{"Clear"}</p>
              </div>
              <div className="text-5xl font-light">{15}°c</div>

              <div className="mt-4 sm:mt-0 text-sm sm:text-right">
                <p>Wind: 18 kmph</p>
                <p>Precip: 0.1 mm</p>
                <p>Pressure: 1026 mb</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
