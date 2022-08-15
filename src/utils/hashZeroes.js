import sha256 from './sha256';

const allSymbols = '1234567890-=!@#$%^&*()qwertyuiop[]asdfghjkl;\'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?№йцукеёнгшщзхъфывапролджэячсмитьбюЙЦУКЕЁНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';
const cyrillicLowercaseOnly = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const latinLowercaseOnly = 'abcdefghijklmnopqrstuvwxyz';
const latinLowercaseAndNumbers = '0123456789abcdefghijklmnopqrstuvwxyz';

function constructArray({
  prefix, maxLength, alphabet, list,
}) {
  list.push(prefix);
  if (prefix.length < maxLength) {
    for (let i = 0; i < alphabet.length; i += 1) {
      constructArray({
        prefix: prefix + alphabet[i], maxLength, alphabet, list,
      });
    }
  }
}

function calculateZeroes(text) {
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] !== '0') { return i; }
  }
  return 1;
}

export default async function findHashZeroes() {
  const alphabet = latinLowercaseAndNumbers;
  const list = [];
  constructArray({
    alphabet, list, prefix: '', maxLength: 5,
  });
  let currentZeroes = 0;
  // 3796416
  // 5nfou
  let i = 0;
  console.log(list.length);
  for (i = 0; i < list.length; i += 1) {
    const newHash = await sha256(list[i]);
    if (currentZeroes < calculateZeroes(newHash)) {
      currentZeroes = calculateZeroes(newHash);
      console.log('Word: ', list[i], '\nHash: ', newHash);
    }
    if (i % Math.ceil(list.length / 100) === 0) {
      console.log(`${Math.ceil((i * 100) / list.length)}%...`);
    }
  }
  console.log('Finished!');
}
