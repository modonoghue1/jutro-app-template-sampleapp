const babelLoaderPath = require.resolve('babel-loader');
const babelPresetEnvPath = require.resolve('@babel/preset-env');
const babelPresetReactPath = require.resolve('@babel/preset-react');
const babelPluginProposalDecoratorsPath = require.resolve(
    '@babel/plugin-proposal-decorators'
);
const babelPluginProposalClassPropertiesPath = require.resolve(
    '@babel/plugin-proposal-class-properties'
);
const babelPluginTransformObjectAssignPath = require.resolve(
    '@babel/plugin-transform-object-assign'
);
const babelPluginDynamicImportPath = require.resolve(
    '@babel/plugin-syntax-dynamic-import'
);
const scriptLoaderPath = require.resolve('script-loader');

function generateJavascriptLoaderConfig() {
    const config = {
        test: /\.(jsx|js)$/,
        use: [
            {
                loader: babelLoaderPath,
                options: {
                    cacheDirectory: true,
                    presets: [
                        [
                            babelPresetEnvPath,
                            {
                                useBuiltIns: 'entry',
                                corejs: '3.4',
                                loose: true,
                                modules: false,
                            },
                        ],

                        [babelPresetReactPath, {}],
                    ],
                    plugins: [
                        [babelPluginProposalDecoratorsPath, { legacy: true }],
                        [
                            babelPluginProposalClassPropertiesPath,
                            { loose: true },
                        ],
                        [babelPluginTransformObjectAssignPath],
                        [babelPluginDynamicImportPath],
                    ],
                },
            },
        ],
    };

    return config;
}

exports.generateDevJavascriptLoaderConfig = function generateDevJavascriptLoaderConfig() {
    const isProduction = false;
    return generateJavascriptLoaderConfig(isProduction);
};

exports.generateProdJavascriptLoaderConfig = function generateProdJavascriptLoaderConfig() {
    const isProduction = true;
    return generateJavascriptLoaderConfig(isProduction);
};

exports.generateNonWebpackVendorsConfig = function generateNonWebpackVendorsConfig() {
    return {
        test: /[/\\]vendor[/\\][A-Za-z/\\0-9-.]+.vendor.js/,
        use: [scriptLoaderPath],
    };
};
