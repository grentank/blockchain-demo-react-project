import { GENERATE_TRANSACTIONS_BLOCKCHAIN, MODIFY_TRANSACTIONS_BLOCKCHAIN, SET_MINING_TRANSACTIONS_BLOCK } from '../types';

const transactionsBlockchainReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GENERATE_TRANSACTIONS_BLOCKCHAIN:
      return payload;
    case MODIFY_TRANSACTIONS_BLOCKCHAIN:
      return payload;
    case SET_MINING_TRANSACTIONS_BLOCK:
      return state.map((block) => (block.id === payload.id
        ? { ...block, meta: { ...block.meta, mining: true } }
        : block));
    default:
      return state;
  }
};

export default transactionsBlockchainReducer;
