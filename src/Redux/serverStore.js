import { configureStore } from '@reduxjs/toolkit';
import coinbaseBlockchainReducer from './reducers/coinbaseBlockchainReducer';
import prevBlockchainReducer from './reducers/prevBlockchainReducer';
import prevBlockchainReducerPeerB from './reducers/prevBlockchainReducerPeerB';
import prevBlockchainReducerPeerC from './reducers/prevBlockchainReducerPeerC';
import tokensBlockchainReducer from './reducers/tokensBlockchainReducer';

const store = configureStore({
  reducer: {
    prevBlockchain: prevBlockchainReducer,
    prevBlockchainPeerB: prevBlockchainReducerPeerB,
    prevBlockchainPeerC: prevBlockchainReducerPeerC,
    tokensBlockchain: tokensBlockchainReducer,
    coinbaseBlockchain: coinbaseBlockchainReducer,
  },
});

export default store;
