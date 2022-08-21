import { generateTokensBlocks } from '../../utils/generateTokenBlocks';
import mineNonce from '../../utils/mineNonce';
import { GENERATE_TOKEN_BLOCKCHAIN, MODIFY_TOKEN_BLOCKCHAIN, SET_MINING_TOKEN_BLOCK } from '../types';
import { recalculatePrevBlockchain } from './prevBlockchainActions';

export const recalculateTokensBlockchain = (blockchain) => recalculatePrevBlockchain(blockchain);

export const generateTokensBlockchain = (num, TYPE) => ({
  type: TYPE ? GENERATE_TOKEN_BLOCKCHAIN + TYPE : GENERATE_TOKEN_BLOCKCHAIN,
  payload: generateTokensBlocks(num),
});

export const modifyTokensBlockchain = (data, id, blockchain, TYPE) => (dispatch) => {
  recalculateTokensBlockchain(blockchain
    .map((block, index) => (id === index ? { ...block, data } : block)))
    .then((newBlockchain) => dispatch({
      type: TYPE ? MODIFY_TOKEN_BLOCKCHAIN + TYPE : MODIFY_TOKEN_BLOCKCHAIN,
      payload: newBlockchain,
    }));
};

export const setMiningTokensBlock = (id, TYPE) => ({
  type: TYPE ? SET_MINING_TOKEN_BLOCK + TYPE : SET_MINING_TOKEN_BLOCK,
  payload: { id },
});

export const mineTokensBlockNonce = (id, blockchain, TYPE) => (dispatch) => {
  mineNonce(blockchain[id])
    .then((newBlock) => recalculateTokensBlockchain(blockchain
      .map((block, index) => (index === id
        ? { ...newBlock, meta: { ...newBlock.meta, mining: false } } : block))))
    .then((newBlockchain) => dispatch({
      type: TYPE ? MODIFY_TOKEN_BLOCKCHAIN + TYPE : MODIFY_TOKEN_BLOCKCHAIN,
      payload: newBlockchain,
    }));
};
