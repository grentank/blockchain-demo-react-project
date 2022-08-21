export function generateKeyPair() {
  return window.crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    //   modulusLength: 2048,
    //   publicExponent: new Uint8Array([1, 0, 1]),
    //   hash: { name: 'SHA-256' },
    },
    true,
    ['sign', 'verify'],
  );
}

export async function signTransaction(transaction) {
  return window.crypto.subtle.sign(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-256' },
    },
    await window.crypto.subtle.importKey(
      'jwk',
      transaction.data.sender.keypair.privateKey,
      {
        name: 'ECDSA',
        namedCurve: 'P-256',
      },
      true,
      ['sign'],
    ),
    Buffer.from(JSON.stringify(transaction.data)),
  ).then((sig) => ({
    ...transaction,
    // sig,
    // _sig: Buffer.from(sig).toString(),
    // parsedsig: new TextEncoder().encode(Buffer.from(sig).toString()).buffer,
    // sig: Buffer.from(sig),
    signature: Buffer.from(sig).toString('hex'),
  }));
}

export async function verifyTransaction(transaction) {
  return window.crypto.subtle.verify(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-256' },
    //   name: 'RSA-PSS',
    //   saltLength: 128,
    },
    await window.crypto.subtle.importKey(
      'jwk',
      transaction.data.sender.keypair.publicKey,
      {
        name: 'ECDSA',
        namedCurve: 'P-256',
      },
      true,
      ['verify'],
    ),
    // new TextEncoder().encode(transaction._sig).buffer,
    Uint8Array.from(Buffer.from(transaction.signature, 'hex')),
    Buffer.from(JSON.stringify(transaction.data)),
  );
}

export async function generateVerifiedTransaction(amount) {
  const sender = { keypair: await generateKeyPair() };
  const receiver = { keypair: await generateKeyPair() };
  sender.publicKeyHex = Buffer.from(await window.crypto.subtle.exportKey('spki', sender.keypair.publicKey)).toString('hex');
  receiver.publicKeyHex = Buffer.from(await window.crypto.subtle.exportKey('spki', receiver.keypair.publicKey)).toString('hex');
  const data = { sender, receiver, amount };
  return signTransaction({ data })
    .then((transaction) => ({ ...transaction, meta: { verified: true } }));
}

export async function generateTransactionNoVerification(amount) {
  const sender = { keypair: await generateKeyPair() };
  const receiver = { keypair: await generateKeyPair() };
  sender.publicKeyHex = Buffer.from(await window.crypto.subtle.exportKey('spki', sender.keypair.publicKey)).toString('hex');
  receiver.publicKeyHex = Buffer.from(await window.crypto.subtle.exportKey('spki', receiver.keypair.publicKey)).toString('hex');
  const data = { sender, receiver, amount };
  return { data, meta: { verified: null }, signature: '' };
}

export async function generatePeer() {
  const keypair = await generateKeyPair();
  const peer = {
    keypair: {
      publicKey: await window.crypto.subtle.exportKey('jwk', keypair.publicKey),
      privateKey: await window.crypto.subtle.exportKey('jwk', keypair.privateKey),
    },
    publicKeyHex: Buffer.from(await window.crypto.subtle.exportKey('spki', keypair.publicKey)).toString('hex'),
  };
  return peer;
}

export async function generateP2PTransaction(data) {
  // console.log('Generating transaction:', data);
  return signTransaction({ data })
    .then((transaction) => ({ ...transaction, meta: { verified: true } }));
}
// export async function generateTwoKeyPairs() {
//   const sender = { keypair: await generateKeyPair() };
// }
