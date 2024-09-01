
import { SET_CITY, SET_WEATHER, SET_CITY_LIST, CLEAR_WEATHER } from './actions';

const initialState = {
  city: '',
  weather: null,
  cityList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CITY:
      return { ...state, city: action.payload };
    case SET_WEATHER:
      return { ...state, weather: action.payload };
    case CLEAR_WEATHER:
      return { ...state, weather: null };
    case SET_CITY_LIST:
      return { ...state, cityList: action.payload };
    default:
      return state;
  }
};

export default reducer;
