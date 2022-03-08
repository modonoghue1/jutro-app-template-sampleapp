"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateModulePackage = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _xor = _interopRequireDefault(require("lodash/xor"));

var _chalk = _interopRequireDefault(require("chalk"));

var _logging = require("../logging");

var _retrieveJutroDependency = require("./retrieveJutroDependency");

var _updateApplicationPackage = require("./updateApplicationPackage");

var _getFlattenedDependencies = require("./getFlattenedDependencies");

const generateUpdate = ({
  merger,
  initialObject = {},
  fieldsToUpdate
}) => fieldsToUpdate.reduce((acc, field) => ({ ...acc,
  [field]: merger(field)
}), initialObject);

const getChangesInTemplateForModule = (sourceObj = {}, templateObj = {}, type, templateVersion) => {
  (0, _logging.logBlueBrightAnnouncement)(type);
  const sourceArray = Object.entries(sourceObj);
  const templateArray = Object.entries(templateObj);
  const diffItems = (0, _xor.default)(sourceArray, templateArray);
  const diffsInTemplate = [];
  diffItems.forEach(([dependency, version]) => {
    if (!templateArray.find(([templateDependency]) => dependency === templateDependency)) {
      (0, _logging.log)(`${_chalk.default.red(dependency)} is not a part of this version's Jutro ${type}. Make sure it is necessary for your module and if not, remove it.`);
      diffsInTemplate.push([dependency, (0, _retrieveJutroDependency.retrieveJutroDependency)([dependency]) ? templateVersion : version]);
    }

    sourceArray.forEach(([sourceDependency, sourceVersion]) => {
      if (dependency === sourceDependency && version !== sourceVersion) {
        (0, _logging.log)(`Migrating ${_chalk.default.yellowBright(dependency)} from ${_chalk.default.yellow(sourceVersion)} to ${_chalk.default.yellowBright(version)}`);
        diffsInTemplate.push([dependency, version]);
      }
    });
  });

  if (diffsInTemplate.length === 0) {
    (0, _logging.log)(`No actions taken for ${type}`);
  }

  (0, _logging.logBlueBrightAnnouncement)(type);
  return diffsInTemplate;
};

const getAllDependenciesInEveryCategory = ({
  fieldsToUpdate,
  templatePackage
}) => {
  const dependenciesToUpdate = fieldsToUpdate.filter(field => field.includes('dependencies') || field.includes('Dependencies'));
  const flattenedListOfAllDependencies = (0, _getFlattenedDependencies.getFlattenedDependencies)(dependenciesToUpdate, templatePackage);
  return dependenciesToUpdate.reduce((acc, dependencyType) => ({ ...acc,
    [dependencyType]: flattenedListOfAllDependencies
  }), templatePackage);
};

const getChangesToMergeForModulePackage = ({
  sourcePackage,
  templatePackage,
  fieldsToUpdate
}) => {
  const updatedTemplatePackage = getAllDependenciesInEveryCategory({
    templatePackage,
    fieldsToUpdate
  });

  const merger = field => getChangesInTemplateForModule(sourcePackage[field], updatedTemplatePackage[field], field, updatedTemplatePackage.version);

  return generateUpdate({
    merger,
    fieldsToUpdate
  });
};

const updateModulePackage = ({
  applicationPackage,
  currentVersion,
  snapshot,
  packagePath
}) => (0, _updateApplicationPackage.updateApplicationPackage)({
  applicationPackage,
  currentVersion,
  templatePackage: (0, _get.default)(snapshot, 'template'),
  packagePath,
  fieldsToUpdate: ['dependencies', 'devDependencies', 'peerDependencies', 'engines'],
  getChangesToMerge: getChangesToMergeForModulePackage
});

exports.updateModulePackage = updateModulePackage;
//# sourceMappingURL=updateModulePackage.js.map