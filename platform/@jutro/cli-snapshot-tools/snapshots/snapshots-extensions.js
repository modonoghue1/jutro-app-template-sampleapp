"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendSnapshots = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

const SNAPSHOT_PROPS = ['codemods', 'cssMods', 'diff', 'folderStructure', 'template', 'uiMetadata'];

const extendDefault = (jutroMigration, consumerMigration) => {
  const consumerMigrationArr = (0, _isArray.default)(consumerMigration) ? consumerMigration : [consumerMigration];
  const jutroMigrationArr = (0, _isArray.default)(jutroMigration) ? jutroMigration : [jutroMigration];
  return [...jutroMigrationArr, ...consumerMigrationArr];
};

const jsxReducer = ({
  migration: combinedMigration
}, {
  migration
}) => ({
  migration: [...combinedMigration, ...migration]
});

const extendCss = (jutroCss, consumerCss) => (0, _merge.default)((0, _cloneDeep.default)(jutroCss), consumerCss);

const extendJsx = (jutroJsx, consumerJsx) => {
  const jutroJsxArr = (0, _isArray.default)(jutroJsx) ? jutroJsx : [jutroJsx];
  const jutroMigration = jutroJsxArr.filter(({
    migration
  }) => !(0, _isEmpty.default)(migration));
  const consumerJsxArr = (0, _isArray.default)(consumerJsx) ? consumerJsx : [consumerJsx];
  return [[...jutroMigration, ...consumerJsxArr].reduce(jsxReducer, {
    migration: []
  })];
};

const extendFolderStructure = (jutroFolderStructure, consumerFolderStructure) => consumerFolderStructure;

const extendTemplate = (jutroTemplate, consumerTemplate) => {
  const templateWithExtendedDependencies = ['dependencies', 'devDependencies', 'peerDependencies', 'scripts', 'engines'].reduce((acc, field) => ({ ...acc,
    [field]: { ...consumerTemplate[field],
      ...jutroTemplate[field]
    }
  }), jutroTemplate);
  return ['deprecatedPackages', 'packagesToRemove'].reduce((acc, field) => ({ ...acc,
    [field]: [...(0, _get.default)(jutroTemplate, field, []), ...(0, _get.default)(consumerTemplate, field, [])]
  }), templateWithExtendedDependencies);
};

const functionMap = {
  template: extendTemplate,
  folderStructure: extendFolderStructure,
  codemods: extendJsx,
  cssMods: extendCss
};

const extendSnapshot = (jutroSnapshot, consumerSnapshot) => {
  console.log(`jutro-cli: loaded with extension on migration snapshot ${jutroSnapshot.version}`);
  return SNAPSHOT_PROPS.reduce((acc, key) => {
    if (consumerSnapshot[key]) {
      const extendor = functionMap[key] || extendDefault;

      if (jutroSnapshot[key]) {
        return { ...acc,
          [key]: extendor(jutroSnapshot[key], consumerSnapshot[key])
        };
      }

      return { ...acc,
        [key]: consumerSnapshot[key]
      };
    }

    return acc;
  }, jutroSnapshot);
};

const extendSnapshots = async (versionSnapshots, consumerSnapshots) => {
  if (!consumerSnapshots) {
    return versionSnapshots;
  }

  const extendedSnapshots = versionSnapshots.map(jutroSnapshot => consumerSnapshots[jutroSnapshot.version] ? extendSnapshot(jutroSnapshot, consumerSnapshots[jutroSnapshot.version]) : jutroSnapshot);
  return extendedSnapshots;
};

exports.extendSnapshots = extendSnapshots;
//# sourceMappingURL=snapshots-extensions.js.map