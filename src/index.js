import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change in import
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
