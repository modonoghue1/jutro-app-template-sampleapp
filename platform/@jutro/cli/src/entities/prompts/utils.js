"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePathName = exports.validateName = void 0;

const validateName = name => {
  const formattedName = String(name).trim();

  if (formattedName.length === 0) {
    return 'Name cannot be blank.';
  }

  const validCharacters = new RegExp(/^[a-z0-9-_]+$/i);

  if (!validCharacters.test(formattedName)) {
    return "Invalid project name (only alphanumeric and '-', '_'s characters allowed)";
  }

  const atLeastOneLetter = new RegExp(/[a-zA-Z]/g);

  if (!atLeastOneLetter.test(formattedName)) {
    return 'Name must contain at least one letter.';
  }

  return true;
};

exports.validateName = validateName;

const validatePathName = input => {
  const validPath = new RegExp(/^[a-z0-9-_@:.\\/]+$/i);
  return validPath.test(input);
};

exports.validatePathName = validatePathName;
//# sourceMappingURL=utils.js.map