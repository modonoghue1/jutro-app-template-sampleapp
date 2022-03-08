"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkoutBranch = void 0;

var _promise = _interopRequireDefault(require("simple-git/promise"));

var _logging = require("../logging");

const checkoutBranch = async branchName => {
  try {
    await (0, _promise.default)().checkout(['-b', branchName]);
    (0, _logging.log)(`Checked out branch ${branchName}`);
    return true;
  } catch {
    (0, _logging.logRed)(`Unable to create git branch ${branchName}`);
    return false;
  }
};

exports.checkoutBranch = checkoutBranch;
//# sourceMappingURL=checkoutBranch.js.map