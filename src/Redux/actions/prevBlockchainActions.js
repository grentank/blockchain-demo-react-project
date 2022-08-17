import { generatePrevBlocks } from '../../utils/generatePrevBlocks';
import hashIsValid from '../../utils/hashIsValid';
import mineNonce from '../../utils/mineNonce';
import sha256 from '../../utils/sha256';
import { GENERATE_PREV_BLOCKCHAIN, MODIFY_PREV_BLOCKCHAIN, SET_MINING_PREV_BLOCK } from '../types';

export const recalculatePrevBlockchain = async (blockchain) => {
  const newBlockchain = [];
  for (let i = 0; i < blockchain.length; i += 1) {
    const prev = i > 0 ? newBlockchain[i - 1].hash : '0'.repeat(64);
    const hash = await sha256({ ...blockchain[i].data, prev });
    newBlockchain.push({
      ...blockchain[i],
      hash,
      data: { ...blockchain[i].data, prev },
      meta: { ...blockchain[i].meta, verified: hashIsValid(hash) },
    });
  }
  return newBlockchain;
};

export const generatePrevBlockchain = (num, TYPE) => ({
  type: TYPE ? GENERATE_PREV_BLOCKCHAIN + TYPE : GENERATE_PREV_BLOCKCHAIN,
  payload: generatePrevBlocks(num),
});

export const modifyPrevBlockchain = (data, id, blockchain, TYPE) => (dispatch) => {
  recalculatePrevBlockchain(blockchain
    .map((block, index) => (id === index ? { ...block, data } : block)))
    .then((newBlockchain) => dispatch({
      type: TYPE ? MODIFY_PREV_BLOCKCHAIN + TYPE : MODIFY_PREV_BLOCKCHAIN,
      payload: newBlockchain,
    }));
};

export const setMiningPrevBlock = (id, TYPE) => ({
  type: TYPE ? SET_MINING_PREV_BLOCK + TYPE : SET_MINING_PREV_BLOCK,
  payload: { id },
});

export const minePrevBlockNonce = (id, blockchain, TYPE) => (dispatch) => {
  mineNonce(blockchain[id])
    .then((newBlock) => recalculatePrevBlockchain(blockchain
      .map((block, index) => (index === id
        ? { ...newBlock, meta: { ...newBlock.meta, mining: false } } : block))))
    .then((newBlockchain) => dispatch({
      type: TYPE ? MODIFY_PREV_BLOCKCHAIN + TYPE : MODIFY_PREV_BLOCKCHAIN,
      payload: newBlockchain,
    }));
};
