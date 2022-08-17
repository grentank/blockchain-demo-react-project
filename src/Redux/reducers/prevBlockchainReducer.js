import hashIsValid from '../../utils/hashIsValid';
import { GENERATE_PREV_BLOCKCHAIN, MODIFY_PREV_BLOCKCHAIN, SET_MINING_PREV_BLOCK } from '../types';

const prevBlockchainReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GENERATE_PREV_BLOCKCHAIN:
      return payload;
    case MODIFY_PREV_BLOCKCHAIN:
      return payload;
    case SET_MINING_PREV_BLOCK:
      return state.map((block) => (block.id === payload.id
        ? { ...block, meta: { ...block.meta, mining: true } }
        : block));
    default:
      return state;
  }
};

export default prevBlockchainReducer;
