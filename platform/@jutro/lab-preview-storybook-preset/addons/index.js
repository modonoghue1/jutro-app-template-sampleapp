"use strict";

const path = require('path');

const _require = require('@storybook/node-logger'),
      logger = _require.logger;

const requireMain = configDir => {
  let main = {};
  const absoluteConfigDir = path.isAbsolute(configDir) ? configDir : path.join(process.cwd(), configDir);
  const mainFile = path.join(absoluteConfigDir, 'main');

  try {
    main = require(mainFile);
  } catch (err) {
    logger.warn(`Unable to find main.js: ${mainFile}`);
  }

  return main;
};

const checkInstalled = (addonName, main) => {
  var _main$addons;

  const existingAddon = (_main$addons = main.addons) === null || _main$addons === void 0 ? void 0 : _main$addons.find(entry => {
    const name = typeof entry === 'string' ? entry : entry.name;
    return name === null || name === void 0 ? void 0 : name.startsWith(addonName);
  });

  if (existingAddon) {
    logger.info(`Found existing addon ${JSON.stringify(existingAddon)}, skipping.`);
  }

  return !!existingAddon;
};

function getAddonEntryPoint(addonPath) {
  try {
    return require.resolve(path.join(addonPath, 'preset'));
  } catch (err) {}

  try {
    return require.resolve(path.join(addonPath, 'register'));
  } catch (err) {}

  try {
    return require.resolve(path.join(addonPath, 'register.tsx'));
  } catch (err) {}

  return require.resolve(addonPath);
}

function addons(options) {
  const addonsOptions = options.addons || {};
  const main = requireMain(options.configDir);
  return [{
    key: 'styles'
  }, {
    key: 'metadata'
  }, {
    key: 'jsx'
  }, {
    key: 'docs-link'
  }, {
    key: 'properties'
  }, {
    key: 'modal'
  }, {
    key: 'theming'
  }, {
    key: 'i18n'
  }, {
    key: 'layout'
  }, {
    key: 'router'
  }, {
    key: 'url-state'
  }].filter(meta => addonsOptions[meta.key] !== false).map(meta => ({ ...meta,
    path: meta.path || path.resolve(__dirname, meta.key)
  })).filter(meta => !checkInstalled(meta.path, main)).map(meta => ({
    name: getAddonEntryPoint(meta.path),
    options: addonsOptions[meta.key]
  }));
}

module.exports = {
  addons
};
//# sourceMappingURL=index.js.map