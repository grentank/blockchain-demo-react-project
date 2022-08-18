import mineNonce from './mineNonce';

const Fakerator = require('fakerator');

const fk = Fakerator();
// import sha256 from './sha256';

export function generateCoinbaseBlocks(num) {
  const blockchain = [{
    id: 0,
    meta: { verified: true, mining: false },
    hash: '0000d13f273f5c806bb4910794fa34e3ab917b2e537f9477205ac9032e833c71',
    data: {
      block: '1',
      coinbase: { amount: 100, to: 'Adam' },
      tokens: [],
      nonce: '979',
      prev: '0000000000000000000000000000000000000000000000000000000000000000',
    },
  }, {
    id: 1,
    meta: { verified: true, mining: false },
    hash: '0000383b170e95b0e46ef86c501fd0ee8667a4dc84d2f8d529b0fb50d42927b0',
    data: {
      block: '2',
      coinbase: { amount: 100, to: 'Adam' },
      tokens: [{ amount: 20, from: 'Adam', to: 'Julia' }, { amount: 30, from: 'Adam', to: 'George' }, { amount: 10, from: 'Adam', to: 'Lynda' }, { amount: 20, from: 'Adam', to: 'Bob' }],
      nonce: '11557',
      prev: '0000d13f273f5c806bb4910794fa34e3ab917b2e537f9477205ac9032e833c71',
    },
  }, {
    id: 2,
    meta: { verified: true, mining: false },
    hash: '0000e75b172c781915fe6abd38d08e6347e8b866ec87549f7a5f3ebcdaa78b16',
    data: {
      block: '3',
      coinbase: { amount: 100, to: 'Ilona' },
      tokens: [{ amount: 15, from: 'Julia', to: 'Kirill' }, { amount: 80, from: 'Adam', to: 'Artyom' }],
      nonce: '19688',
      prev: '0000383b170e95b0e46ef86c501fd0ee8667a4dc84d2f8d529b0fb50d42927b0',
    },
  }, {
    id: 3,
    meta: { verified: true, mining: false },
    hash: '000055cf0230b8c610dec7d9c8cdbfb0f28a60194d7431c3ebee90775aadab02',
    data: {
      block: '4',
      coinbase: { amount: 100, to: 'Yurii' },
      tokens: [{ amount: 40, from: 'Ilona', to: 'Adam' }, { amount: 5, from: 'Lynda', to: 'Phoebe' }, { amount: 7, from: 'Bob', to: 'Esmina' }],
      nonce: '21674',
      prev: '0000e75b172c781915fe6abd38d08e6347e8b866ec87549f7a5f3ebcdaa78b16',
    },
  }];
  return blockchain.slice(0, num);
}

export async function generateCoinbaseBlocksAsync(num) {
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
          coinbase: { amount: 100, to: fk.names.firstName() },
          tokens: new Array(fk.random.number(2, 4))
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
