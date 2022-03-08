"use strict";

const path = require('path');

function managerEntries(entry = []) {
  return [...entry, path.resolve(__dirname, './register')];
}

module.exports = {
  managerEntries
};
//# sourceMappingURL=preset.js.map