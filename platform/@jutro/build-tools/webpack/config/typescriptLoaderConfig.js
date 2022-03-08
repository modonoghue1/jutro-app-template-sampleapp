const babelLoaderPath = require.resolve('babel-loader');
const babelPresetEnvPath = require.resolve('@babel/preset-env');
const babelPresetReactPath = require.resolve('@babel/preset-react');
const babelPresetTypescriptPath = require.resolve('@babel/preset-typescript');
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

function generateTypescriptLoaderConfig() {
    const config = {
        test: /\.(tsx|ts)$/,
        exclude: [/\.(spec|test)\.(tsx|ts)$/, /node_modules/],
        use: [
            {
                loader: babelLoaderPath,
                options: {
                    presets: [
                        [babelPresetEnvPath],
                        [babelPresetReactPath],
                        [
                            babelPresetTypescriptPath,
                            {
                                isTSX: false,
                                allExtensions: false,
                            },
                        ],
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

exports.generateTypescriptLoaderConfig = () => generateTypescriptLoaderConfig();
