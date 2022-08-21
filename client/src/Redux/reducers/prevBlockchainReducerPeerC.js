import { GENERATE_PREV_BLOCKCHAIN_PEER_C, MODIFY_PREV_BLOCKCHAIN_PEER_C, SET_MINING_PREV_BLOCK_PEER_C } from '../types';

const prevBlockchainReducerPeerC = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GENERATE_PREV_BLOCKCHAIN_PEER_C:
      return payload;
    case MODIFY_PREV_BLOCKCHAIN_PEER_C:
      return payload;
    case SET_MINING_PREV_BLOCK_PEER_C:
      return state.map((block) => (block.id === payload.id
        ? { ...block, meta: { ...block.meta, mining: true } }
        : block));
    default:
      return state;
  }
};

export default prevBlockchainReducerPeerC;
