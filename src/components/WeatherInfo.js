import React from 'react';
import { useSelector } from 'react-redux';

function WeatherInfo() {
  const weather = useSelector((state) => {
    console.log('Weather state:', state.weather); // Add this line to debug the state
    return state.weather;
  });
  const city = useSelector((state) => state.city);

  if (!weather || !weather.weather || !weather.weather[0]) {
    return <div>Loading...</div>; // Handle the case where weather data is not yet available
  }

  const {
    name: location,
    sys,
    weather: weatherData,
    main,
    rain = {},
    wind = {},
  } = weather;

  const description = weatherData[0].description;
  const temperature = main.temp;
  const temperatureFeel =
    temperature < 0 ? 'freezing cold' : temperature < 10 ? 'cold' : temperature < 20 ? 'cool' : temperature < 30 ? 'warm' : 'hot';

  const detailedDescription = `Currently, it's ${description}. The temperature is ${temperature}°C and feels ${temperatureFeel}. The humidity level is ${main.humidity}%. There has been ${
    rain['1h'] || 0
  }mm of precipitation in the last hour. Wind is blowing at ${wind.speed || 'N/A'} m/s from ${wind.deg || 'N/A'}° direction.`;

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData[0].icon}.png`;

  return (
    <div id="weather-info">
      <div id="weather-icon">
        <img src={iconUrl} alt={description} />
      </div>
      <div id="location" className="bold-text">
        Location: {location}, {sys.country}
      </div>
      <div id="completedescription" dangerouslySetInnerHTML={{ __html: detailedDescription }} />
      <div id="description" className="bold-text">
        Weather: {description}
      </div>
      <div id="temperature" className="bold-text">
        Temperature: {temperature}°C
      </div>
      <div id="humidity" className="bold-text">
        Humidity: {main.humidity}%
      </div>
      <div id="precipitation" className="bold-text">
        Precipitation (last hour): {rain['1h'] || 0}mm
      </div>
    </div>
  );
}

export default WeatherInfo;
