"use strict";

const path = require('path');

function managerEntries(entry = []) {
  return [...entry, path.resolve(__dirname, '../register')];
}

function config(entry = [], {
  addDecorator = true
} = {}) {
  const metadataOptions = [];

  if (addDecorator) {
    metadataOptions.push(path.resolve(__dirname, './addDecorator'));
  }

  return [...entry, ...metadataOptions];
}

module.exports = {
  managerEntries,
  config
};
//# sourceMappingURL=index.js.map