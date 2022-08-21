import { GENERATE_PREV_BLOCKCHAIN_PEER_B, MODIFY_PREV_BLOCKCHAIN_PEER_B, SET_MINING_PREV_BLOCK_PEER_B } from '../types';

const prevBlockchainReducerPeerB = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GENERATE_PREV_BLOCKCHAIN_PEER_B:
      return payload;
    case MODIFY_PREV_BLOCKCHAIN_PEER_B:
      return payload;
    case SET_MINING_PREV_BLOCK_PEER_B:
      return state.map((block) => (block.id === payload.id
        ? { ...block, meta: { ...block.meta, mining: true } }
        : block));
    default:
      return state;
  }
};

export default prevBlockchainReducerPeerB;
