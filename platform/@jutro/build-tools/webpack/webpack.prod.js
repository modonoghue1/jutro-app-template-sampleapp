const path = require('path');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cliArgs = require('minimist')(process.argv.slice(2));

const common = require('./webpack.common.js');
const javascriptLoaderConfig = require('./config/javascriptLoaderConfig');
const cssLoaderConfig = require('./config/cssLoaderConfig');

const applicationContext = process.cwd() || null;
const isProfileEnabled = cliArgs.profileBundle === true;

const prodWebpackConfig = merge(common, {
    devtool: 'source-map',
    mode: 'production',
    profile: false,
    parallelism: 4,

    output: {
        path: path.resolve(path.join(applicationContext, 'dist')),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].chunk.js',
        libraryTarget: 'umd',
    },

    optimization: {
        namedModules: true,
        namedChunks: true,
        moduleIds: 'named',
        chunkIds: 'named',

        splitChunks: {
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-intl)[\\/]/,
                    name: 'react',
                    chunks: 'all',
                },
                lodash: {
                    test: /[\\/]node_modules[\\/](lodash)/,
                    name: 'lodash',
                    chunks: 'all',
                },
                moment: {
                    test: /[\\/]node_modules[\\/](moment)/,
                    name: 'moment',
                    chunks: 'all',
                },
                googlephone: {
                    test: /[\\/]node_modules[\\/]google-libphonenumber/,
                    name: 'googlephone',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },

        sideEffects: false,
        providedExports: true,
        usedExports: true,
        nodeEnv: 'production',

        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    ecma: 5,
                    toplevel: true,
                    warnings: true,
                    mangle: false,
                    compress: {
                        passes: 1,
                        // eslint-disable-next-line camelcase
                        pure_getters: true,
                        toplevel: true,
                        inline: 0,
                        // eslint-disable-next-line camelcase
                        global_defs: {
                            'process.env.NODE_ENV': 'production',
                        },
                    },
                    output: {
                        comments: false,
                        beautify: true,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true,
                            },
                        },
                    ],
                },
                canPrint: true,
            }),
        ],
    },

    module: {
        rules: [
            cssLoaderConfig.generateProdCssLoaderConfig(),
            cssLoaderConfig.generateProdSassLoaderConfig(),
            cssLoaderConfig.generateProdSassModuleLoaderConfig(),
            javascriptLoaderConfig.generateProdJavascriptLoaderConfig(),
        ],
    },

    plugins: [
        cssLoaderConfig.generateMiniCssExtractPluginConfig(),

        new BundleAnalyzerPlugin({
            analyzerMode: isProfileEnabled ? 'server' : 'static',
            reportFilename: 'build/bundleReport.html',
            openAnalyzer: false,
            defaultSizes: 'gzip',
            generateStatsFile: false,
            statsOptions: {
                context: applicationContext,
            },
        }),
    ],
});

module.exports = prodWebpackConfig;
