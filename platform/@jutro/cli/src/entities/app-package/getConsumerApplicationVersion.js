"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConsumerApplicationVersion = void 0;

var _semver = require("semver");

var _retrieveJutroDependency = require("./retrieveJutroDependency");

var _getConsumerApplicationPackage = require("./getConsumerApplicationPackage");

var _logging = require("../logging");

const getConsumerApplicationVersion = (packageSource = 'package.json') => {
  const pkg = (0, _getConsumerApplicationPackage.getConsumerApplicationPackage)(packageSource);

  if (!pkg) {
    return null;
  }

  if (pkg && pkg.dependencies) {
    const dependencies = pkg.dependencies;
    const namedDependencies = Object.keys(dependencies);
    const foundJutroDependency = (0, _retrieveJutroDependency.retrieveJutroDependency)(namedDependencies);

    if (foundJutroDependency && (0, _semver.valid)(dependencies[foundJutroDependency])) {
      return dependencies[foundJutroDependency];
    }

    (0, _logging.logYellow)(`${packageSource} does not contain Jutro dependencies.`);
  } else {
    (0, _logging.logYellow)(`${packageSource} does not contain dependencies`);
  }

  return null;
};

exports.getConsumerApplicationVersion = getConsumerApplicationVersion;
//# sourceMappingURL=getConsumerApplicationVersion.js.map