"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDuplicateDependencies = void 0;

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _get = _interopRequireDefault(require("lodash/get"));

var _path = _interopRequireDefault(require("path"));

var _getConsumerApplicationPackage = require("./getConsumerApplicationPackage");

var _getFlattenedDependencies = require("./getFlattenedDependencies");

const allFields = ['dependencies', 'devDependencies', 'peerDependencies'];

const getDuplicateDependencies = (packagePath, consumerPackage) => {
  const sourcePackage = consumerPackage || (0, _getConsumerApplicationPackage.getConsumerApplicationPackage)(_path.default.resolve(process.cwd(), packagePath));
  const uniqueDependencies = getUniqueDependencies(sourcePackage);
  const duplicateDependecies = getDependencies(uniqueDependencies, sourcePackage);
  return duplicateDependecies;
};

exports.getDuplicateDependencies = getDuplicateDependencies;

const getUniqueDependencies = packageJson => {
  const flattenedListOfAllDependencies = (0, _getFlattenedDependencies.getFlattenedDependencies)(allFields, packageJson);
  return Object.keys(flattenedListOfAllDependencies).filter(dependency => {
    const isDependency = !!(0, _get.default)(packageJson, ['dependencies', dependency]);
    const isDevDependency = !!(0, _get.default)(packageJson, ['devDependencies', dependency]);
    const isPeerDependency = !!(0, _get.default)(packageJson, ['peerDependencies', dependency]);
    return !(isDependency && isDevDependency) && !(isDependency && isPeerDependency) && !(isDevDependency && isPeerDependency);
  });
};

const getDependencies = (uniquePackages, sourcePackage) => allFields.reduce((acc, category) => {
  if (!(0, _isNil.default)(sourcePackage[category])) {
    const dependencies = Object.keys(sourcePackage[category]).filter(element => !uniquePackages.includes(element));
    dependencies.forEach(pack => {
      acc.push([category, pack]);
    });
  }

  return acc;
}, []);
//# sourceMappingURL=getDuplicateDependencies.js.map