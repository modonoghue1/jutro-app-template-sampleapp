const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MakeDirWebpackPlugin = require('make-dir-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const assetLoaderConfig = require('./config/assetLoaderConfig');
const typescriptLoaderConfig = require('./config/typescriptLoaderConfig');

const htmlLoaderPath = require.resolve('html-loader');
const applicationContext = process.cwd() || null;

const commonWebpackConfig = {
    entry: path.resolve(path.join(applicationContext, 'src', 'index.js')),
    context: path.resolve(path.join(applicationContext)),

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            minSize: 1000,
            maxInitialRequests: 75,
            maxSize: 1000000,
            automaticNameDelimiter: '-',
        },
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: htmlLoaderPath,
                        options: {
                            attrs: ['img:src', 'img:ng-src', 'link:href'],
                        },
                    },
                ],
            },
            assetLoaderConfig.generateImageLoaderConfig(),
            assetLoaderConfig.generateFontLoaderConfig(),
            assetLoaderConfig.generateJsonLoaderConfig(),
            assetLoaderConfig.generateTextLoaderConfig(),
            typescriptLoaderConfig.generateTypescriptLoaderConfig(),
        ],
    },
    resolve: {
        alias: {
            translationsDisplayKeys: path.resolve(
                path.join(applicationContext, 'app', 'i18n')
            ),
            envBaseConfig: path.resolve(path.join(__dirname, '..', 'shim')),
            baseConfig: path.resolve(path.join(__dirname, '..', 'shim')),
            envConfig: path.resolve(path.join(__dirname, '..', 'shim')),
        },
        modules: [
            path.resolve(path.join(__dirname, '..', 'node_modules')),
            path.resolve(path.join(applicationContext, 'node_modules')),
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
        new MakeDirWebpackPlugin({
            dirs: [
                { path: path.resolve(path.join(applicationContext, 'dist')) },
                {
                    path: path.resolve(
                        path.join(applicationContext, 'dist', 'images')
                    ),
                },
            ],
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(applicationContext, 'src', 'assets', 'images'),
                to: path.join(applicationContext, 'dist', 'images'),
            },
        ]),
        new HtmlWebpackPlugin({
            template: path.resolve(
                path.join(applicationContext, 'src', 'index.hbs')
            ),
            filename: 'index.html',
            inject: true,
            title: 'Jutro Create App',
        }),
        new webpack.ProvidePlugin({}),
        new webpack.DefinePlugin({
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            envConfig: () => {},
            __BUILD_PARAMS__: {},
            __TEST__: null,
            __DEV__: null,
            __PROD__: null,
            PRODUCTION: false,
            GIT_VERSION: '',
            GIT_COMMIT_INFO: '',
            GIT_BRANCH: '',
            DEPLOY_ENV: '',
        }),
        new CaseSensitivePathsPlugin(),
        new webpack.IgnorePlugin(/envBaseConfig/, /node_modules/),
    ],
    bail: true,
};

module.exports = commonWebpackConfig;
