import { generateP2PTransaction, generatePeer } from './ecdsa';
import mineNonce from './mineNonce';

export async function remineSignedBlockchain(blockchain) {
  const newBlockchain = [];
  for (let i = 0; i < blockchain.length; i += 1) {
    newBlockchain.push(await mineNonce({
      ...blockchain[i],
      data: { ...blockchain[i].data, prev: i === 0 ? '0'.repeat(64) : blockchain[i - 1].hash },
    }));
  }
  return newBlockchain;
}

export async function generateSignedBlocks() {
  const adam = await generatePeer();
  const julia = await generatePeer();
  const george = await generatePeer();
  const phoebe = await generatePeer();
  const esmina = await generatePeer();
  // console.log('adam', adam);
  const blockchain = [{
    id: 0,
    meta: { verified: false, mining: false },
    hash: '0000d13f273f5c806bb4910794fa34e3ab917b2e537f9477205ac9032e833c71',
    data: {
      block: '1',
      coinbase: { amount: 100, to: adam.publicKeyHex },
      tokens: [],
      nonce: '979',
      prev: '0000000000000000000000000000000000000000000000000000000000000000',
    },
  }, {
    id: 1,
    meta: { verified: false, mining: false },
    hash: '0000383b170e95b0e46ef86c501fd0ee8667a4dc84d2f8d529b0fb50d42927b0',
    data: {
      block: '2',
      coinbase: { amount: 100, to: adam.publicKeyHex },
      tokens: [
        await generateP2PTransaction({ amount: 20, sender: adam, receiver: julia }),
        await generateP2PTransaction({ amount: 30, sender: adam, receiver: george }),
        await generateP2PTransaction({ amount: 10, sender: adam, receiver: esmina })],
      nonce: '11557',
      prev: '0000d13f273f5c806bb4910794fa34e3ab917b2e537f9477205ac9032e833c71',
    },
  }, {
    id: 2,
    meta: { verified: false, mining: false },
    hash: '0000e75b172c781915fe6abd38d08e6347e8b866ec87549f7a5f3ebcdaa78b16',
    data: {
      block: '3',
      coinbase: { amount: 100, to: phoebe.publicKeyHex },
      tokens: [await generateP2PTransaction({ amount: 15, sender: george, receiver: julia })],
      nonce: '19688',
      prev: '0000383b170e95b0e46ef86c501fd0ee8667a4dc84d2f8d529b0fb50d42927b0',
    },
  }, {
    id: 3,
    meta: { verified: false, mining: false },
    hash: '000055cf0230b8c610dec7d9c8cdbfb0f28a60194d7431c3ebee90775aadab02',
    data: {
      block: '4',
      coinbase: { amount: 100, to: esmina.publicKeyHex },
      tokens: [
        await generateP2PTransaction({ amount: 40, sender: phoebe, receiver: adam }),
        await generateP2PTransaction({ amount: 5, sender: julia, receiver: esmina })],
      nonce: '21674',
      prev: '0000e75b172c781915fe6abd38d08e6347e8b866ec87549f7a5f3ebcdaa78b16',
    },
  }];
  return blockchain;
}

// export async function generateSignedBlocksAsync(num) {
//   const blockchain = [];
//   for (let i = 0; i < num; i += 1) {
//     blockchain.push(await mineNonce(
//       {
//         id: i,
//         meta: {
//           verified: true,
//           mining: false,
//         },
//         hash: '00001c9a3a2f8999f5b26d17d1c03d31fa042d9245d6c1dd7de5179fbbfbf04c',
//         data: {
//           block: (i + 1).toString(),
//           coinbase: { amount: 100, to: fk.names.firstName() },
//           tokens: new Array(fk.random.number(1, 3))
//             .fill(0)
//             .map(() => ({
//               amount: fk.random.number(100),
//               from: fk.names.firstName(),
//               to: fk.names.firstName(),
//             })),
//           nonce: '217713',
//           prev: i === 0 ? '0'.repeat(64) : blockchain[i - 1].hash,
//         },
//       },
//     ));
//   }
//   console.log('Blockchain:', blockchain);
//   console.log(JSON.stringify(blockchain));
// }
