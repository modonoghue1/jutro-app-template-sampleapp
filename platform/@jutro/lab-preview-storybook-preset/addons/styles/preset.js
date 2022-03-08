"use strict";

const path = require('path');

function config(entry = []) {
  return [...entry, path.resolve(__dirname, './addStyles')];
}

module.exports = {
  config
};
//# sourceMappingURL=preset.js.map