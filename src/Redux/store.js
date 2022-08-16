import { configureStore } from '@reduxjs/toolkit';
import prevBlockchainReducer from './reducers/prevBlockchainReducer';

const store = configureStore({
  reducer: {
    prevBlockchain: prevBlockchainReducer,
  },
  preloadedState: window.__PRELOADED_STATE__,
});

export default store;
