"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateFeaturePackage = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _getConsumerApplicationVersion = require("./getConsumerApplicationVersion");

var _getConsumerApplicationPackage = require("./getConsumerApplicationPackage");

var _isJutroDependency = require("./isJutroDependency");

const getDependenciesWithFeatureItems = (currentAppPackage, currentAppVersion, featureTemplate, dependencyType) => {
  let currentAppDependencies = currentAppPackage[dependencyType];
  let featureDependencies = featureTemplate[dependencyType];
  currentAppDependencies = currentAppDependencies || {};
  featureDependencies = featureDependencies || {};

  const reduceDependencies = (acc, dependency) => {
    if ((0, _isJutroDependency.isJutroDependency)(dependency)) {
      return { ...acc,
        [dependency]: currentAppVersion
      };
    }

    return { ...acc,
      [dependency]: featureDependencies[dependency]
    };
  };

  const mappedFeatureDependencies = Object.keys(featureDependencies).reduce(reduceDependencies, {});
  return { ...currentAppDependencies,
    ...mappedFeatureDependencies
  };
};

const addFeatureTemplateItems = (currentAppPackage, currentAppVersion, featureTemplate) => {
  let featureScripts = featureTemplate.scripts;
  let currentAppScripts = currentAppPackage.scripts;
  featureScripts = featureScripts || {};
  currentAppScripts = currentAppScripts || {};
  const updatedDependencies = getDependenciesWithFeatureItems(currentAppPackage, currentAppVersion, featureTemplate, 'dependencies');
  const updatedDevDependencies = getDependenciesWithFeatureItems(currentAppPackage, currentAppVersion, featureTemplate, 'devDependencies');
  const updatedPeerDependencies = getDependenciesWithFeatureItems(currentAppPackage, currentAppVersion, featureTemplate, 'peerDependencies');
  return { ...currentAppPackage,
    dependencies: updatedDependencies,
    devDependencies: updatedDevDependencies,
    peerDependencies: updatedPeerDependencies,
    scripts: { ...currentAppScripts,
      ...featureScripts
    }
  };
};

const migrateFeaturePackage = ({
  snapshot,
  packagePath = 'package.json'
}) => {
  const currentAppVersion = (0, _getConsumerApplicationVersion.getConsumerApplicationVersion)(packagePath);
  const consumerAppPackage = (0, _getConsumerApplicationPackage.getConsumerApplicationPackage)(packagePath);
  const template = snapshot.template;
  const packageUpdatedForFeature = addFeatureTemplateItems(consumerAppPackage, currentAppVersion, template);

  _fsExtra.default.outputJSONSync(packagePath, packageUpdatedForFeature, {
    spaces: 2
  });
};

exports.migrateFeaturePackage = migrateFeaturePackage;
//# sourceMappingURL=migrateFeaturePackage.js.map