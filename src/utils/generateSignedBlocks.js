import { generateP2PTransaction, generatePeer, verifyTransaction } from './ecdsa';
import mineNonce from './mineNonce';

export async function remineSignedBlockchain(blockchain) {
  const newBlockchain = [];
  for (let i = 0; i < blockchain.length; i += 1) {
    // console.log('Mining block:', blockchain[i]);
    newBlockchain.push(await mineNonce({
      ...blockchain[i],
      data: { ...blockchain[i].data, prev: i === 0 ? '0'.repeat(64) : newBlockchain[i - 1].hash },
    }));
    // console.log('Mined block:', newBlockchain[i]);
  }
  return newBlockchain;
}

export async function generateSignedBlocks() {
  const adam = await generatePeer();
  const julia = await generatePeer();
  const george = await generatePeer();
  const phoebe = await generatePeer();
  const esmina = await generatePeer();
  // const transaction = await generateP2PTransaction({ amount: 20, sender: adam, receiver: julia });
  // console.log('Transaction:', transaction);
  // console.log('Verified? ', await verifyTransaction(transaction));
  // console.log('adam', adam);
  const blockchain = [{
    id: 0,
    meta: { verified: false, mining: false },
    hash: '0000d13f273f5c806bb4910794fa34e3ab917b2e537f9477205ac9032e833c71',
    data: {
      block: '1',
      coinbase: { amount: '100', to: adam.publicKeyHex },
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
      coinbase: { amount: '100', to: adam.publicKeyHex },
      tokens: [
        await generateP2PTransaction({ amount: '20', sender: adam, receiver: julia }),
        await generateP2PTransaction({ amount: '30', sender: adam, receiver: george }),
        await generateP2PTransaction({ amount: '10', sender: adam, receiver: esmina })],
      nonce: '11557',
      prev: '0000d13f273f5c806bb4910794fa34e3ab917b2e537f9477205ac9032e833c71',
    },
  }, {
    id: 2,
    meta: { verified: false, mining: false },
    hash: '0000e75b172c781915fe6abd38d08e6347e8b866ec87549f7a5f3ebcdaa78b16',
    data: {
      block: '3',
      coinbase: { amount: '100', to: phoebe.publicKeyHex },
      tokens: [await generateP2PTransaction({ amount: '15', sender: george, receiver: julia })],
      nonce: '19688',
      prev: '0000383b170e95b0e46ef86c501fd0ee8667a4dc84d2f8d529b0fb50d42927b0',
    },
  }, {
    id: 3,
    meta: { verified: false, mining: false },
    hash: '000055cf0230b8c610dec7d9c8cdbfb0f28a60194d7431c3ebee90775aadab02',
    data: {
      block: '4',
      coinbase: { amount: '100', to: esmina.publicKeyHex },
      tokens: [
        await generateP2PTransaction({ amount: '40', sender: phoebe, receiver: adam }),
        await generateP2PTransaction({ amount: '5', sender: julia, receiver: esmina })],
      nonce: '21674',
      prev: '0000e75b172c781915fe6abd38d08e6347e8b866ec87549f7a5f3ebcdaa78b16',
    },
  }];
  // console.log(JSON.stringify(blockchain));
  return blockchain;
}

export function generateSignedMinedBlocks(num) {
  const blockchain = [{
    id: 0,
    meta: { verified: true, mining: false },
    hash: '0000c2954701eb265dd869b3f20ca6809cf222c6448dd7119b030873c585e1ac',
    data: {
      block: '1', coinbase: { amount: '100', to: '3059301306072a8648ce3d020106082a8648ce3d03010703420004dac98dc81a82f64dc74c08cebe30c449f746e8c6571acc62ea6102b274c01eb39f40e212dc48f03e7a5c066c855431cda9c2811b84e79fca11eb8e7f253a824e' }, tokens: [], nonce: '17510', prev: '0000000000000000000000000000000000000000000000000000000000000000',
    },
  }, {
    id: 1,
    meta: { verified: true, mining: false },
    hash: '0000297d686450c1e750857f4bc62edb68c838e29da2c76284f6aae1d1a8cdc5',
    data: {
      block: '2',
      coinbase: { amount: '100', to: '3059301306072a8648ce3d020106082a8648ce3d03010703420004dac98dc81a82f64dc74c08cebe30c449f746e8c6571acc62ea6102b274c01eb39f40e212dc48f03e7a5c066c855431cda9c2811b84e79fca11eb8e7f253a824e' },
      tokens: [{
        data: {
          amount: '20',
          sender: {
            keypair: {
              publicKey: {
                crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: '2smNyBqC9k3HTAjOvjDESfdG6MZXGsxi6mECsnTAHrM', y: 'n0DiEtxI8D56XAZshVQxzanCgRuE55_KEeuOfyU6gk4',
              },
              privateKey: {
                crv: 'P-256', d: 'MqpmbfsDGZf6Tz4y03R5LGGXIZv51E7jBaxDFC3-O7w', ext: true, key_ops: ['sign'], kty: 'EC', x: '2smNyBqC9k3HTAjOvjDESfdG6MZXGsxi6mECsnTAHrM', y: 'n0DiEtxI8D56XAZshVQxzanCgRuE55_KEeuOfyU6gk4',
              },
            },
            publicKeyHex: '3059301306072a8648ce3d020106082a8648ce3d03010703420004dac98dc81a82f64dc74c08cebe30c449f746e8c6571acc62ea6102b274c01eb39f40e212dc48f03e7a5c066c855431cda9c2811b84e79fca11eb8e7f253a824e',
          },
          receiver: {
            keypair: {
              publicKey: {
                crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: 'JDF2iDNb2Pwnxf2NUYd0xJzMAkTpSHMfJN2oZGGGnHI', y: 'wNiKY5nxfZGcdg3xx7lDXowXDLyb2gB--_mLTsOrnsM',
              },
              privateKey: {
                crv: 'P-256', d: 'c17bjIS87hFqetmcpKfSm7_l-qn8oU2vXfs9KU1Vyzc', ext: true, key_ops: ['sign'], kty: 'EC', x: 'JDF2iDNb2Pwnxf2NUYd0xJzMAkTpSHMfJN2oZGGGnHI', y: 'wNiKY5nxfZGcdg3xx7lDXowXDLyb2gB--_mLTsOrnsM',
              },
            },
            publicKeyHex: '3059301306072a8648ce3d020106082a8648ce3d0301070342000424317688335bd8fc27c5fd8d518774c49ccc0244e948731f24dda86461869c72c0d88a6399f17d919c760df1c7b9435e8c170cbc9bda007efbf98b4ec3ab9ec3',
          },
        },
        signature: 'a4952b58e5fea85079a97770c83859dca3966480a4efd07790db5a05ab2c94c47a2a92b81753b4ca0c549a6245fce94301fa1b94c1012a47826c9c92b914a3fb',
        meta: { verified: true },
      }, {
        data: {
          amount: '30',
          sender: {
            keypair: {
              publicKey: {
                crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: '2smNyBqC9k3HTAjOvjDESfdG6MZXGsxi6mECsnTAHrM', y: 'n0DiEtxI8D56XAZshVQxzanCgRuE55_KEeuOfyU6gk4',
              },
              privateKey: {
                crv: 'P-256', d: 'MqpmbfsDGZf6Tz4y03R5LGGXIZv51E7jBaxDFC3-O7w', ext: true, key_ops: ['sign'], kty: 'EC', x: '2smNyBqC9k3HTAjOvjDESfdG6MZXGsxi6mECsnTAHrM', y: 'n0DiEtxI8D56XAZshVQxzanCgRuE55_KEeuOfyU6gk4',
              },
            },
            publicKeyHex: '3059301306072a8648ce3d020106082a8648ce3d03010703420004dac98dc81a82f64dc74c08cebe30c449f746e8c6571acc62ea6102b274c01eb39f40e212dc48f03e7a5c066c855431cda9c2811b84e79fca11eb8e7f253a824e',
          },
          receiver: {
            keypair: {
              publicKey: {
                crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: 'SBKcnbxpw6_mMHIXw3BDJmWLNb3c6ROCNJ_DZYUzhr0', y: 'MCYmE8EappkH-HHJQh0qLpGtJQKwRdK0OKBNje2834s',
              },
              privateKey: {
                crv: 'P-256', d: 'YwlFyKLPOEMFDv3Hf_vHgvk9nFOMfr4EDL0XdVS4BZc', ext: true, key_ops: ['sign'], kty: 'EC', x: 'SBKcnbxpw6_mMHIXw3BDJmWLNb3c6ROCNJ_DZYUzhr0', y: 'MCYmE8EappkH-HHJQh0qLpGtJQKwRdK0OKBNje2834s',
              },
            },
            publicKeyHex: '3059301306072a8648ce3d020106082a8648ce3d0301070342000448129c9dbc69c3afe6307217c3704326658b35bddce91382349fc365853386bd30262613c11aa69907f871c9421d2a2e91ad2502b045d2b438a04d8dedbcdf8b',
          },
        },
        signature: 'f6bc64de1f4ccd10cf8be82d75b29ad1703884d9f824de0799d9f102a1b02a87bdbcc0b6d63d45bf04d59d16de8749526cd0c2fd6b0d75137861b43e1adf8b2f',
        meta: { verified: true },
      }, {
        data: {
          amount: '10',
          sender: {
            keypair: {
              publicKey: {
                crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: '2smNyBqC9k3HTAjOvjDESfdG6MZXGsxi6mECsnTAHrM', y: 'n0DiEtxI8D56XAZshVQxzanCgRuE55_KEeuOfyU6gk4',
              },
              privateKey: {
                crv: 'P-256', d: 'MqpmbfsDGZf6Tz4y03R5LGGXIZv51E7jBaxDFC3-O7w', ext: true, key_ops: ['sign'], kty: 'EC', x: '2smNyBqC9k3HTAjOvjDESfdG6MZXGsxi6mECsnTAHrM', y: 'n0DiEtxI8D56XAZshVQxzanCgRuE55_KEeuOfyU6gk4',
              },
            },
            publicKeyHex: '3059301306072a8648ce3d020106082a8648ce3d03010703420004dac98dc81a82f64dc74c08cebe30c449f746e8c6571acc62ea6102b274c01eb39f40e212dc48f03e7a5c066c855431cda9c2811b84e79fca11eb8e7f253a824e',
          },
          receiver: {
            keypair: {
              publicKey: {
                crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: 'VAG4ymxDtFeqR_i4AfMLnyD-xd5x58ReJ8ahG_nBOn0', y: 'XuoPHR_fI6U8Q4IFgLTzFZtFE-B3t32LNHk-y2-xIoI',
              },
              privateKey: {
                crv: 'P-256', d: 'Crpq-MG8WB2EBDy7bZnuelJW99tugjCtMNuCObhW4ds', ext: true, key_ops: ['sign'], kty: 'EC', x: 'VAG4ymxDtFeqR_i4AfMLnyD-xd5x58ReJ8ahG_nBOn0', y: 'XuoPHR_fI6U8Q4IFgLTzFZtFE-B3t32LNHk-y2-xIoI',
              },
            },
            publicKeyHex: '3059301306072a8648ce3d020106082a8648ce3d030107034200045401b8ca6c43b457aa47f8b801f30b9f20fec5de71e7c45e27c6a11bf9c13a7d5eea0f1d1fdf23a53c43820580b4f3159b4513e077b77d8b34793ecb6fb12282',
          },
        },
        signature: '2fec0c5a793987325cf181134edc0711c6f5f07108bff35cb243ab7960b0aa53840a9d6311509c3007fd24f6e112908e6dee540218575cce400242ee1dd7f9fa',
        meta: { verified: true },
      }],
      nonce: '22181',
      prev: '0000c2954701eb265dd869b3f20ca6809cf222c6448dd7119b030873c585e1ac',
    },
  }, {
    id: 2,
    meta: { verified: true, mining: false },
    hash: '0000bd897690a066891ee124e68586e989e65205039bbc1795978a4c2f1ce4f8',
    data: {
      block: '3',
      coinbase: { amount: '100', to: '3059301306072a8648ce3d020106082a8648ce3d03010703420004d07f915175da604cc7decabd0a9544e146590345b257725616dc421fca204b4cdabc69db45e4dea5dac810212bad560e6fcef6331993f48fbcd0724ae6edd476' },
      tokens: [{
        data: {
          amount: '15',
          sender: {
            keypair: {
              publicKey: {
                crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: 'SBKcnbxpw6_mMHIXw3BDJmWLNb3c6ROCNJ_DZYUzhr0', y: 'MCYmE8EappkH-HHJQh0qLpGtJQKwRdK0OKBNje2834s',
              },
              privateKey: {
                crv: 'P-256', d: 'YwlFyKLPOEMFDv3Hf_vHgvk9nFOMfr4EDL0XdVS4BZc', ext: true, key_ops: ['sign'], kty: 'EC', x: 'SBKcnbxpw6_mMHIXw3BDJmWLNb3c6ROCNJ_DZYUzhr0', y: 'MCYmE8EappkH-HHJQh0qLpGtJQKwRdK0OKBNje2834s',
              },
            },
            publicKeyHex: '3059301306072a8648ce3d020106082a8648ce3d0301070342000448129c9dbc69c3afe6307217c3704326658b35bddce91382349fc365853386bd30262613c11aa69907f871c9421d2a2e91ad2502b045d2b438a04d8dedbcdf8b',
          },
          receiver: {
            keypair: {
              publicKey: {
                crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: 'JDF2iDNb2Pwnxf2NUYd0xJzMAkTpSHMfJN2oZGGGnHI', y: 'wNiKY5nxfZGcdg3xx7lDXowXDLyb2gB--_mLTsOrnsM',
              },
              privateKey: {
                crv: 'P-256', d: 'c17bjIS87hFqetmcpKfSm7_l-qn8oU2vXfs9KU1Vyzc', ext: true, key_ops: ['sign'], kty: 'EC', x: 'JDF2iDNb2Pwnxf2NUYd0xJzMAkTpSHMfJN2oZGGGnHI', y: 'wNiKY5nxfZGcdg3xx7lDXowXDLyb2gB--_mLTsOrnsM',
              },
            },
            publicKeyHex: '3059301306072a8648ce3d020106082a8648ce3d0301070342000424317688335bd8fc27c5fd8d518774c49ccc0244e948731f24dda86461869c72c0d88a6399f17d919c760df1c7b9435e8c170cbc9bda007efbf98b4ec3ab9ec3',
          },
        },
        signature: '4a4bb2bfa9495458c18907bdb58329d173f51d6398292ed701ce1fa39d7ee51d0b51e504596eafe14dc18afe6fc2285e54933a038629dd3a3436cc9bb45b3c0d',
        meta: { verified: true },
      }],
      nonce: '275430',
      prev: '0000297d686450c1e750857f4bc62edb68c838e29da2c76284f6aae1d1a8cdc5',
    },
  }, {
    id: 3,
    meta: { verified: true, mining: false },
    hash: '000089afa6987b66145854686e27872d1a5e37595d162617d3f17eb83791cab8',
    data: {
      block: '4',
      coinbase: { amount: '100', to: '3059301306072a8648ce3d020106082a8648ce3d030107034200045401b8ca6c43b457aa47f8b801f30b9f20fec5de71e7c45e27c6a11bf9c13a7d5eea0f1d1fdf23a53c43820580b4f3159b4513e077b77d8b34793ecb6fb12282' },
      tokens: [{
        data: {
          amount: '40',
          sender: {
            keypair: {
              publicKey: {
                crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: '0H-RUXXaYEzH3sq9CpVE4UZZA0WyV3JWFtxCH8ogS0w', y: '2rxp20Xk3qXayBAhK61WDm_O9jMZk_SPvNBySubt1HY',
              },
              privateKey: {
                crv: 'P-256', d: 'NbC5XVsu-KJwRxseVFYyhqUbRa4-eq4tDoPuvYQQUCE', ext: true, key_ops: ['sign'], kty: 'EC', x: '0H-RUXXaYEzH3sq9CpVE4UZZA0WyV3JWFtxCH8ogS0w', y: '2rxp20Xk3qXayBAhK61WDm_O9jMZk_SPvNBySubt1HY',
              },
            },
            publicKeyHex: '3059301306072a8648ce3d020106082a8648ce3d03010703420004d07f915175da604cc7decabd0a9544e146590345b257725616dc421fca204b4cdabc69db45e4dea5dac810212bad560e6fcef6331993f48fbcd0724ae6edd476',
          },
          receiver: {
            keypair: {
              publicKey: {
                crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: '2smNyBqC9k3HTAjOvjDESfdG6MZXGsxi6mECsnTAHrM', y: 'n0DiEtxI8D56XAZshVQxzanCgRuE55_KEeuOfyU6gk4',
              },
              privateKey: {
                crv: 'P-256', d: 'MqpmbfsDGZf6Tz4y03R5LGGXIZv51E7jBaxDFC3-O7w', ext: true, key_ops: ['sign'], kty: 'EC', x: '2smNyBqC9k3HTAjOvjDESfdG6MZXGsxi6mECsnTAHrM', y: 'n0DiEtxI8D56XAZshVQxzanCgRuE55_KEeuOfyU6gk4',
              },
            },
            publicKeyHex: '3059301306072a8648ce3d020106082a8648ce3d03010703420004dac98dc81a82f64dc74c08cebe30c449f746e8c6571acc62ea6102b274c01eb39f40e212dc48f03e7a5c066c855431cda9c2811b84e79fca11eb8e7f253a824e',
          },
        },
        signature: '2c0c49a9a40cf6d79d5ae1c83ccdd0eaffdec4b0ae6929cb6e94f96e57f3819fb7cba42bd9521ce0875063eeee325a984fcdbdf9c4aa9796419721261fc35f58',
        meta: { verified: true },
      }, {
        data: {
          amount: '5',
          sender: {
            keypair: {
              publicKey: {
                crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: 'JDF2iDNb2Pwnxf2NUYd0xJzMAkTpSHMfJN2oZGGGnHI', y: 'wNiKY5nxfZGcdg3xx7lDXowXDLyb2gB--_mLTsOrnsM',
              },
              privateKey: {
                crv: 'P-256', d: 'c17bjIS87hFqetmcpKfSm7_l-qn8oU2vXfs9KU1Vyzc', ext: true, key_ops: ['sign'], kty: 'EC', x: 'JDF2iDNb2Pwnxf2NUYd0xJzMAkTpSHMfJN2oZGGGnHI', y: 'wNiKY5nxfZGcdg3xx7lDXowXDLyb2gB--_mLTsOrnsM',
              },
            },
            publicKeyHex: '3059301306072a8648ce3d020106082a8648ce3d0301070342000424317688335bd8fc27c5fd8d518774c49ccc0244e948731f24dda86461869c72c0d88a6399f17d919c760df1c7b9435e8c170cbc9bda007efbf98b4ec3ab9ec3',
          },
          receiver: {
            keypair: {
              publicKey: {
                crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: 'VAG4ymxDtFeqR_i4AfMLnyD-xd5x58ReJ8ahG_nBOn0', y: 'XuoPHR_fI6U8Q4IFgLTzFZtFE-B3t32LNHk-y2-xIoI',
              },
              privateKey: {
                crv: 'P-256', d: 'Crpq-MG8WB2EBDy7bZnuelJW99tugjCtMNuCObhW4ds', ext: true, key_ops: ['sign'], kty: 'EC', x: 'VAG4ymxDtFeqR_i4AfMLnyD-xd5x58ReJ8ahG_nBOn0', y: 'XuoPHR_fI6U8Q4IFgLTzFZtFE-B3t32LNHk-y2-xIoI',
              },
            },
            publicKeyHex: '3059301306072a8648ce3d020106082a8648ce3d030107034200045401b8ca6c43b457aa47f8b801f30b9f20fec5de71e7c45e27c6a11bf9c13a7d5eea0f1d1fdf23a53c43820580b4f3159b4513e077b77d8b34793ecb6fb12282',
          },
        },
        signature: 'a11774e25d275365b23524cb96155c110ed66eb09400141c040b3066f8fafc11932420d6ad21521696c13d84c5d42094222f9dbce18624243de04013af7782c7',
        meta: { verified: true },
      }],
      nonce: '59345',
      prev: '0000bd897690a066891ee124e68586e989e65205039bbc1795978a4c2f1ce4f8',
    },
  }];
  return blockchain.slice(0, num);
}
