import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`/api/weather?location=${location}`);
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError('Location not found or an error occurred.');
      setWeatherData(null);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Fetch Weather</button>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.temperature}</p>
          <p>Humidity: {weatherData.humidity}</p>
          {/* Display other weather information as needed */}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
