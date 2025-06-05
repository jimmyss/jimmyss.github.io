import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

interface WeatherData {
  datetime: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [city, setCity] = useState('Beijing'); // 默认城市
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`/api/weather/forecast/${city}`);
      setWeatherData(response.data);
    } catch (err) {
      setError('获取天气数据失败');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">天气预报</h2>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="Beijing">北京</option>
          <option value="Shanghai">上海</option>
          <option value="Guangzhou">广州</option>
          <option value="Shenzhen">深圳</option>
        </select>
      </div>

      {loading && <div className="text-center">加载中...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weatherData.slice(0, 6).map((weather, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="text-lg font-semibold">
                {format(new Date(weather.datetime), 'MM/dd HH:mm')}
              </div>
              <div className="text-3xl font-bold my-2">
                {Math.round(weather.temperature)}°C
              </div>
              <div className="text-gray-600">{weather.description}</div>
              <div className="mt-2 text-sm text-gray-500">
                <div>湿度: {weather.humidity}%</div>
                <div>风速: {weather.windSpeed} m/s</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather; 