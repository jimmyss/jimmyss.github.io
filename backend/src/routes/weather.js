const express = require('express');
const router = express.Router();
const axios = require('axios');

// 获取天气预报
router.get('/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    // 这里使用免费的OpenWeatherMap API，需要注册获取API KEY
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    
    // 处理并格式化天气数据
    const forecast = response.data.list.map(item => ({
      datetime: item.dt_txt,
      temperature: item.main.temp,
      description: item.weather[0].description,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed
    }));

    res.json(forecast);
  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

module.exports = router; 