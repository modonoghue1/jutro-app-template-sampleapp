const { BACKSTOP_CONFIG, PATH_CONFIG } = require('./configKeys');

// Make sure that testcafe bundle and node.js process reuse same config
const CONFIG_KEY = Symbol.for('jutro.e2e.configProvider');
if (!Object.getOwnPropertySymbols(global).includes(CONFIG_KEY)) {
    global[CONFIG_KEY] = {
        [BACKSTOP_CONFIG]: {},
        [PATH_CONFIG]: {},
    };
}

const config = global[CONFIG_KEY];

module.exports = {
    getConfig(configKey) {
        return config[configKey];
    },
    setConfig(configKey, configValue) {
        config[configKey] = configValue;
    },
};
