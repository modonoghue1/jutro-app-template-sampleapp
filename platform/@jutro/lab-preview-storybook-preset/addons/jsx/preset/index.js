"use strict";

const path = require('path');

function config(entry = []) {
  return [...entry, path.resolve(__dirname, './addDecorator')];
}

module.exports = {
  addons: [require.resolve('storybook-addon-jsx/register')],
  config
};
//# sourceMappingURL=index.js.map