import hashIsValid from '../../utils/hashIsValid';
import { GENERATE_PREV_BLOCKCHAIN, MODIFY_PREV_BLOCKCHAIN } from '../types';

const prevBlockchainReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GENERATE_PREV_BLOCKCHAIN:
      return payload;
    case MODIFY_PREV_BLOCKCHAIN:
      return state.map((el, index) => ({
        ...payload[index],
        meta: { ...payload[index].meta, verified: hashIsValid(payload[index].hash) },
      }));
    default:
      return state;
  }
};

export default prevBlockchainReducer;
