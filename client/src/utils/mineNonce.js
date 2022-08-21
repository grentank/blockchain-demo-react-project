import hashIsValid from './hashIsValid';
import sha256 from './sha256';

export default async function mineNonce(block) {
  for (let i = 0; i < 1e6; i += 1) {
    const hash = await sha256({ ...block.data, nonce: i.toString() });
    if (hashIsValid(hash)) {
      return { ...block, hash, data: { ...block.data, nonce: i.toString() } };
    }
  }
  return block;
}
