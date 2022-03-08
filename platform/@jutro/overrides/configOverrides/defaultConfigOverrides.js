const webpack = require('webpack');
const path = require('path');
const {
    addWebpackAlias,
    addWebpackPlugin,
    addWebpackExternals,
    removeModuleScopePlugin,
    getBabelLoader,
    babelInclude,
    babelExclude,
    adjustStyleLoaders,
} = require('customize-cra');
const _ = require('lodash');
const { map, flatten, pipe } = require('lodash/fp');
const {
    getSafeEnvironment,
} = require('@jutro/toolset-compilers/webpack/plugins');

const { addWebpackLoader } = require('./config-overrides-helper');
const getPaths = require('../paths');
const { modifyStyleLoaderRules, modulesOverride } = require('../loaders');
const {
    EnginesCompatibilityPlugin,
} = require('../plugins/EnginesCompatibilityPlugin');

const getDefaultBabelLoaderRule = loaders => loaders.babelLoaderRule;

function modifyDefaultStyleLoaders({ test, use }) {
    // use: [, css, postcss, resolve, processor]
    const [, css] = use;
    if (test.toString().includes('module')) {
        css.options = {
            ...css.options,
            modules: modulesOverride,
        };
    }
}

const jutroCssModulesRegEx = /[/\\]@?(jutro|business-patterns).*\.module.css/;

const mapLoaders = loader => {
    const sample = 'examples.module.css';
    const oneOfSection = loader.oneOf;
    if (Array.isArray(oneOfSection)) {
        return {
            oneOf: pipe(
                map(rule => {
                    // eslint-disable-next-line no-warning-comments
                    // TODO: rerwork package someday. It should be ts/es6 with compilation
                    // commonjs compatibility. package is not compiled. hacks and tricks to workaround
                    const ruleTest = rule.test || {};
                    const ruleExclude = rule.exclude || {};
                    if (
                        // rule.test?.test?.(sample)
                        rule &&
                        (ruleTest.test || _.stubFalse).call(ruleTest, sample) &&
                        !(ruleExclude.test || _.stubFalse).call(
                            ruleExclude,
                            sample
                        )
                    ) {
                        return [
                            // css modules loader for non-jutro packages in node_modules
                            {
                                ...rule,
                                exclude: [
                                    ...(rule.exclude || []),
                                    jutroCssModulesRegEx,
                                ],
                            },
                            // css modules loader for jutro (esm) packages in node_modules
                            {
                                ...rule,
                                include: [jutroCssModulesRegEx],
                                use: [
                                    ...rule.use.map(usage => {
                                        // skip not-css loader
                                        if (
                                            !/[/\\]css-loader[/\\]/.test(
                                                _.get(usage, 'loader', '')
                                            )
                                        ) {
                                            return usage;
                                        }
                                        // add jutro css modules names magic
                                        return {
                                            ...usage,
                                            options: {
                                                ...usage.options,
                                                modules: {
                                                    ...modulesOverride,
                                                    localIdentName:
                                                        'jut__[name]__[local]',
                                                },
                                            },
                                        };
                                    }),
                                ],
                            },
                        ];
                    }
                    return rule;
                }),
                flatten
            )(oneOfSection),
        };
    }
    return loader;
};

const addCssLoaderForJutroEsmPackages = config => {
    const loaders = _.get(config, 'module.rules', []).map(mapLoaders);
    return {
        ...config,
        module: {
            ...(config.module || {}),
            rules: loaders,
        },
    };
};

// default externals for micro-apps
const defaultSharedModules = {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    'react-router': 'window.ReactRouter',
    'react-router-dom': 'window.ReactRouterDOM',
    'react-intl': 'window.ReactIntl',
};

const jutroSingletonExternals = {
    '@jutro/auth': 'window.jutroAuth',
    '@jutro/locale': 'window.jutroLocale',
    '@jutro/theme': 'window.jutroTheme',
};

const defaultJutroExternals = {
    '@jutro/components': 'window.jutroComponents',
    '@jutro/datatable': 'window.jutroDatatable',
    '@jutro/floorplan': 'window.jutroFloorPlan',
    '@jutro/layout': 'window.jutroLayout',
    '@jutro/logger': 'window.jutroLogger',
    '@jutro/platform': 'window.jutroPlatform',
    '@jutro/router': 'window.jutroRouter',
    '@jutro/services': 'window.jutroServices',
    '@jutro/transport': 'window.jutroTransport',
    '@jutro/uiconfig': 'window.jutroUIConfig',
    '@jutro/theme-styles': 'window.jutroThemeStyles',
    '@jutro/validation': 'window.jutroValidation',
    '@jutro/wizard-next': 'window.jutroWizardNext',
};

const getJutIconsPath = () => {
    try {
        require.resolve('@jutro/components/src/widgets/Icon/Icon.tsx');
        return '@jutro/components/src/widgets/Icon/icons';
    } catch (e) {
        return '@jutro/components/widgets/Icon/icons';
    }
};

const webpackConfig = ({ options, overrides = {} }) => {
    const { root = process.cwd(), dependencies, browserslist, dev } = options;

    const {
        configAliases = {},
        configOptions = {},
        babelLoaderOptions = {},
        webpackLoadersWhiteList = [],
        customConfigure,
        babelPluginsBlacklist = [],
        additionalBabelPlugins = [],
        babelIncludeList = [],
        babelExcludeList = [],
        extractCss = false,
        webpackExternals,
        getBabelLoaderRule = getDefaultBabelLoaderRule,
        modifyStyleLoaders = modifyDefaultStyleLoaders,
        additionalWebpackLoaders = [],
    } = overrides;

    const paths = getPaths({ dev, root });
    const availableLoaders = require('../loaders/loaders')({
        paths,
        extractCss,
        babelPluginsBlacklist,
        additionalBabelPlugins,
        browserslist,
    });

    return (config, env) => {
        addWebpackAlias({
            // react: path.resolve(root, 'node_modules/react'),
            'react-dom': '@hot-loader/react-dom',
            ...configAliases,
        })(config);

        addWebpackPlugin(new EnginesCompatibilityPlugin())(config);

        addWebpackPlugin(
            new webpack.DefinePlugin({
                __JUTRO_ICONS_PATH__: JSON.stringify(getJutIconsPath()),
                __CUSTOMER_ICONS_PATH__: process.env.ICONS_PATH
                    ? JSON.stringify(
                          path.join(process.cwd(), process.env.ICONS_PATH)
                      )
                    : null,
                __FULL_ENV__: JSON.stringify(getSafeEnvironment()),
            })
        )(config);

        config.resolve.extensions.push('.ts', '.tsx');

        if (dev) {
            addWebpackPlugin(
                new webpack.DefinePlugin({ __TEST__: env === 'test' })
            )(config);
            addWebpackPlugin(
                new webpack.DefinePlugin({ __DEV__: env === 'development' })
            )(config);
            addWebpackPlugin(
                new webpack.DefinePlugin({ __PROD__: env === 'production' })
            )(config);

            addWebpackPlugin(
                new webpack.DefinePlugin({
                    __JUTRO_VERSION__: `'${
                        require('../package.json').version
                    }'`,
                })
            )(config);
        }

        // apply additional webpack config properties
        Object.keys(configOptions).forEach(key => {
            _.merge(config[key], configOptions[key]);
        });

        const babelLoader = getBabelLoader(config);

        if (babelLoader) {
            Object.entries({
                babelrc: true,
                cacheDirectory: false,
                ...babelLoaderOptions,
            }).forEach(([key, value]) => {
                babelLoader.options[key] = value;
            });
        }

        if (dev) {
            addWebpackLoader(config, getBabelLoaderRule(availableLoaders));
        }
        if (dev) {
            addWebpackLoader(config, availableLoaders.tsLoaderRule);
        }

        // default webpack loaders
        if (_.isEmpty(webpackLoadersWhiteList)) {
            addWebpackLoader(config, availableLoaders.json5LoaderRule);
        }
        if (availableLoaders.svgGwIconLoaderRule) {
            addWebpackLoader(config, availableLoaders.svgGwIconLoaderRule);
        }
        const iconLoaderEntry = require.resolve('../loaders/icon-loader');

        if (Array.isArray(config.entry)) {
            config.entry.push(iconLoaderEntry);
        } else if (typeof config.entry === 'string') {
            // eslint-disable-next-line no-param-reassign
            config.entry = [config.entry, iconLoaderEntry];
        } else if (typeof config.entry === 'object') {
            // eslint-disable-next-line no-param-reassign
            config.entry.svgIconsEntry = iconLoaderEntry;
        } else {
            // eslint-disable-next-line no-param-reassign
            config.entry = iconLoaderEntry;
        }
        // modify default scss rules to move top level scss imports to top of html head
        adjustStyleLoaders(modifyStyleLoaderRules(dependencies))(config);

        // apply available loaders from the whitelisted webpack loaders
        webpackLoadersWhiteList
            .filter(loader => Object.keys(availableLoaders).includes(loader))
            .forEach(loader => {
                addWebpackLoader(config, availableLoaders[loader]);
            });

        additionalWebpackLoaders.forEach(loader => {
            addWebpackLoader(config, loader);
        });

        if (!_.isEmpty(babelIncludeList)) {
            babelInclude(babelIncludeList)(config);
        }
        if (!_.isEmpty(babelExcludeList)) {
            babelExclude(babelExcludeList)(config);
        }

        if (webpackExternals) {
            addWebpackExternals(webpackExternals)(config);
        }

        // modify style loaders (e.g css, postcss, sass etc.)
        adjustStyleLoaders(modifyStyleLoaders)(config);

        // run custom logic
        if (customConfigure) {
            customConfigure(config);
        }

        // Allow imports from outside the `src` directory
        removeModuleScopePlugin()(config);

        // eslint-disable-next-line no-param-reassign
        config.optimization.splitChunks = {
            ...config.optimization.splitChunks,
            // exclude i18n chunks from name optimization
            // the chunk names are used by e2e getTranslation helper
            // See https://github.com/facebook/create-react-app/issues/10349#issuecomment-877220841
            chunks: chunk => {
                const chunkName = chunk.name;

                return !(
                    chunkName !== null &&
                    chunkName !== undefined &&
                    chunkName.startsWith('i18n/')
                );
            },
        };

        // micro-app config
        const microAppMode = process.env.MICRO_APP_MODE;
        if (microAppMode === 'embedded') {
            // eslint-disable-next-line no-param-reassign
            config.optimization.runtimeChunk = false;
            // eslint-disable-next-line no-param-reassign
            config.optimization.splitChunks = {
                cacheGroups: {
                    default: false,
                },
            };

            const shouldShareJutro =
                process.env.MICRO_APP_SHARE_JUTRO !== 'false';

            addWebpackExternals({
                ...defaultSharedModules,
                ...jutroSingletonExternals,
                ...(shouldShareJutro && defaultJutroExternals),
            })(config);
        }

        return addCssLoaderForJutroEsmPackages(config);
    };
};

const jestConfig = ({ options, overrides = {} }) => {
    const { dev } = options;
    const {
        setupFiles = [],
        transform = {},
        transformIgnorePatterns,
        transformFromNodeModules = [],
        ...configOptions
    } = overrides;

    const setupFilesAbsolutePath = setupFiles.map(file => `<rootDir>/${file}`);
    /* eslint-disable no-param-reassign */
    return config => {
        config.moduleNameMapper = {
            ...config.moduleNameMapper,
            '^.+\\.(css|scss)$': require.resolve('identity-obj-proxy'),
        };

        config.setupFiles = [
            'core-js/es/array',
            'jest-canvas-mock',
            path.resolve(__dirname, 'defaultSetupTests.js'),
            path.resolve(__dirname, 'enzymeAdapter.js'),
            ...setupFilesAbsolutePath,
        ];
        config.setupFilesAfterEnv = ['jest-extended'];
        config.snapshotSerializers = [
            path.resolve(__dirname, 'enzymeSnapshotSerializer'),
        ];
        config.testResultsProcessor = 'jest-teamcity-reporter';
        config.transform = {
            '^.+\\.json5$': 'json5-jest',
            '^.+\\.(js|ts)x?$': path.resolve(
                __dirname,
                'babelTransform.jest.js'
            ),
            ...config.transform,
            ...transform,
        };

        config.testEnvironment = 'enzyme';

        // avoid snapshot problems for DateField in different timezones when testing locally
        if (dev) process.env.TZ = 'GMT';

        config.globals = {
            ...config.globals,
            __PROD__: false,
            __DEV__: false,
            __TEST__: true,
        };

        const packagesForTransformation = Array.isArray(
            transformFromNodeModules
        )
            ? transformFromNodeModules
            : [transformFromNodeModules].filter(Boolean);
        config.transformIgnorePatterns = [
            `node_modules/(?!(${[...packagesForTransformation, '@jutro'].join(
                '|'
            )}))`,
            ...(transformIgnorePatterns || []),
        ];

        // spread all remaining overrides
        Object.keys(configOptions).forEach(key => {
            if (Array.isArray(configOptions[key])) {
                config[key] = _.uniq(
                    (config[key] || []).concat(configOptions[key])
                );
            } else if (_.isObject(configOptions[key])) {
                _.merge(config[key], configOptions[key]);
            } else {
                config[key] = configOptions[key];
            }
        });

        return config;
    };
    /* eslint-enable no-param-reassign */
};

const pathsConfig = ({ overrides = {} }) => {
    const {
        buildPath = 'dist',
        publicPath = 'src/assets',
        htmlPath = 'html/index.html',
    } = overrides;

    /* eslint-disable no-param-reassign */
    return paths => {
        paths.appBuild = path.resolve(paths.appPath, buildPath);
        paths.appPublic = path.resolve(paths.appPath, publicPath);
        paths.appHtml = path.resolve(paths.appPath, htmlPath);
        return paths;
    };
    /* eslint-enable no-param-reassign */
};

module.exports = {
    defaultSharedModules,
    defaultJutroExternals,
    jutroSingletonExternals,
    webpack: webpackConfig,
    jest: jestConfig,
    paths: pathsConfig,
};
