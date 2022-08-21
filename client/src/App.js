import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App2 from './components/App2';
import store from './Redux/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App2 />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
