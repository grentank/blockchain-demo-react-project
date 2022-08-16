import { generatePrevBlocks } from '../../utils/generatePrevBlocks';
import sha256 from '../../utils/sha256';
import { GENERATE_PREV_BLOCKCHAIN, MODIFY_PREV_BLOCKCHAIN } from '../types';

export const generatePrevBlockchain = (num) => ({
  type: GENERATE_PREV_BLOCKCHAIN,
  payload: generatePrevBlocks(num),
});

export const modifyPrevBlockchain = ({ hash, ...rest }, id) => (dispatch) => {
  sha256(rest).then((newHash) => dispatch({
    type: MODIFY_PREV_BLOCKCHAIN,
    payload: {
      block: { ...rest, hash: newHash },
      id,
    },
  }));
};
