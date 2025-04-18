const BASE_URL = import.meta.env.VITE_WEATHERSTACK_API_URL;
// const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;

interface WeatherResponse {
  current: {
    temperature: number;
    weather_descriptions: string[];
    weather_icons: string[];
  };
  location?: {
    name: string;
    region: string;
    country: string;
  };
  error?: {
    info: string;
  };
}

export const fetchCurrentWeather = async (
  city: string
): Promise<WeatherResponse> => {
  const response = await fetch(
    `${BASE_URL}/current?access_key=${API_KEY}&query=${"Pretoria"}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: WeatherResponse = await response.json();

  if (data.error) {
    throw new Error(data.error.info || "Failed to fetch weather data");
  }

  return data;
};

export const fetchForecast = async (city: string): Promise<any> => {};
