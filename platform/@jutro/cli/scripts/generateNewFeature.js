"use strict";

const fs = require('fs-extra');

const path = require('path');

const args = process.argv.slice(2);

if (!args.length) {
  console.log('You need to pass a feature name');
  process.exit(1);
}

const featureName = args[0];
let featureVersion;

if (args.length > 1) {
  featureVersion = args[1];
} else {
  const cliPackage = fs.readJsonSync('package.json');
  const version = cliPackage.version;
  featureVersion = version;
}

const featureOutputDir = path.resolve(process.cwd(), `src/features/${featureName}`);
const snapshotTemplateDir = path.resolve(process.cwd(), 'src/templates/snapshot');
fs.copySync(snapshotTemplateDir, featureOutputDir);
const featurePackageTemplateLocation = `${featureOutputDir}/package-template.json`;
const featurePackageTemplate = fs.readJSONSync(featurePackageTemplateLocation);
const updatedFeaturePackageTemplate = { ...featurePackageTemplate,
  version: featureVersion,
  name: featureName
};
fs.outputJSONSync(featurePackageTemplateLocation, updatedFeaturePackageTemplate, {
  spaces: 2
});
console.log(`Feature ${featureName} added in Jutro version ${featureVersion}`);
console.log(`Created new feature template in ${featureOutputDir}`);
console.log('Next you should add the CLI command for the feature under bin/add-ons');
//# sourceMappingURL=generateNewFeature.js.map