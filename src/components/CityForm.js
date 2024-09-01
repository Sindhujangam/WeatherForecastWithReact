import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, setCity, clearWeather } from '../store/actions';
import '../App.css'; // Make sure to import the CSS file

function CityForm() {
  const [suggestions, setSuggestions] = useState([]);
  const cityList = useSelector((state) => state.cityList);
  const city = useSelector((state) => state.city); // Ensure this selector is correct
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const value = event.target.value.trim().toLowerCase();
    dispatch(setCity(value));

    if (value) {
      const filteredCities = cityList
        .filter((city) => city.name.toLowerCase().startsWith(value))
        .slice(0, 6); // Limit to 10 suggestions
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    dispatch(setCity(city.name));
    setSuggestions([]);
    dispatch(clearWeather()); // Clear previous weather data
    dispatch(fetchWeather(city.id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Make sure `city` is a string and not undefined
    if (typeof city === 'string') {
      const selectedCity = cityList.find((cityItem) => cityItem.name.toLowerCase() === city.toLowerCase());

      if (selectedCity) {
        dispatch(clearWeather()); // Clear previous weather data
        dispatch(fetchWeather(selectedCity.id));
      } else {
        alert('City not found. Please try another location.');
      }
    } else {
      alert('Invalid city name. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        id="city-input"
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((city) => (
            <div
              key={city.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(city)}
            >
              {city.name}
            </div>
          ))}
        </div>
      )}
      <button type="submit">Get Weather</button>
    </form>
  );
}

export default CityForm;
