export const CurrentWeatherDisplay = () => {
  return (
    <div>
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
  );
};
