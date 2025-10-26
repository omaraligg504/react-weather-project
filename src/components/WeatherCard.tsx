import { useState } from 'react';

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
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'YOUR_API_KEY'; // User needs to add their API key here

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('City not found or error fetching data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Weather Widget</h2>
      
      {/* Search Input */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-4 text-gray-600">
          Fetching weather...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-4 text-red-600">
          {error}
        </div>
      )}

      {/* Weather Display */}
      {weather && !loading && (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{weather.name}</h3>
          
          {/* Weather Icon */}
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="mx-auto w-24 h-24"
          />
          
          {/* Temperature */}
          <p className="text-4xl font-bold text-blue-600 mb-2">
            {Math.round(weather.main.temp)}°C
          </p>
          
          {/* Description */}
          <p className="text-lg text-gray-700 capitalize mb-4">
            {weather.weather[0].description}
          </p>
          
          {/* Humidity */}
          <div className="p-3 bg-blue-50 rounded-md border border-blue-200 inline-block">
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="text-xl font-semibold text-blue-600">
              {weather.main.humidity}%
            </p>
          </div>
        </div>
      )}

      {/* Initial State */}
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
