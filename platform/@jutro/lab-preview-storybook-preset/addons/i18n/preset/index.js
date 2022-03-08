"use strict";

const path = require('path');

function managerEntries(entry = []) {
  return [...entry, path.resolve(__dirname, '../register')];
}

function config(entry = [], {
  addDecorator = true
} = {}) {
  const i18nConfig = [];

  if (addDecorator) {
    i18nConfig.push(path.resolve(__dirname, './addDecorator'));
  }

  return [...entry, ...i18nConfig];
}

module.exports = {
  managerEntries,
  config
};
//# sourceMappingURL=index.js.map