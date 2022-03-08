const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

const getMiniCssPlugin = ({ exctractCss, outputCss } = { exctractCss: true }) =>
    exctractCss
        ? new MiniCssExtractPlugin({
              filename: outputCss || '[name].[hash].css',
              chunkFilename: '[id].[hash].css',
          })
        : null;

const getSafeEnvironment = () => {
    process.env.SAFE_ENV = process.env.SAFE_ENV || 'true';
    const safeEnv = process.env.SAFE_ENV === 'true';
    const allowedKeysFilter = key =>
        key.startsWith('JUTRO_') || key.startsWith('REACT_APP_');

    return safeEnv
        ? Object.keys(process.env)
              .filter(allowedKeysFilter)
              .reduce((acc, key) => ({ ...acc, [key]: process.env[key] }), {})
        : process.env;
};

const getGlobalVariablesDefinitionPlugin = (
    version = require('../package.json').version,
    fullEnv = true
) => {
    const actualEnv =
        process.env.BUILD_ENV || process.env.NODE_ENV || 'development';

    return new webpack.DefinePlugin({
        __DEV__: actualEnv === 'development',
        __PROD__: actualEnv === 'production',
        __TEST__: actualEnv === 'test',
        __JUTRO_VERSION__: JSON.stringify(version),
        __APP_ROOT__: JSON.stringify(process.cwd()),
        ...(fullEnv
            ? { __FULL_ENV__: JSON.stringify(getSafeEnvironment()) }
            : null),
    });
};

const getJutIconsPath = () => {
    try {
        require.resolve('@jutro/components/src/widgets/Icon/Icon.tsx');
        return '@jutro/components/src/widgets/Icon/icons';
    } catch (e) {
        return '@jutro/components/widgets/Icon/icons';
    }
};

const getSvgIconsPlugin = () =>
    new webpack.DefinePlugin({
        __JUTRO_ICONS_PATH__: JSON.stringify(getJutIconsPath()),
        __CUSTOMER_ICONS_PATH__: process.env.ICONS_PATH
            ? JSON.stringify(path.join(process.cwd(), process.env.ICONS_PATH))
            : null,
    });

module.exports = {
    getMiniCssPlugin,
    getSafeEnvironment,
    getGlobalVariablesDefinitionPlugin,
    getSvgIconsPlugin,
};
