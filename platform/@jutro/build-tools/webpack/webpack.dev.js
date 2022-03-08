const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common.js');
const devServerConfig = require('./config/devServerConfig');
const cssLoaderConfig = require('./config/cssLoaderConfig');
const javascriptLoaderConfig = require('./config/javascriptLoaderConfig');

const applicationContext = process.cwd() || null;

const devWebpackConfig = merge(common, {
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    profile: false,
    parallelism: 4,

    output: {
        path: path.resolve(path.join(applicationContext, 'dist')),
        filename: '[name].[id].[hash].js',
        chunkFilename: '[name].[id].[hash].chunk.js',
        libraryTarget: 'umd',
    },

    module: {
        rules: [
            cssLoaderConfig.generateDevCssLoaderConfig(),
            cssLoaderConfig.generateDevSassLoaderConfig(),
            cssLoaderConfig.generateDevSassModuleLoaderConfig(),
            javascriptLoaderConfig.generateDevJavascriptLoaderConfig(),
        ],
    },
    plugins: [
        cssLoaderConfig.generateMiniCssExtractPluginConfig(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: devServerConfig.generateDevServerConfig(),
});

module.exports = devWebpackConfig;
