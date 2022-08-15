import mineNonce from './mineNonce';
// import sha256 from './sha256';

export function generatePrevBlocks(num) {
  const blockchain = [
    {
      block: '1',
      data: '',
      hash: '00001c9a3a2f8999f5b26d17d1c03d31fa042d9245d6c1dd7de5179fbbfbf04c',
      nonce: '217713',
      prev: '0000000000000000000000000000000000000000000000000000000000000000',
    },
    {
      block: '2',
      data: '',
      hash: '0000ea506528df8812f7e000c54b1384dbc1476e07a0b35b3cc458640bfe3392',
      nonce: '109094',
      prev: '00001c9a3a2f8999f5b26d17d1c03d31fa042d9245d6c1dd7de5179fbbfbf04c',
    },
    {
      block: '3',
      data: '',
      hash: '0000962c1258547276d20b0748dbc857643de12fdd4ec414e506c71c6eddec68',
      nonce: '2360',
      prev: '0000ea506528df8812f7e000c54b1384dbc1476e07a0b35b3cc458640bfe3392',
    },
    {
      block: '4',
      data: '',
      hash: '000061b0987f197f075155193a2e3e897dc993c38006b71ed465b4bb51989153',
      nonce: '93995',
      prev: '0000962c1258547276d20b0748dbc857643de12fdd4ec414e506c71c6eddec68',
    },
    {
      block: '5',
      data: '',
      hash: '00007b236bf7a23f58f4a0b7ad0056154903aa125e74e04e2b351790202791cc',
      nonce: '88184',
      prev: '000061b0987f197f075155193a2e3e897dc993c38006b71ed465b4bb51989153',
    },
  ];
  return blockchain.slice(0, num);
}

export async function generatePrevBlocksAsync(num) {
  const blockchain = [];
  for (let i = 0; i < num; i += 1) {
    if (i > 0) {
      blockchain.push(await mineNonce({
        block: (i + 1).toString(),
        nonce: '0',
        data: '',
        prev: blockchain[i - 1].hash,
        hash: '',
      }));
    } else {
      blockchain.push(await mineNonce({
        block: (i + 1).toString(),
        nonce: '0',
        data: '',
        prev: '0000000000000000000000000000000000000000000000000000000000000000',
        hash: '',
      }));
    }
  }
  console.log('Blockchain:', blockchain);
}
