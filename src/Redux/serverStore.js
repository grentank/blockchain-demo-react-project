import { configureStore } from '@reduxjs/toolkit';
import prevBlockchainReducer from './reducers/prevBlockchainReducer';

const store = configureStore({
  reducer: {
    prevBlockchain: prevBlockchainReducer,
  },
});

export default store;
