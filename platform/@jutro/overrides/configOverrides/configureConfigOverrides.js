// @ts-check
const { isObject, isEmpty } = require('lodash');
const defaultOverrides = require('./defaultConfigOverrides');

/** @typedef {{ name: string, value: any, overrides: object }} OverrideComplexVariant */

/** @typedef {string | OverrideComplexVariant} ConfigItem */

/** @typedef {{ options?: object, configItems?: ConfigItem[] }} OverrideOptions */

/**
 * Configures overrides
 * @param {OverrideOptions} configuration override options
 * @returns {Record<string, any>} config overrides
 */
/* eslint-disable no-param-reassign */
function configureConfigOverrides(configuration = {}) {
    const {
        options = {},
        configItems = ['webpack', 'jest', 'paths'],
    } = configuration;

    const configOverridesMap = configItems.reduce((configOverrides, config) => {
        if (isObject(config)) {
            const { name, value, overrides } = config;
            if (!isEmpty(overrides)) {
                configOverrides[name] = defaultOverrides[name]({
                    options,
                    overrides,
                });
            } else {
                configOverrides[name] = value;
            }
        } else {
            configOverrides[config] = defaultOverrides[config]({
                options,
            });
        }

        return configOverrides;
    }, {});

    // if running embedded microApp, set the devServer to allow cors
    if (process.env.MICRO_APP_MODE === 'embedded') {
        configOverridesMap.devServer = configFunction => (
            proxy,
            allowedHost
        ) => {
            const config = configFunction(proxy, allowedHost);
            config.headers = {
                'Access-Control-Allow-Origin': '*',
            };
            return config;
        };
    }

    return configOverridesMap;
}
/* eslint-enable no-param-reassign */

module.exports = {
    configureConfigOverrides,
};
