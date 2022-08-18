import { generateCoinbaseBlocks } from '../../utils/generateCoinbaseBlocks';
import mineNonce from '../../utils/mineNonce';
import { GENERATE_COINBASE_BLOCKCHAIN, MODIFY_COINBASE_BLOCKCHAIN, SET_MINING_COINBASE_BLOCK } from '../types';
import { recalculatePrevBlockchain } from './prevBlockchainActions';

export const recalculateCoinbaseBlockchain = (blockchain) => recalculatePrevBlockchain(blockchain);

export const generateCoinbaseBlockchain = (num, TYPE) => ({
  type: TYPE ? GENERATE_COINBASE_BLOCKCHAIN + TYPE : GENERATE_COINBASE_BLOCKCHAIN,
  payload: generateCoinbaseBlocks(num),
});

export const modifyCoinbaseBlockchain = (data, id, blockchain, TYPE) => (dispatch) => {
  recalculateCoinbaseBlockchain(blockchain
    .map((block, index) => (id === index ? { ...block, data } : block)))
    .then((newBlockchain) => dispatch({
      type: TYPE ? MODIFY_COINBASE_BLOCKCHAIN + TYPE : MODIFY_COINBASE_BLOCKCHAIN,
      payload: newBlockchain,
    }));
};

export const setMiningCoinbaseBlock = (id, TYPE) => ({
  type: TYPE ? SET_MINING_COINBASE_BLOCK + TYPE : SET_MINING_COINBASE_BLOCK,
  payload: { id },
});

export const mineCoinbaseBlockNonce = (id, blockchain, TYPE) => (dispatch) => {
  mineNonce(blockchain[id])
    .then((newBlock) => recalculateCoinbaseBlockchain(blockchain
      .map((block, index) => (index === id
        ? { ...newBlock, meta: { ...newBlock.meta, mining: false } } : block))))
    .then((newBlockchain) => dispatch({
      type: TYPE ? MODIFY_COINBASE_BLOCKCHAIN + TYPE : MODIFY_COINBASE_BLOCKCHAIN,
      payload: newBlockchain,
    }));
};
