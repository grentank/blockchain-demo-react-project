import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/store';
import App from './App';

// delete window.__PRELOADED_STATE__;

ReactDOMClient.hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <Provider store={store}>
      <App {...window.initState} />
    </Provider>
  </BrowserRouter>,
);
