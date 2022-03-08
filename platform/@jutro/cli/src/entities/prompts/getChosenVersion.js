"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChosenVersion = void 0;

var _snapshots = require("../snapshots");

var _promptVersionToMigrate = require("./promptVersionToMigrate");

const getChosenVersion = (toVersionParam, allAvailableSnapshots) => {
  const availableVersions = allAvailableSnapshots.map(snapshot => snapshot.version);
  return toVersionParam ? (0, _snapshots.retrieveVersionToMigrate)(toVersionParam, availableVersions) : (0, _promptVersionToMigrate.promptVersionToMigrate)(availableVersions);
};

exports.getChosenVersion = getChosenVersion;
//# sourceMappingURL=getChosenVersion.js.map