"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCommitHash = void 0;

var _promise = _interopRequireDefault(require("simple-git/promise"));

var _logging = require("../logging");

const getCommitHash = async () => {
  let hash;

  try {
    hash = await (0, _promise.default)().revparse(['--short', 'HEAD']);
  } catch (e) {
    (0, _logging.logRed)(`Unable to parse git commit hash`);
  }

  return hash;
};

exports.getCommitHash = getCommitHash;
//# sourceMappingURL=getCommitHash.js.map