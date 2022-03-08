/**
 * returns all rules defined in webpack config
 *
 * @param {object} webpackConfig
 * @returns {Array<any>}
 */
const getRules = webpackConfig => {
    const rules = webpackConfig.module.rules.find(rule =>
        Array.isArray(rule.oneOf)
    );
    return rules.oneOf;
};

/**
 * Add webpack loader on provided webpack config
 *
 * @param {object} webpackConfig
 * @param {object} rule webpack loader rule
 * @returns {object}
 *
 * @example
 * const config = addWebpackLoader(config, {test: /\.json5$/,loader: 'json5-loader'});
 */
const addWebpackLoader = (webpackConfig, rule) => {
    const rules = getRules(webpackConfig);
    rules.unshift(rule);
    return webpackConfig;
};

module.exports = {
    addWebpackLoader,
    getRules,
};
