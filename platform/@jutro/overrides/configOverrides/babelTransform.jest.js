/**
 * This file contains Babel transform parameters required
 * to run application with Jutro sources/modules.
 */
const babelJest = require('babel-jest');

const { generateDocgenInfo } = require('../loaders/docgen-info-plugin');

module.exports = babelJest.createTransformer({
    presets: [require.resolve('babel-preset-react-app')],
    plugins: [
        generateDocgenInfo,
        [
            require.resolve('@babel/plugin-proposal-decorators'),
            { legacy: true },
        ],
        require.resolve('@babel/plugin-proposal-optional-chaining'),
        require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
        require.resolve('babel-plugin-transform-require-context'),
    ],
    babelrc: false,
    configFile: false,
});
