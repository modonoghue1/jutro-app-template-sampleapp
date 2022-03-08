"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSelectedDependencies = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _logging = require("../logging");

var _getConsumerApplicationPackage = require("./getConsumerApplicationPackage");

const removeSelectedDependencies = async (unusedDependencies, packagePath, dependencyType, selectedDependencies) => {
  const deletedDependencies = [];
  const pkg = (0, _getConsumerApplicationPackage.getConsumerApplicationPackage)(packagePath);

  if (!(0, _isEmpty.default)(selectedDependencies)) {
    Object.keys(pkg[dependencyType]).forEach(() => {
      selectedDependencies.forEach(item => {
        deletedDependencies.push(unusedDependencies[dependencyType][item]);
        delete pkg[dependencyType][unusedDependencies[dependencyType][item]];
      });
    });
    const uniqDeletedDependencies = (0, _uniq.default)(deletedDependencies);

    _fsExtra.default.writeJSONSync(packagePath, pkg, {
      spaces: 2
    });

    if (selectedDependencies.length === unusedDependencies[dependencyType].length) {
      (0, _logging.logGreen)(`All unused ${dependencyType} have been removed \n`);
    } else {
      (0, _logging.logGreen)(`unused ${uniqDeletedDependencies} ${dependencyType} has been removed \n`);
    }

    (0, _logging.logGreen)(`package.json has been updated for ${dependencyType} \n`);
  } else {
    (0, _logging.logYellowAnnouncement)(`No action has been taken on unused ${dependencyType}`);
  }
};

exports.removeSelectedDependencies = removeSelectedDependencies;
//# sourceMappingURL=removeSelectedDependencies.js.map