# ☀️ Weather App

A simple, responsive weather application built with React, TailwindCSS, and custom weather data formatting. Easily search for a location, view current weather, and explore forecasts over several days.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/lala-shiburi/takehome1.git
cd weather-app

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Visit `http://localhost:5173` to view the app.

---

## 🧠 Features

- 🔍 Location search bar
- 🌡️ Current weather display
- 📅 Forecast selection for previous and upcoming days
- 💨 Weather attributes: temperature, wind, pressure, precipitation, and conditions
- 🧪 Mock data support for development and testing
- 🎨 Styled with TailwindCSS
- ⚡️ Fast performance with Vite

---

## 🛠️ Tech Stack

- **React** – Functional components & hooks
- **TypeScript** – Type safety throughout
- **Tailwind CSS** – Utility-first styling
- **Vitest** – Unit testing framework
- **clsx + tailwind-merge** – Clean className management
- **moment.js** – Date handling
- **Custom hooks** – Reusable logic for fetching and transforming weather data

---

## 📐 Design Decisions & Trade-offs

### Component Structure

Each UI responsibility is isolated into a self-contained component (`SearchBar`, `CurrentWeatherDisplay`, etc.) to maintain readability and reusability.

### Data Handling

Weather data is normalized through a `formatWeatherData` utility to keep components free of raw API structures and parsing logic.

### Mock Data Support

To speed up development and avoid rate-limiting or network issues, mock weather data can be generated programmatically. You will also see
that there is mock data being used because weatherstack free tier doesn't support forecast or historical data so that's why it's being used there.

### Minimal Dependencies

No global state management is used as the app's scope is local and self-contained. I couldn't justify using anything more robust

---

## 🧪 Running Tests

```bash
pnpm test
```

Includes tests for:

- unit tests for components
- Loading state
- Error handling
- Weather data rendering
- User interaction (search, select day)

---

## 📄 License

MIT

---
