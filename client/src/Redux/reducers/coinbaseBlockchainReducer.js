import { GENERATE_COINBASE_BLOCKCHAIN, MODIFY_COINBASE_BLOCKCHAIN, SET_MINING_COINBASE_BLOCK } from '../types';

const coinbaseBlockchainReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GENERATE_COINBASE_BLOCKCHAIN:
      return payload;
    case MODIFY_COINBASE_BLOCKCHAIN:
      return payload;
    case SET_MINING_COINBASE_BLOCK:
      return state.map((block) => (block.id === payload.id
        ? { ...block, meta: { ...block.meta, mining: true } }
        : block));
    default:
      return state;
  }
};

export default coinbaseBlockchainReducer;
