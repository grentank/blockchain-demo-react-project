export default async function sha256(message) {
  // console.log('Hashing:', JSON.stringify(message));
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(JSON.stringify(message));

  // hash the message
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  // console.log('Hashing:', JSON.stringify(message), 'hash: ', hashHex);
  return hashHex;
}
