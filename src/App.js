import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CityForm from './components/CityForm';
import WeatherInfo from './components/WeatherInfo';
import GeolocationComponent from './components/GeolocationCompo'; // Import GeolocationComponent
import { setCityList } from './store/actions';
import './App.css'; 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/city.list.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then((data) => dispatch(setCityList(data)))
      .catch((error) => console.error('Error loading city list:', error));
  }, [dispatch]);

  return (
    <div className="container">
      <GeolocationComponent /> {/* Add GeolocationComponent */}
      <CityForm />
      <WeatherInfo />
    </div>
  );
}

export default App;
