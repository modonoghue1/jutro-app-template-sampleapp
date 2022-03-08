"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stageAndCommit = void 0;

var _promise = _interopRequireDefault(require("simple-git/promise"));

var _logging = require("../logging");

const addStagedFiles = async files => {
  try {
    await (0, _promise.default)().add(files);
    return true;
  } catch (e) {
    (0, _logging.logRed)(`Unable to add ${files} to VCS:\n${e}`);
    return false;
  }
};

const commitChanges = async message => {
  try {
    if ((await (0, _promise.default)().status()).staged.length) {
      await (0, _promise.default)().commit(message);
      (0, _logging.log)(`VCS commit: ${message}`);
    }

    return true;
  } catch (e) {
    (0, _logging.logRed)(`Unable to commit using message ${message}:\n${e}`);
    return false;
  }
};

const stageAndCommit = async (canMakeVCSChanges, files, commitMessage) => {
  if (!canMakeVCSChanges) {
    return false;
  }

  await addStagedFiles(files);
  return commitChanges(commitMessage);
};

exports.stageAndCommit = stageAndCommit;
//# sourceMappingURL=stageAndCommit.js.map