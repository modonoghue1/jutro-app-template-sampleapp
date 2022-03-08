const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { generateDocgenInfo } = require('./docgen-info-plugin');

const {
    getMiniCssPlugin,
    getGlobalVariablesDefinitionPlugin,
} = require('./plugins');

const {
    json5Loader,
    imageLoadersRule,
    svgImageLoaderRule,
    createScriptLoaders,
    createStyleLoaders,
    textLoader,
} = require('./loaders');

const generateConfigForPackage = ({
    packageName,
    entryPoint,
    assetsToCopy,
    js,
    css,
    devtool,
    cssOnly,
    target,
    node = {},
}) => {
    const { version } = require(path.resolve('lerna.json'));
    const inPackage = dirOrFile =>
        path.resolve('packages', packageName, dirOrFile);

    const commonBabel = require('../babel.config');

    const entriesOut = js.entries ? '[name].js' : undefined;
    const standardOut = cssOnly ? undefined : `${js.filename}.js`;

    return {
        name: `${packageName} ${js.minimize ? '[minified]' : ''}`,
        mode: 'production',
        devtool,
        context: inPackage(''),
        entry: js.entries || entryPoint,
        output: {
            libraryTarget: 'commonjs2',
            path: inPackage('dist'),
            filename: entriesOut || standardOut,
        },
        target,
        node,
        externals: [
            /^[a-z\-0-9@]+[a-z\-0-9/.]*$/i,
            /^translationsDisplayKeys$/,
            /\.svg$/,
        ],
        module: {
            rules: [
                json5Loader,
                imageLoadersRule,
                svgImageLoaderRule,
                textLoader,
                createStyleLoaders({
                    sourceMaps: true,
                    exctractCss: css.extract,
                    include: [inPackage('')],
                }),
                createScriptLoaders({
                    include: [inPackage('')],
                    options: {
                        compact: false,
                        ...commonBabel,
                        plugins: [
                            generateDocgenInfo,
                            ...commonBabel.plugins,
                            [
                                'react-intl',
                                {
                                    messagesDir: path.resolve('./i18n/'),
                                },
                            ],
                        ],
                    },
                }),
            ],
        },
        plugins: [
            getMiniCssPlugin({
                exctractCss: css.extract,
                outputCss: `${css.filename}.css`,
            }),
            getGlobalVariablesDefinitionPlugin(version, false),
            assetsToCopy
                ? new CopyWebpackPlugin({
                      patterns: assetsToCopy.map(asset =>
                          typeof asset === 'string'
                              ? {
                                    from: inPackage(asset),
                                    to: asset,
                                }
                              : asset
                      ),
                  })
                : null,
        ].filter(Boolean),
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json', '.json5'],
            modules: [inPackage('node_modules'), path.resolve('node_modules')],
        },
        stats: {
            children: false,
        },
        optimization: {
            minimize: js.minimize,
            minimizer: [
                new TerserPlugin({
                    sourceMap: true,
                    parallel: true,
                    terserOptions: {
                        ecma: 5,
                        mangle: false,
                    },
                }),
            ],
            namedModules: true,
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: '[styles]',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
        },
    };
};

module.exports = {
    generateConfigForPackage,
};
