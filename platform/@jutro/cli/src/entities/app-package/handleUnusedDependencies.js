"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUnusedDependencies = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _logging = require("../logging");

var _removeSelectedDependencies = require("./removeSelectedDependencies");

var _prompts = require("../prompts");

const handleUnusedDependencies = async ({
  snapshots,
  consoleCapture,
  fromCi = false,
  packagePath,
  unusedDependencies,
  verbose
}) => {
  (0, _logging.logAnnouncement)('Dependencies declarations check start...');
  const removeDependenciesByType = makeRemoveDependenciesByType({
    packagePath,
    unusedDependencies,
    snapshots,
    fromCi,
    verbose,
    consoleCapture
  });
  await removeDependenciesByType('dependencies');
  await removeDependenciesByType('devDependencies');
};

exports.handleUnusedDependencies = handleUnusedDependencies;

const logUnusedDependencies = async (type, unusedDependencies, snapshots) => {
  (0, _logging.logBlueBrightAnnouncement)(`Checking history of ${type} in the previous releases`);
  const reversedAvailableSnapshots = [...snapshots].reverse();
  unusedDependencies[type].forEach(item => {
    const lastSnapshotWithVersion = reversedAvailableSnapshots.find(snapshot => !!snapshot.template[type][item]);

    if (lastSnapshotWithVersion) {
      (0, _logging.log)(`${_chalk.default.red(item)} was a Jutro dependency in versions up to and including ${_chalk.default.red(lastSnapshotWithVersion.version)}. It has since been removed from Jutro and may not be needed in your application.`);
    } else {
      (0, _logging.log)(`${_chalk.default.red(item)} is not a Jutro dependency but may be needed in your application.`);
    }
  });
};

const makeRemoveDependenciesByType = ({
  packagePath,
  unusedDependencies,
  snapshots,
  fromCi,
  verbose,
  consoleCapture
}) => async dependencyType => {
  if (!(0, _isNil.default)(unusedDependencies[dependencyType]) && unusedDependencies[dependencyType].length !== 0) {
    await logUnusedDependencies(dependencyType, unusedDependencies, snapshots);
    const potentialSelectedDependencies = unusedDependencies[dependencyType];
    const selectedDependencies = await (0, _prompts.promptUserForUnusedDependencies)(potentialSelectedDependencies, dependencyType, verbose, consoleCapture, fromCi);
    (0, _removeSelectedDependencies.removeSelectedDependencies)(unusedDependencies, packagePath, dependencyType, selectedDependencies);
  }
};
//# sourceMappingURL=handleUnusedDependencies.js.map