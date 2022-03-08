"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPatches = void 0;

var _child_process = require("child_process");

var _logging = require("../logging");

const addPatches = () => {
  try {
    console.log(`Adding all patches`);
    (0, _child_process.execSync)(`git add -p -A *.rej`);
  } catch (e) {
    (0, _logging.logYellow)(`Unable add patches:\n${e}`);
  }
};

exports.addPatches = addPatches;
//# sourceMappingURL=addPatches.js.map