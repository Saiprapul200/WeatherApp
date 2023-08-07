const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/weather', async (req, res) => {
  const { location } = req.query;

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.weatherprovider.com/weather?q=${location}&appid=${apiKey}`
    );

    const weatherData = {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      // Extract other relevant weather information from the response
    };

    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
