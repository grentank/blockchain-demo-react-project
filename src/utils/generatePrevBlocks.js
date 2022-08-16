import mineNonce from './mineNonce';
// import sha256 from './sha256';

export function generatePrevBlocks(num) {
  const blockchain = [{
    id: 0,
    meta: { verified: true, mining: false },
    hash: '0000494a2c74d8b796e3fb38b4844551d51b1bf776bc6a69bab5ce33df6ae998',
    data: {
      block: '1', data: '', nonce: '10982', prev: '0000000000000000000000000000000000000000000000000000000000000000',
    },
  }, {
    id: 1,
    meta: { verified: true, mining: false },
    hash: '0000bcdd91a37cc30844fae65f3f16a965138723edff528cc235b9f22f8f29aa',
    data: {
      block: '2', data: '', nonce: '2047', prev: '0000494a2c74d8b796e3fb38b4844551d51b1bf776bc6a69bab5ce33df6ae998',
    },
  }, {
    id: 2,
    meta: { verified: true, mining: false },
    hash: '00008cbc0a34d0d9891742a067586191c24d4644dbb905b214a88b542cab8966',
    data: {
      block: '3', data: '', nonce: '32897', prev: '0000bcdd91a37cc30844fae65f3f16a965138723edff528cc235b9f22f8f29aa',
    },
  }, {
    id: 3,
    meta: { verified: true, mining: false },
    hash: '000010445dbc62fe44d5786476def47381a95d1206c35f9ad8226f36c803d4f3',
    data: {
      block: '4', data: '', nonce: '91287', prev: '00008cbc0a34d0d9891742a067586191c24d4644dbb905b214a88b542cab8966',
    },
  }, {
    id: 4,
    meta: { verified: true, mining: false },
    hash: '000056520ec6652cf41c41719b326fbdaad9462c036468a0c9859b7eadd14e48',
    data: {
      block: '5', data: '', nonce: '21961', prev: '000010445dbc62fe44d5786476def47381a95d1206c35f9ad8226f36c803d4f3',
    },
  }];
  return blockchain.slice(0, num);
}

export async function generatePrevBlocksAsync(num) {
  const blockchain = [];
  for (let i = 0; i < num; i += 1) {
    if (i > 0) {
      blockchain.push(await mineNonce(
        {
          id: i.toString(),
          meta: {
            verified: true,
            mining: false,
          },
          hash: '00001c9a3a2f8999f5b26d17d1c03d31fa042d9245d6c1dd7de5179fbbfbf04c',
          data: {
            block: (i + 1).toString(),
            data: '',
            nonce: '0',
            prev: blockchain[i - 1].hash,
          },
        },
      ));
    } else {
      blockchain.push(await mineNonce(
        {
          id: '0',
          meta: {
            verified: true,
            mining: false,
          },
          hash: '00001c9a3a2f8999f5b26d17d1c03d31fa042d9245d6c1dd7de5179fbbfbf04c',
          data: {
            block: '1',
            data: '',
            nonce: '217713',
            prev: '0'.repeat(64),
          },
        },
      ));
    }
  }
  console.log('Blockchain:', blockchain);
  console.log(JSON.stringify(blockchain));
}
