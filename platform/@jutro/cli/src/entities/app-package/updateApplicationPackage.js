"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateApplicationPackage = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _xor = _interopRequireDefault(require("lodash/xor"));

var _chalk = _interopRequireDefault(require("chalk"));

var _retrieveJutroDependency = require("./retrieveJutroDependency");

var _logging = require("../logging");

var _getDuplicateDependencies = require("./getDuplicateDependencies");

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

const allFields = ['dependencies', 'devDependencies', 'peerDependencies', 'engines', 'scripts'];

const generateUpdate = ({
  merger,
  initialObject = {},
  fieldsToUpdate
}) => fieldsToUpdate.reduce((acc, field) => ({ ...acc,
  [field]: merger(field)
}), initialObject);

const updateApplicationPackage = ({
  applicationPackage,
  currentVersion: currentApplicationVersion,
  fieldsToUpdate = allFields,
  getChangesToMerge = getChangesToMergeForAppPackage,
  packagePath,
  templatePackage
}) => {
  if (!applicationPackage || !currentApplicationVersion) {
    (0, _logging.logRed)(`Could not find suitable package.json file at location '${packagePath}', cannot perform update.`);
    return applicationPackage;
  }

  if (!templatePackage) {
    (0, _logging.logGreen)(`${currentApplicationVersion} is up to date. No changes made`);
    return applicationPackage;
  }

  const duplicateDependecies = (0, _getDuplicateDependencies.getDuplicateDependencies)(packagePath, applicationPackage);
  const duplicateDependenciesToRemove = getDuplicateDependenciesToRemove({
    templatePackage,
    duplicateDependecies
  });
  let updatedAppPackage = applicationPackage;
  updatedAppPackage = doDelete(duplicateDependenciesToRemove, updatedAppPackage, 'duplicate');
  const dependenciesToRemove = getDependenciesToRemove({
    sourcePackage: updatedAppPackage,
    packagesToRemove: templatePackage.packagesToRemove,
    fieldsToUpdate
  });
  updatedAppPackage = doDelete(dependenciesToRemove, updatedAppPackage, 'removed');
  const changesToMerge = getChangesToMerge({
    sourcePackage: updatedAppPackage,
    templatePackage,
    fieldsToUpdate
  });

  if (dependenciesToRemove.length === 0 && (0, _isNil.default)(changesToMerge)) {
    return false;
  }

  if (!(0, _isNil.default)(changesToMerge)) {
    updatedAppPackage = doMerge({
      changesToMerge,
      fieldsToUpdate,
      sourcePackage: updatedAppPackage
    });
  }

  const newVersion = templatePackage.version;
  (0, _logging.logGreen)(`package.json has been migrated from ${currentApplicationVersion} to ${newVersion}`);
  return updatedAppPackage;
};

exports.updateApplicationPackage = updateApplicationPackage;

const getChangesToMergeForAppPackage = ({
  sourcePackage,
  templatePackage,
  fieldsToUpdate
}) => {
  const merger = field => getChangesInTemplateForAppPackage(sourcePackage[field], templatePackage[field], field, templatePackage.version);

  return generateUpdate({
    merger,
    fieldsToUpdate
  });
};

function getChangesInTemplateForAppPackage(sourceObj, templateObj, type, templateVersion) {
  (0, _logging.logBlueBrightAnnouncement)(type);
  const sourceArray = Object.entries(sourceObj || {});
  const templateArray = Object.entries(templateObj || {});
  const diffItems = (0, _xor.default)(sourceArray, templateArray);
  const diffsInTemplate = [];
  diffItems.forEach(([dependency, version]) => {
    if (!sourceArray.find(([sourceDependency]) => dependency === sourceDependency)) {
      (0, _logging.log)(`Adding ${_chalk.default.green(dependency)} as a new ${type}`);
      diffsInTemplate.push([dependency, version]);
    }

    if (!templateArray.find(([templateDependency]) => dependency === templateDependency)) {
      (0, _logging.log)(`${_chalk.default.red(dependency)} is not a part of this version's Jutro ${type}. Make sure it is necessary for your application and if not, remove it.`);
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
}

const getDependenciesToRemove = ({
  sourcePackage,
  packagesToRemove = [],
  fieldsToUpdate
}) => packagesToRemove.reduce((acc, {
  packageName,
  message
}) => {
  const foundDependencies = fieldsToUpdate.flatMap(type => {
    if ((0, _isUndefined.default)(sourcePackage[type])) return [];
    const sourceArray = Object.entries(sourcePackage[type] || {});
    return sourceArray.filter(([dependency]) => packageName === dependency).map(([dependency]) => {
      (0, _logging.logYellow)(message);
      return [type, dependency];
    });
  });
  return [...acc, ...foundDependencies];
}, []);

const doMerge = ({
  changesToMerge,
  fieldsToUpdate,
  sourcePackage
}) => {
  const merger = field => getMergePackage(sourcePackage[field], changesToMerge[field], field);

  const updated = generateUpdate({
    merger,
    initialObject: sourcePackage,
    fieldsToUpdate
  });

  function getMergePackage(source = {}, target = []) {
    return target.reduce((acc, [entry, value]) => ({ ...acc,
      [entry]: value
    }), source);
  }

  return updated;
};

const doDelete = (changesToDelete = [], sourcePackage, actionType) => changesToDelete.reduce((acc, [field, dependencyToRemove]) => {
  const _acc$field = acc[field],
        depToRemove = _acc$field[dependencyToRemove],
        fieldWithoutDependency = (0, _objectWithoutProperties2.default)(_acc$field, [dependencyToRemove].map(_toPropertyKey));
  (0, _logging.logYellow)(`Removing ${actionType} ${dependencyToRemove} as a ${field}`);
  return { ...acc,
    [field]: fieldWithoutDependency
  };
}, sourcePackage);

const getDuplicateDependenciesToRemove = ({
  templatePackage,
  duplicateDependecies
}) => duplicateDependecies.reduce((acc, [field, dependencyToRemove]) => {
  if (!(0, _isUndefined.default)(templatePackage[field])) {
    const type = Object.keys(templatePackage[field]);

    if (!type.includes(dependencyToRemove)) {
      acc.push([field, dependencyToRemove]);
    }
  }

  return acc;
}, []);
//# sourceMappingURL=updateApplicationPackage.js.map