"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSherlock = generateSherlock;

function murmurhash32GC(key, seed) {
  let h1;
  let h1b;
  let k1;
  const remainder = key.length & 3;
  const bytes = key.length - remainder;
  h1 = seed;
  const c1 = 0xcc9e2d51;
  const c2 = 0x1b873593;
  let i = 0;

  while (i < bytes) {
    k1 = key[i] & 0xff | (key[++i] & 0xff) << 8 | (key[++i] & 0xff) << 16 | (key[++i] & 0xff) << 24;
    ++i;
    k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
    k1 = k1 << 15 | k1 >>> 17;
    k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;
    h1 ^= k1;
    h1 = h1 << 13 | h1 >>> 19;
    h1b = (h1 & 0xffff) * 5 + (((h1 >>> 16) * 5 & 0xffff) << 16) & 0xffffffff;
    h1 = (h1b & 0xffff) + 0x6b64 + (((h1b >>> 16) + 0xe654 & 0xffff) << 16);
  }

  k1 = 0;

  switch (remainder) {
    case 3:
      k1 ^= (key[i + 2] & 0xff) << 16;

    case 2:
      k1 ^= (key[i + 1] & 0xff) << 8;

    case 1:
      k1 ^= key[i] & 0xff;
      k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
      k1 = k1 << 15 | k1 >>> 17;
      k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;
      h1 ^= k1;

    default:
  }

  h1 ^= key.length;
  h1 ^= h1 >>> 16;
  h1 = (h1 & 0xffff) * 0x85ebca6b + (((h1 >>> 16) * 0x85ebca6b & 0xffff) << 16) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = (h1 & 0xffff) * 0xc2b2ae35 + (((h1 >>> 16) * 0xc2b2ae35 & 0xffff) << 16) & 0xffffffff;
  h1 ^= h1 >>> 16;
  h1 >>>= 0;
  h1 = swap32ToBigEndianness(h1) >>> 0;
  return h1;
}

function isBigEndian() {
  return new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x12;
}

function swap32ToBigEndianness(val) {
  if (isBigEndian()) {
    return val;
  }

  return (val & 0xff) << 24 | (val & 0xff00) << 8 | val >> 8 & 0xff00 | val >> 24 & 0xff;
}

const radix = 62;
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function generateSherlock(key, source) {
  if (!key || !source) {
    throw new Error('Key and Source cannot be empty');
  }

  const stringBytesArr = convertKeyStringToByteArr(key).concat(convertSourceStringToByteArr(source));
  let hashIntValue = murmurhash32GC(stringBytesArr, 0);
  let result = '';

  while (hashIntValue >= radix) {
    result += digits[hashIntValue % radix];
    hashIntValue = Math.floor(hashIntValue / radix);
  }

  result += digits[hashIntValue];
  return result.split('').reverse().join('');
}

function convertKeyStringToByteArr(key) {
  const arr = [];
  const isLittleEndian = !isBigEndian();

  for (let i = 0, j = 0; i < key.length; i++) {
    const char = key.charCodeAt(i);

    if (isLittleEndian) {
      arr[j++] = char & 0xff;
      arr[j++] = (char & 0xff00) >>> 8;
    } else {
      arr[j++] = (char & 0xff00) >>> 8;
      arr[j++] = char & 0xff;
    }
  }

  return arr;
}

function convertSourceStringToByteArr(source) {
  const utf8 = unescape(encodeURIComponent(source));
  const arr = [];

  for (let i = 0; i < utf8.length; i++) {
    arr.push(utf8.charCodeAt(i));
  }

  return arr;
}
//# sourceMappingURL=sherlock-hasher.js.map