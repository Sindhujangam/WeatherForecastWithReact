// src/components/GeolocationComponent.js

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeatherByCoords } from '../store/actions'; // Ensure this import is correct

function GeolocationComponent() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLoading(false);

          // Fetch weather data based on location
          dispatch(fetchWeatherByCoords(latitude, longitude));
        },
        (error) => {
          setError(`Error: ${error.message}`);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading your location...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
    </div>
  );
}

export default GeolocationComponent;
