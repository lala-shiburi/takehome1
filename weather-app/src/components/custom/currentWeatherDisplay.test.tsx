import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CurrentWeatherDisplay } from "./CurrentWeatherDisplay";
import type { FormattedWeatherDay } from "../../types/weather";

const mockWeather: FormattedWeatherDay = {
  date: "2025-04-18",
  displayDay: "Today",
  temperature: 20,
  weather_code: 113,
  weather_icons: [
    "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png",
  ],
  weather_descriptions: ["Clear"],
  wind_speed: 15,
  pressure: 1015,
  precip: 0.2,
};

describe("CurrentWeatherDisplay", () => {
  it("renders all weather information correctly", () => {
    render(<CurrentWeatherDisplay weather={mockWeather} />);

    // Test weather icon
    const weatherIcon = screen.getByRole("img", { name: "Clear" });
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute("src", mockWeather.weather_icons[0]);

    // Test weather description
    expect(
      screen.getByText(mockWeather.weather_descriptions[0])
    ).toBeInTheDocument();

    // Test temperature
    expect(
      screen.getByText(`${mockWeather.temperature}°C`)
    ).toBeInTheDocument();

    // Test weather metrics
    expect(
      screen.getByText(`Wind: ${mockWeather.wind_speed} kmph`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`Precip: ${mockWeather.precip} mm`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`Pressure: ${mockWeather.pressure} mb`)
    ).toBeInTheDocument();
  });
});
