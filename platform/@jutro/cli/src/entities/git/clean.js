"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = void 0;

var _child_process = require("child_process");

var _logging = require("../logging");

const clean = filePattern => {
  try {
    console.log(`Cleaning all: ${filePattern}`);
    (0, _child_process.execSync)(`git clean -f ${filePattern}`);
  } catch (e) {
    (0, _logging.logYellow)(`Unable to git clean: ${filePattern}\n${e}`);
  }
};

exports.clean = clean;
//# sourceMappingURL=clean.js.map