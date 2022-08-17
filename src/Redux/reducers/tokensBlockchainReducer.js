import { GENERATE_TOKEN_BLOCKCHAIN, MODIFY_TOKEN_BLOCKCHAIN, SET_MINING_TOKEN_BLOCK } from '../types';

const tokensBlockchainReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GENERATE_TOKEN_BLOCKCHAIN:
      return payload;
    case MODIFY_TOKEN_BLOCKCHAIN:
      return payload;
    case SET_MINING_TOKEN_BLOCK:
      return state.map((block) => (block.id === payload.id
        ? { ...block, meta: { ...block.meta, mining: true } }
        : block));
    default:
      return state;
  }
};

export default tokensBlockchainReducer;
