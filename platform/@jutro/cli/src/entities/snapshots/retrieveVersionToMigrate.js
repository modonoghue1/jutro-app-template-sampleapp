"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveVersionToMigrate = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

const retrieveVersionToMigrate = (chosenVersion, availableVersions) => {
  const numAvailableVersions = (0, _get.default)(availableVersions, 'length', 0);

  if (!numAvailableVersions) {
    return null;
  }

  return chosenVersion === 'latest' ? availableVersions[availableVersions.length - 1] : availableVersions.find(version => version === chosenVersion);
};

exports.retrieveVersionToMigrate = retrieveVersionToMigrate;
//# sourceMappingURL=retrieveVersionToMigrate.js.map