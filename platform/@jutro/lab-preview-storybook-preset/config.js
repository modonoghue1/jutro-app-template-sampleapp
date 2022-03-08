"use strict";

const _require = require('@jutro/toolset-compilers/webpack/loaders'),
      createStyleLoaders = _require.createStyleLoaders,
      json5Loader = _require.json5Loader,
      svgGwIconLoaderRule = _require.svgGwIconLoaderRule;

const _require2 = require('@jutro/toolset-compilers/webpack/plugins'),
      getGlobalVariablesDefinitionPlugin = _require2.getGlobalVariablesDefinitionPlugin,
      getSvgIconsPlugin = _require2.getSvgIconsPlugin;

const _require3 = require('./utils'),
      appendPlugins = _require3.appendPlugins,
      appendRules = _require3.appendRules,
      appendConfig = _require3.appendConfig,
      createConfig = _require3.createConfig,
      appendEntry = _require3.appendEntry,
      removeLoaderByFilename = _require3.removeLoaderByFilename,
      appendExcludeToRules = _require3.appendExcludeToRules;

const sharedStyleLoadersConfig = createConfig('styleLoader', createStyleLoaders, [{
  include: [process.cwd()]
}]);
const createJutroGlobalDefinitionsPlugin = createConfig('globalVariablesDefinition', getGlobalVariablesDefinitionPlugin, []);
const createSvgIconsPlugin = createConfig('svgIcons', getSvgIconsPlugin, []);
module.exports = {
  managerWebpack: appendConfig(removeLoaderByFilename('test.css'), appendRules(sharedStyleLoadersConfig, () => json5Loader, () => svgGwIconLoaderRule), appendPlugins(createJutroGlobalDefinitionsPlugin, createSvgIconsPlugin), appendEntry(require.resolve('@jutro/overrides/loaders/icon-loader')), appendExcludeToRules('svg|', '(widgets/Icon/icons|widgets\\\\Icon\\\\icons)')),
  webpackFinal: appendConfig(removeLoaderByFilename('test.css'), appendRules(sharedStyleLoadersConfig, () => json5Loader, () => svgGwIconLoaderRule), appendPlugins(createJutroGlobalDefinitionsPlugin, createSvgIconsPlugin), appendEntry(require.resolve('@jutro/overrides/loaders/icon-loader')), appendExcludeToRules('svg|', '(widgets/Icon/icons|widgets\\\\Icon\\\\icons)'))
};
//# sourceMappingURL=config.js.map