const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const applicationContext = process.cwd() || null;
const postCssConfigPath = path.resolve(path.join(__dirname));

const styleLoaderPath = require.resolve('style-loader');
const cssLoaderPath = require.resolve('css-loader');
const postCssLoaderPath = require.resolve('postcss-loader');
const sassLoaderPath = require.resolve('sass-loader');

function generateCssLoaderConfig(isProductionBuild) {
    return {
        test: /\.css/,
        use: [
            {
                loader: isProductionBuild
                    ? MiniCssExtractPlugin.loader
                    : styleLoaderPath,
                options: { insertAt: 'top' },
            },
            {
                loader: cssLoaderPath,
                options: { modules: false },
            },
            {
                loader: postCssLoaderPath,
                options: {
                    postcssOptions: {
                        config: postCssConfigPath,
                    },
                },
            },
        ],
    };
}

function generateSassLoaderConfig(isProductionBuild, isModule) {
    const nonModuleFileMatchingRegex = /^((?!module).)*\.scss$/;
    const moduleFileMatchingRegex = /module\.scss$/;
    const cssLoader = {
        loader: cssLoaderPath,
        options: {
            modules: isModule,
        },
    };

    if (isModule) {
        cssLoader.options.modules = true;
        cssLoader.options.importLoaders = 1;
        cssLoader.options.localIdentName = '[name]__[local]__[hash:base64:5]';
        cssLoader.options.onlyLocals = true;
    }

    return {
        test: isModule ? moduleFileMatchingRegex : nonModuleFileMatchingRegex,
        sideEffects: false,
        use: [
            {
                loader: isProductionBuild
                    ? MiniCssExtractPlugin.loader
                    : styleLoaderPath,
                options: { insertAt: 'top' },
            },
            cssLoader,
            {
                loader: postCssLoaderPath,
                options: { config: { path: postCssConfigPath } },
            },
            {
                loader: sassLoaderPath,
                options: {
                    sourceMap: false,
                    sassOptions: {
                        includePaths: [path.resolve(applicationContext)],
                    },
                },
            },
        ],
    };
}

exports.generateDevCssLoaderConfig = function generateDevCssLoaderConfig() {
    const isProduction = false;
    return generateCssLoaderConfig(isProduction);
};

exports.generateProdCssLoaderConfig = function generateProdCssLoaderConfig() {
    const isProduction = true;
    return generateCssLoaderConfig(isProduction);
};

// Sass
exports.generateDevSassLoaderConfig = function generateDevSassLoaderConfig() {
    const isProduction = false;
    const isModule = false;

    return generateSassLoaderConfig(isProduction, isModule);
};

exports.generateProdSassLoaderConfig = function generateProdSassLoaderConfig() {
    const isProduction = true;
    const isModule = false;

    return generateSassLoaderConfig(isProduction, isModule);
};

exports.generateDevSassModuleLoaderConfig = function generateDevSassModuleLoaderConfig() {
    const isProduction = false;
    const isModule = true;

    return generateSassLoaderConfig(isProduction, isModule);
};

exports.generateProdSassModuleLoaderConfig = function generateProdSassModuleLoaderConfig() {
    const isProduction = true;
    const isModule = true;

    return generateSassLoaderConfig(isProduction, isModule);
};

exports.generateMiniCssExtractPluginConfig = function generateMiniCssExtractPluginConfig() {
    return new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].[id].css',
    });
};
