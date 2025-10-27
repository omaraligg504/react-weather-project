import { useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "17d9ec4f3c1523c958f6dfe404d38206";

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError("City not found or error fetching data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Weather Forecast
      </h2>

      <div className="mb-6 flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-gray-400"
            onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          onClick={fetchWeather}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 hover:opacity-90"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Fetching weather data...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-6 px-4 bg-red-50 rounded-xl border border-red-100">
          <svg
            className="w-12 h-12 text-red-400 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {weather && !loading && (
        <div className="text-center bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {weather.name}
          </h3>

          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-400 rounded-full filter blur-xl opacity-20"></div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="relative w-32 h-32 mx-auto"
            />
          </div>

          <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            {Math.round(weather.main.temp)}°C
          </p>

          <p className="text-lg text-gray-700 capitalize mb-6">
            {weather.weather[0].description}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-xl">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14a7 7 0 01-7 7m7-7a7 7 0 00-7-7m7 7H3m14-7H3"
              />
            </svg>
            <p className="text-sm font-medium text-blue-700">Humidity</p>
            <p className="text-xl font-semibold text-blue-600">
              {weather.main.humidity}%
            </p>
          </div>
        </div>
      )}

      {!weather && !loading && !error && (
        <div className="text-center py-4 text-gray-500">
          <p>Enter a city name to get weather information</p>
          <p className="text-sm mt-2 text-gray-400">
            Note: Add your OpenWeatherMap API key in WeatherCard.tsx
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
