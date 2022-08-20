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

export function signTransaction(transaction) {
  return window.crypto.subtle.sign(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-256' },
    //   name: 'RSA-PSS',
    //   saltLength: 128,
    },
    transaction.data.sender.keypair.privateKey,
    Buffer.from(JSON.stringify(transaction.data)),
  ).then((sig) => ({
    ...transaction,
    _sig: sig,
    signature: Buffer.from(sig).toString('hex'),
  }));
}

export function verifyTransaction(transaction) {
  return window.crypto.subtle.verify(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-256' },
    //   name: 'RSA-PSS',
    //   saltLength: 128,
    },
    transaction.data.sender.keypair.publicKey,
    transaction._sig,
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
// export async function generateTwoKeyPairs() {
//   const sender = { keypair: await generateKeyPair() };
// }
