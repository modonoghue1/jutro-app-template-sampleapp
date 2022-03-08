"use strict";

const path = require('path');

function managerEntries(entry = []) {
  return [...entry, path.resolve(__dirname, '../register')];
}

function config(entry = [], {
  addDecorator = true
} = {}) {
  const themingConfig = [];

  if (addDecorator) {
    themingConfig.push(path.resolve(__dirname, './addDecorator'));
  }

  return [...entry, ...themingConfig];
}

module.exports = {
  managerEntries,
  config
};
//# sourceMappingURL=index.js.map