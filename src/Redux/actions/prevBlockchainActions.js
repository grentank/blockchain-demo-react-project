import { generatePrevBlocks } from '../../utils/generatePrevBlocks';
import hashIsValid from '../../utils/hashIsValid';
import sha256 from '../../utils/sha256';
import { GENERATE_PREV_BLOCKCHAIN, MODIFY_PREV_BLOCKCHAIN } from '../types';

export const generatePrevBlockchain = (num) => ({
  type: GENERATE_PREV_BLOCKCHAIN,
  payload: generatePrevBlocks(num),
});

export const modifyPrevBlockchain = (data, id, blockchain) => (dispatch) => {
  blockchain
    .reduce((prevPromise, currentBlock) => prevPromise
      .then((preBlockchain) => {
        const newBlock = currentBlock.id === id ? { ...currentBlock, data } : { ...currentBlock };
        const prev = newBlock.id > 0
          ? preBlockchain[newBlock.id - 1].hash
          : '0'.repeat(64);
        return sha256({ ...newBlock.data, prev })
          .then((hash) => [
            ...preBlockchain,
            { ...newBlock, hash, data: { ...newBlock.data, prev } },
          ]);
      }), Promise.resolve([]))
    .then((newBlockchain) => dispatch({
      type: MODIFY_PREV_BLOCKCHAIN,
      payload: newBlockchain,
    }));
};
