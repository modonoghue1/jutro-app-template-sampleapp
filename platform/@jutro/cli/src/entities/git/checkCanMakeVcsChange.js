"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkCanMakeVcsChange = void 0;

var _checkoutBranch = require("./checkoutBranch");

const checkCanMakeVcsChange = async (skipVcs, branchName) => skipVcs ? false : (0, _checkoutBranch.checkoutBranch)(branchName);

exports.checkCanMakeVcsChange = checkCanMakeVcsChange;
//# sourceMappingURL=checkCanMakeVcsChange.js.map