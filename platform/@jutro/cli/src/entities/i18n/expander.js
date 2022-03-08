"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllChars = getAllChars;
exports.addPadding = exports.PADDING_CHARS = exports.EMOJI_PADDING_CHARS = exports.PADDING_DELIMITER = void 0;
const PADDING_DELIMITER = ':::';
exports.PADDING_DELIMITER = PADDING_DELIMITER;
const EMOJI_PADDING_CHARS = ['🐔', '🏆', '🤙', '🤯', '🎆'];
exports.EMOJI_PADDING_CHARS = EMOJI_PADDING_CHARS;
const PADDING_CHARS = ['𠜎', '𠜱', '𠲖', '𠴕', '𢺳', '𠸏', 'дд', 'ςς', 'ते', 'жж', 'க்', 'లో', 'юю', 'ြြ', 'ਲੋ', 'ਹੈ', 'թթ', 'তা'];
exports.PADDING_CHARS = PADDING_CHARS;

function getAllChars() {
  return EMOJI_PADDING_CHARS.concat(PADDING_CHARS);
}

const addPadding = str => {
  let paddedStr = str + PADDING_DELIMITER;
  let ratio = 0.3;

  if (str.length <= 10) {
    ratio = 1;
  } else if (str.length > 10 && str.length <= 20) {
    ratio = 0.5;
  }

  let paddingLength = Math.max(Math.round(str.length * ratio) - 3, 2);
  const randIndex = Math.floor(Math.random() * EMOJI_PADDING_CHARS.length);
  paddedStr += EMOJI_PADDING_CHARS[randIndex];
  paddingLength -= 2;
  const allChars = getAllChars();

  while (paddingLength > 0) {
    const index = Math.floor(Math.random() * allChars.length);
    paddedStr += allChars[index];
    paddingLength -= allChars[index].length;
  }

  return paddedStr;
};

exports.addPadding = addPadding;
//# sourceMappingURL=expander.js.map