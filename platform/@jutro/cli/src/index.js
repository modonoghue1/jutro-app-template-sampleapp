"use strict";

const _require = require('path'),
      resolve = _require.resolve;

const _require2 = require('fs-extra'),
      pathExistsSync = _require2.pathExistsSync;

const babelConfig = resolve(__dirname, '../../..', 'babel.config.js');

if (typeof true === 'undefined' && pathExistsSync(babelConfig)) {
  require('@babel/register')({
    envName: 'cli',
    extensions: ['.ts', '.tsx', '.es6', '.es', '.jsx', '.js', '.mjs'],
    extends: babelConfig,
    ignore: [/node_modules/]
  });
}

const _require3 = require('./commands-pipelines'),
      addAuth = _require3.addAuth,
      applyCodemods = _require3.applyCodemods,
      checkAppVersion = _require3.checkAppVersion,
      checkDependencies = _require3.checkDependencies,
      checkEnvironment = _require3.checkEnvironment,
      checkFolderStructure = _require3.checkFolderStructure,
      checkMetadata = _require3.checkMetadata,
      clearDeprecated = _require3.clearDeprecated,
      extractMessages = _require3.extractMessages,
      extractMessagesJSX = _require3.extractMessagesJSX,
      generateBuildInfo = _require3.generateBuildInfo,
      generateComponent = _require3.generateComponent,
      generatePackageTemplate = _require3.generatePackageTemplate,
      generatePage = _require3.generatePage,
      generatePseudo = _require3.generatePseudo,
      generateSnapshot = _require3.generateSnapshot,
      mergeTranslations = _require3.mergeTranslations,
      mergeBizCompTranslations = _require3.mergeBizCompTranslations,
      migrateMetadata = _require3.migrateMetadata,
      migrateUsingFeatureSnapshot = _require3.migrateUsingFeatureSnapshot,
      updateAnalyticsConfig = _require3.updateAnalyticsConfig,
      updateApp = _require3.updateApp,
      updateAppShell = _require3.updateAppShell,
      updateCommitHooks = _require3.updateCommitHooks,
      updateCss = _require3.updateCss,
      updateDependencies = _require3.updateDependencies,
      updateMetadataSchema = _require3.updateMetadataSchema,
      updateModule = _require3.updateModule,
      updateScripts = _require3.updateScripts;

const _require4 = require('./entities/codemods'),
      runSnapshotCodemods = _require4.runSnapshotCodemods;

const _require5 = require('./entities/config-files'),
      updateApplicationConfiguration = _require5.updateApplicationConfiguration;

const _require6 = require('./entities/logging'),
      log = _require6.log,
      logYellow = _require6.logYellow,
      captureConsole = _require6.captureConsole;

const _require7 = require('./entities/prompts'),
      promptUpdateConsumerConfig = _require7.promptUpdateConsumerConfig,
      promptEnableCliAnalytics = _require7.promptEnableCliAnalytics;

const _require8 = require('./outputLogo'),
      outputLogo = _require8.outputLogo;

const _require9 = require('./entities/i18n'),
      Pseudolizer = _require9.Pseudolizer;

const _require10 = require('./entities/glob'),
      globIgnorePatterns = _require10.globIgnorePatterns;

module.exports = {
  addAuth,
  applyCodemods,
  captureConsole,
  checkAppVersion,
  checkDependencies,
  checkEnvironment,
  checkFolderStructure,
  checkMetadata,
  clearDeprecated,
  extractMessages,
  extractMessagesJSX,
  generateBuildInfo,
  generateComponent,
  generatePage,
  generatePackageTemplate,
  generatePseudo,
  generateSnapshot,
  log,
  logYellow,
  mergeTranslations,
  mergeBizCompTranslations,
  migrateMetadata,
  migrateUsingFeatureSnapshot,
  outputLogo,
  promptUpdateConsumerConfig,
  Pseudolizer,
  runSnapshotCodemods,
  updateAnalyticsConfig,
  updateApp,
  updateApplicationConfiguration,
  updateAppShell,
  updateCommitHooks,
  updateCss,
  updateDependencies,
  updateMetadataSchema,
  updateModule,
  updateScripts,
  promptEnableCliAnalytics,
  globIgnorePatterns
};
//# sourceMappingURL=index.js.map