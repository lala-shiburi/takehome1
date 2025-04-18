import { render, screen, fireEvent } from "@testing-library/react";
import { ForecastDaySelector } from "./ForecastDaySelector";
import { FormattedWeatherDay } from "../../types/weather";
import { describe, expect, it, vi } from "vitest";

const mockForecast: FormattedWeatherDay[] = [
  {
    date: "2025-04-18",
    displayDay: "FRI",
    temperature: 17,
    weather_code: 1003,
    weather_icons: ["https://example.com/cloudy.png"],
    weather_descriptions: ["Cloudy"],
    wind_speed: 10,
    pressure: 1012,
    precip: 0,
  },
  {
    date: "2025-04-19",
    displayDay: "SAT",
    temperature: 20,
    weather_code: 1000,
    weather_icons: ["https://example.com/sunny.png"],
    weather_descriptions: ["Sunny"],
    wind_speed: 5,
    pressure: 1015,
    precip: 0,
  },
];

describe("ForecastDaySelector", () => {
  it("renders forecast days", () => {
    render(
      <ForecastDaySelector
        forecast={mockForecast}
        onSelectDay={() => {}}
        selectedDay={null}
      />
    );

    expect(screen.getByText("FRI")).toBeInTheDocument();
    expect(screen.getByText("SAT")).toBeInTheDocument();
    expect(screen.getByText("17°C")).toBeInTheDocument();
    expect(screen.getByText("20°C")).toBeInTheDocument();
  });

  it("highlights the selected day", () => {
    render(
      <ForecastDaySelector
        forecast={mockForecast}
        onSelectDay={() => {}}
        selectedDay={mockForecast[1]}
      />
    );

    const selectedButton = screen.getByLabelText("Weather forecast for SAT");
    expect(selectedButton).toHaveClass("bg-blue-100");
    expect(selectedButton).toHaveClass("border-blue-500");
  });

  it("calls onSelectDay when a day is clicked", () => {
    const mockFn = vi.fn();

    render(
      <ForecastDaySelector
        forecast={mockForecast}
        onSelectDay={mockFn}
        selectedDay={null}
      />
    );

    const fridayBtn = screen.getByLabelText("Weather forecast for FRI");
    fireEvent.click(fridayBtn);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(mockForecast[0]);
  });

  it("shows empty state when forecast is empty", () => {
    render(
      <ForecastDaySelector
        forecast={[]}
        onSelectDay={() => {}}
        selectedDay={null}
      />
    );

    expect(screen.getByText("No forecast data available")).toBeInTheDocument();
  });
});
