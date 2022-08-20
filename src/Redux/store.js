import { configureStore } from '@reduxjs/toolkit';
import coinbaseBlockchainReducer from './reducers/coinbaseBlockchainReducer';
import prevBlockchainReducer from './reducers/prevBlockchainReducer';
import prevBlockchainReducerPeerB from './reducers/prevBlockchainReducerPeerB';
import prevBlockchainReducerPeerC from './reducers/prevBlockchainReducerPeerC';
import tokensBlockchainReducer from './reducers/tokensBlockchainReducer';
import transactionsBlockchainReducer from './reducers/transactionsBlockchainReducer';

const store = configureStore({
  reducer: {
    prevBlockchain: prevBlockchainReducer,
    prevBlockchainPeerB: prevBlockchainReducerPeerB,
    prevBlockchainPeerC: prevBlockchainReducerPeerC,
    tokensBlockchain: tokensBlockchainReducer,
    coinbaseBlockchain: coinbaseBlockchainReducer,
    transactionsBlockchain: transactionsBlockchainReducer,
  },
  preloadedState: window.__PRELOADED_STATE__,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ // нужно потом отключить
    serializableCheck: false,
  }),
});

export default store;
