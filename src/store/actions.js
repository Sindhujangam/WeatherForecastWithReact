// src/store/actions.js

export const SET_CITY = 'SET_CITY';
export const SET_WEATHER = 'SET_WEATHER';
export const SET_CITY_LIST = 'SET_CITY_LIST';
export const CLEAR_WEATHER = 'CLEAR_WEATHER';

export const setCity = (city) => ({
  type: SET_CITY,
  payload: city,
});

export const setWeather = (weather) => ({
  type: SET_WEATHER,
  payload: weather,
});

export const setCityList = (cityList) => ({
  type: SET_CITY_LIST,
  payload: cityList,
});

export const clearWeather = () => ({
  type: CLEAR_WEATHER,
});

// Action to fetch weather by city ID
export const fetchWeather = (cityId) => {
  return (dispatch) => {
    dispatch(clearWeather()); // Clear previous weather data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=3a0aab383df26c3bb7b99cedaedd0e18&units=metric`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.weather) {
          dispatch(setWeather(data));
        } else {
          console.error('Weather data not found:', data);
        }
      })
      .catch((error) => console.error('Error fetching weather:', error));
  };
};

// Action to fetch weather by coordinates
export const fetchWeatherByCoords = (latitude, longitude) => {
  return (dispatch) => {
    dispatch(clearWeather()); // Clear previous weather data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3a0aab383df26c3bb7b99cedaedd0e18&units=metric`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.weather) {
          dispatch(setWeather(data));
        } else {
          console.error('Weather data not found:', data);
        }
      })
      .catch((error) => console.error('Error fetching weather:', error));
  };
};
