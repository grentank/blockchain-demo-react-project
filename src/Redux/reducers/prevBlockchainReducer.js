import { GENERATE_PREV_BLOCKCHAIN, MODIFY_PREV_BLOCKCHAIN } from '../types';

const prevBlockchainReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GENERATE_PREV_BLOCKCHAIN:
      return payload;
    case MODIFY_PREV_BLOCKCHAIN:
      return state.map((el, index) => {
        const { block, id } = payload;
        if (id + 1 === index) {
          return { ...el, prev: block.hash };
        } if (id === index) {
          return block;
        }
        return el;
      });
    default:
      return state;
  }
};

export default prevBlockchainReducer;
