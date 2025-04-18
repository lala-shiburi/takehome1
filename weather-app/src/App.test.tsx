import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import * as useWeatherDataHook from "./hooks/useWeatherData";
import { FormattedWeatherDay } from "./types/weather";

// Mock data
const mockWeather: FormattedWeatherDay[] = Array.from({ length: 7 }).map(
  (_, i) => ({
    date: `2024-04-${i + 10}`,
    displayDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][i],
    temperature: 20 + i,
    weather_code: 113,
    weather_icons: ["https://example.com/icon.png"],
    weather_descriptions: ["Sunny"],
    wind_speed: 10,
    pressure: 1010,
    precip: 0.2,
  })
);

// Mock useWeatherData
vi.mock("./hooks/useWeatherData", () => {
  return {
    useWeatherData: vi.fn(),
  };
});

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders weather data and handles user interaction", async () => {
    (
      useWeatherDataHook.useWeatherData as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      weather: mockWeather,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<App />);

    // Checks
    expect(screen.getByText(/Pretoria/)).toBeInTheDocument();
    expect(screen.getByText(/Sunny/)).toBeInTheDocument();

    // Simulate selecting a forecast day
    const forecastButtons = screen.getAllByTestId(/^forecast-day-/);
    expect(forecastButtons.length).toBeGreaterThan(0);

    fireEvent.click(forecastButtons[0]);

    expect(screen.getByText(/Sunny/)).toBeInTheDocument(); // still shows weather
  });

  it("shows loading state", () => {
    (
      useWeatherDataHook.useWeatherData as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      weather: null,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<App />);
    // Optional: Add test ID to SkeletonWeatherCard for better reliability
    expect(screen.getByTestId("skeleton-weather-card")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (
      useWeatherDataHook.useWeatherData as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      weather: null,
      isLoading: false,
      isError: true,
      error: new Error("Failed to fetch"),
    });

    render(<App />);
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch/)).toBeInTheDocument();
  });
});
