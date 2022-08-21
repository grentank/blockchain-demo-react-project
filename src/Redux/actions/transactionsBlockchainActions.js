import { verifyTransaction } from '../../utils/ecdsa';
import { generateSignedBlocks, generateSignedMinedBlocks, remineSignedBlockchain } from '../../utils/generateSignedBlocks';
import hashIsValid from '../../utils/hashIsValid';
import mineNonce from '../../utils/mineNonce';
import sha256 from '../../utils/sha256';
import { GENERATE_TRANSACTIONS_BLOCKCHAIN, MODIFY_TRANSACTIONS_BLOCKCHAIN, SET_MINING_TRANSACTIONS_BLOCK } from '../types';

export const recalculateTransactionsBlockchain = async (blockchain) => {
  // console.log('Recalculating blockchain:', blockchain);
  const newBlockchain = [];
  for (let i = 0; i < blockchain.length; i += 1) {
    const prev = i > 0 ? newBlockchain[i - 1].hash : '0'.repeat(64);
    const data = { ...blockchain[i].data, prev, tokens: [] };
    for (let j = 0; j < blockchain[i].data.tokens.length; j += 1) {
      data.tokens.push({
        ...blockchain[i].data.tokens[j],
        meta: { verified: await verifyTransaction(blockchain[i].data.tokens[j]) },
      });
    }
    const hash = await sha256(data);
    newBlockchain.push({
      ...blockchain[i],
      hash,
      data,
      meta: { ...blockchain[i].meta, verified: hashIsValid(hash) },
    });
  }
  return newBlockchain;
};

export const generateTransactionsBlockchain = (num, TYPE) => (dispatch) => {
  // generateSignedBlocks(num)
  //   .then(remineSignedBlockchain)
  //   .then((blockchain) => {
  const blockchain = generateSignedMinedBlocks(num);
  // console.log('Generated:', blockchain);
  // console.log(JSON.stringify(blockchain));
  dispatch({
    type: TYPE ? GENERATE_TRANSACTIONS_BLOCKCHAIN + TYPE : GENERATE_TRANSACTIONS_BLOCKCHAIN,
    payload: blockchain,
  });
  // });
};

export const modifyTransactionsBlockchain = (data, id, blockchain, TYPE) => (dispatch) => {
  recalculateTransactionsBlockchain(blockchain
    .map((block, index) => (id === index ? { ...block, data } : block)))
    .then((newBlockchain) => dispatch({
      type: TYPE ? MODIFY_TRANSACTIONS_BLOCKCHAIN + TYPE : MODIFY_TRANSACTIONS_BLOCKCHAIN,
      payload: newBlockchain,
    }));
};

export const setMiningTransactionsBlock = (id, TYPE) => ({
  type: TYPE ? SET_MINING_TRANSACTIONS_BLOCK + TYPE : SET_MINING_TRANSACTIONS_BLOCK,
  payload: { id },
});

export const mineTransactionsBlockNonce = (id, blockchain, TYPE) => (dispatch) => {
  mineNonce(blockchain[id])
    .then((newBlock) => recalculateTransactionsBlockchain(blockchain
      .map((block, index) => (index === id
        ? { ...newBlock, meta: { ...newBlock.meta, mining: false } } : block))))
    .then((newBlockchain) => dispatch({
      type: TYPE ? MODIFY_TRANSACTIONS_BLOCKCHAIN + TYPE : MODIFY_TRANSACTIONS_BLOCKCHAIN,
      payload: newBlockchain,
    }));
};
