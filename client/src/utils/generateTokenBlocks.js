import mineNonce from './mineNonce';

const Fakerator = require('fakerator');

const fk = Fakerator();
// import sha256 from './sha256';

export function generateTokensBlocks(num) {
  const blockchain = [{
    id: 0,
    meta: { verified: true, mining: false },
    hash: '00009b52469bc33297897f9b6a24258156acb23a690bd9594ea402aee0e212a0',
    data: {
      block: '1', tokens: [{ amount: 53, from: 'Angel', to: 'Kevin' }, { amount: 19, from: 'Stanley', to: 'Donna' }, { amount: 25, from: 'Marjorie', to: 'Pat' }, { amount: 58, from: 'Juanita', to: 'Jose' }, { amount: 20, from: 'Kelvin', to: 'Elena' }], nonce: '16270', prev: '0000000000000000000000000000000000000000000000000000000000000000',
    },
  }, {
    id: 1,
    meta: { verified: true, mining: false },
    hash: '000092214f7e347ea4726020da5889d4070a7eb0c4aeab581ccf8816168c46e2',
    data: {
      block: '2', tokens: [{ amount: 77, from: 'Georgia', to: 'Charlie' }, { amount: 49, from: 'Lindsay', to: 'Derek' }, { amount: 40, from: 'Diana', to: 'Tracy' }, { amount: 48, from: 'Cesar', to: 'Spencer' }, { amount: 54, from: 'Becky', to: 'Lois' }, { amount: 76, from: 'Jordan', to: 'Cameron' }], nonce: '138393', prev: '00009b52469bc33297897f9b6a24258156acb23a690bd9594ea402aee0e212a0',
    },
  }, {
    id: 2,
    meta: { verified: true, mining: false },
    hash: '0000e749faac2cc6a42a715fdc1af34812eb432e56bd310b344f99762016fa55',
    data: {
      block: '3', tokens: [{ amount: 69, from: 'Calvin', to: 'Ernesto' }], nonce: '14695', prev: '000092214f7e347ea4726020da5889d4070a7eb0c4aeab581ccf8816168c46e2',
    },
  }, {
    id: 3,
    meta: { verified: true, mining: false },
    hash: '0000e8ae28ef0668bacedda73dcc8b520d208ebc971db21e6d34920c31e07087',
    data: {
      block: '4', tokens: [{ amount: 24, from: 'Joyce', to: 'Bryant' }, { amount: 21, from: 'Elias', to: 'Austin' }, { amount: 92, from: 'Brandon', to: 'Byron' }, { amount: 72, from: 'Teri', to: 'Ervin' }, { amount: 73, from: 'Linda', to: 'Jacquelyn' }], nonce: '54839', prev: '0000e749faac2cc6a42a715fdc1af34812eb432e56bd310b344f99762016fa55',
    },
  }, {
    id: 4,
    meta: { verified: true, mining: false },
    hash: '0000402daca7c8297dfca726e3725b86734efa2b6645e8220c4d587bbfe1e968',
    data: {
      block: '5', tokens: [{ amount: 42, from: 'Maggie', to: 'Ernesto' }], nonce: '3270', prev: '0000e8ae28ef0668bacedda73dcc8b520d208ebc971db21e6d34920c31e07087',
    },
  }];
  return blockchain.slice(0, num);
}

export async function generateTokensBlocksAsync(num) {
  const blockchain = [];
  for (let i = 0; i < num; i += 1) {
    blockchain.push(await mineNonce(
      {
        id: i,
        meta: {
          verified: true,
          mining: false,
        },
        hash: '00001c9a3a2f8999f5b26d17d1c03d31fa042d9245d6c1dd7de5179fbbfbf04c',
        data: {
          block: (i + 1).toString(),
          tokens: new Array(fk.random.number(6))
            .fill(0)
            .map(() => ({
              amount: fk.random.number(100),
              from: fk.names.firstName(),
              to: fk.names.firstName(),
            })),
          nonce: '217713',
          prev: i === 0 ? '0'.repeat(64) : blockchain[i - 1].hash,
        },
      },
    ));
  }
  console.log('Blockchain:', blockchain);
  console.log(JSON.stringify(blockchain));
}
