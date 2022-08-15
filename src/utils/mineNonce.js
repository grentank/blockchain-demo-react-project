import hashIsValid from './hashIsValid';
import sha256 from './sha256';

export default async function mineNonce(data) {
  for (let i = 0; i < 1e6; i += 1) {
    const hash = await sha256({ ...data, nonce: i.toString() });
    if (hashIsValid(hash)) {
      return { ...data, hash, nonce: i.toString() };
    }
  }
  return data;
}
