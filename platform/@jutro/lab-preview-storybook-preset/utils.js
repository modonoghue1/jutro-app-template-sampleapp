"use strict";

const _require = require('lodash/fp'),
      pipe = _require.pipe;

const removeLoaderByFilename = filename => ({
  config,
  options
}) => ({
  options,
  config: { ...config,
    module: { ...config.module,
      rules: config.module.rules.filter(rule => rule && (Array.isArray(rule.test) ? rule.test : [rule.test]).some(reg => !reg.exec(filename)))
    }
  }
});

const appendExcludeToRules = (regexPart, additionalExclude) => ({
  config,
  options
}) => {
  const otherFileRules = config.module.rules.filter(el => !(el.test && el.test.toString().includes(regexPart)));
  const fileRules = config.module.rules.filter(el => el.test && el.test.toString().includes(regexPart));
  const modifiedFileRules = fileRules.map(rule => ({ ...rule,
    exclude: rule.exclude ? new RegExp(`(${rule.exclude})|(${additionalExclude})`) : new RegExp(additionalExclude)
  }));
  return {
    options,
    config: { ...config,
      module: { ...config.module,
        rules: otherFileRules.concat(modifiedFileRules)
      }
    }
  };
};

const appendEntry = fileName => ({
  config,
  options
}) => ({
  options,
  config: { ...config,
    entry: config.entry ? config.entry.concat(fileName) : [fileName]
  }
});

const appendPlugins = (...pluginsCreators) => ({
  config,
  options
}) => ({
  options,
  config: { ...config,
    plugins: config.plugins.concat(...pluginsCreators.map(fn => fn({
      config,
      options
    })))
  }
});

const appendRules = (...rulesCreators) => ({
  config,
  options
}) => ({
  options,
  config: { ...config,
    module: { ...config.module,
      rules: config.module.rules.concat(...rulesCreators.map(fn => fn({
        config,
        options
      })))
    }
  }
});

const createConfig = (name, create, defaultArgs) => ({
  options
}) => create(...(options[name] || defaultArgs));

const appendConfig = (...creators) => (config, options) => pipe(...creators, ({
  config: result
}) => result)({
  config,
  options
});

module.exports = {
  appendPlugins,
  appendRules,
  createConfig,
  appendConfig,
  appendEntry,
  removeLoaderByFilename,
  appendExcludeToRules
};
//# sourceMappingURL=utils.js.map