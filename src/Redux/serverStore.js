import { configureStore } from '@reduxjs/toolkit';
import prevBlockchainReducer from './reducers/prevBlockchainReducer';
import prevBlockchainReducerPeerB from './reducers/prevBlockchainReducerPeerB';
import prevBlockchainReducerPeerC from './reducers/prevBlockchainReducerPeerC';

const store = configureStore({
  reducer: {
    prevBlockchain: prevBlockchainReducer,
    prevBlockchainPeerB: prevBlockchainReducerPeerB,
    prevBlockchainPeerC: prevBlockchainReducerPeerC,
  },
});

export default store;
