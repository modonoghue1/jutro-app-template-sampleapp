"use strict";

const path = require('path');

function config(entry = []) {
  return [...entry, path.resolve(__dirname, './addDecorator')];
}

module.exports = {
  config
};
//# sourceMappingURL=preset.js.map