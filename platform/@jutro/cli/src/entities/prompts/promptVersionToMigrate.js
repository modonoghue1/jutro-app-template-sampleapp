"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptVersionToMigrate = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _promptsWrapper = require("./promptsWrapper");

const promptVersionToMigrate = async (availableVersions = []) => {
  const numAvailableVersions = (0, _get.default)(availableVersions, 'length', 0);

  if (!numAvailableVersions) {
    return null;
  }

  const options = availableVersions.map(version => ({
    title: version,
    value: version
  }));
  const response = await (0, _promptsWrapper.prompt)({
    type: 'select',
    name: 'version',
    message: 'Please choose the version to migrate to',
    choices: options
  });
  return response.version;
};

exports.promptVersionToMigrate = promptVersionToMigrate;
//# sourceMappingURL=promptVersionToMigrate.js.map