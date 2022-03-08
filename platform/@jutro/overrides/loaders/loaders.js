const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
// const _ = require('lodash');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const path = require('path');
const sharedBabelConfig = require('@jutro/toolset-compilers/babel.config');

const { supportedBrowsersList } = require('../util');
const { modulesOverride } = require('./styleOverrideRules');
const { generateDocgenInfo } = require('./docgen-info-plugin');

/* --- Style loaders --- */
const resolveUrlLoader = {
    loader: 'resolve-url-loader',
    options: {
        sourceMap: true,
        removeCR: process.platform === 'win32',
    },
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        // https://github.com/webpack-contrib/css-loader
        sourceMap: true,
        importLoaders: 2,
        url: false,
    },
};

const cssModulesLoader = {
    ...cssLoader,
    options: {
        ...cssLoader.options,
        modules: modulesOverride,
    },
};

const postCssLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
        postcssOptions: {
            plugins: function postCssLoaderPlugins() {
                return [
                    postcssImport(),
                    autoprefixer({ ...supportedBrowsersList }),
                ];
            },
        },
    },
};

const getSassLoader = (paths, minimize) => ({
    loader: 'sass-loader',
    options: {
        // should mirror the grunt-sass settings
        sassOptions: {
            includePaths: [
                paths.BUILD_ROOT,
                path.resolve(paths.BUILD_ROOT, '..'),
                path.resolve(paths.BUILD_ROOT, '../node_modules'),
                path.resolve(paths.BUILD_ROOT, '../..'),
                path.resolve(paths.BUILD_ROOT, '../../node_modules'),
            ],
            outputStyle: minimize ? 'compressed' : 'expanded',
            sourceMapContents: true,
        },
        sourceMap: true,
    },
});

/**
 * Generates the rule for the SASS loader.
 * @param {boolean} hashed - True if rule is for processing hashed scss files
 * @param {Array<any>} loaders - The array of loaders to use
 * @returns {object} - The SASS loader rule
 */
const getSassLoaderRule = ({ hashed, extractCss }, loaders) => ({
    test: hashed ? /(module)\.scss$/ : /^.*(?<!(module)\.)scss$/,
    exclude: [/node_modules|vendor/],
    use: [extractCss ? ExtractTextPlugin.loader : 'style-loader', ...loaders],
});

const exclusions = [/node_modules(?![/\\]gw-portals)|vendor/];

/* --- Babel loader --- */
const getBabelLoaderRule = () => ({
    test: /\.(t|j)sx?$/,
    // exclude "gw-portal*" modules and "vendor" with 3rd party libraries
    exclude: exclusions,
    use: [
        {
            loader: 'babel-loader',
            options: {
                compact: false,
                ...sharedBabelConfig,
                plugins: [
                    ...sharedBabelConfig.plugins,
                    'babel-plugin-react-docgen',
                    generateDocgenInfo,
                    [
                        'react-intl',
                        {
                            messagesDir: path.resolve('./i18n/'),
                            moduleSourceName: '@jutro/locale',
                        },
                    ],
                ],
                cacheDirectory: true,
            },
        },
    ],
});

const createTsLoaderConfig = allowJs => ({
    loader: 'ts-loader',
    options: {
        configFile: path.resolve('tsconfig.app.json'),
        compilerOptions: {
            allowJs,
            /**
             * INFO: add rule below to check all JS files
             * checkJs: true,
             */
            target: 'es5',
            strict: true,
            module: 'esnext',
            moduleResolution: 'node',
            jsx: 'preserve',
            resolveJsonModule: true,
            allowSyntheticDefaultImports: true,
            strictPropertyInitialization: false,
            experimentalDecorators: true,
            noImplicitAny: false,
            strictNullChecks: true,
            noEmit: false,
            noResolve: false,
        },
    },
});

const getTsLoaderRule = (...options) => {
    const babelLoaderRule = getBabelLoaderRule(...options);

    return {
        ...babelLoaderRule,
        use: [...babelLoaderRule.use, createTsLoaderConfig(true)],
    };
};

/* --- Image loaders --- */

const svgGwIconLoaderRule = {
    test: /.*(gw|cust)-[^/\\]*\.svg$/,
    use: [{ loader: 'svg-sprite-loader' }, 'svgo-loader'],
};

const svgImageLoaderRule = {
    test: /\.icon\.svg$/,
    loader: 'text-loader',
};

const imageLoadersRule = {
    test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg|gif|png)(\?.*$|$)/,
    exclude: [/node_modules|vendor/],
    loader: 'url-loader',
    options: {
        importLoaders: 1,
        limit: 1,
        name: '[name].[hash].[ext]',
    },
};

/* --- Other loaders --- */

const json5LoaderRule = {
    test: /\.json5$/,
    loader: 'json5-loader',
    options: {
        esModule: false,
    },
};

const sourceMapLoader = {
    test: /\.js$/,
    use: ['source-map-loader'],
    enforce: 'pre',
};

/**
 * @typedef {{
 *   extractCss: boolean,
 *   minimizeCss: boolean,
 *   paths: Record<string, string>,
 *   babelPluginsBlacklist: string[],
 *   additionalBabelPlugins: any[],
 *   browserslist: object,
 * }} LoadersOptions
 */

/**
 * Generates the exported loaders and rules.
 * @param {LoadersOptions} options the options for generating loaders/rules
 * @returns {object} the loaders and rules
 */
module.exports = options => {
    const extractCss =
        options.extractCss !== undefined ? options.extractCss : true;
    const sassLoader = getSassLoader(options.paths, options.minimizeCss);
    const babelLoaderRule = getBabelLoaderRule(
        options.babelPluginsBlacklist,
        options.additionalBabelPlugins,
        options.browserslist
    );
    const tsLoaderRule = getTsLoaderRule(
        options.babelPluginsBlacklist,
        options.additionalBabelPlugins,
        options.browserslist
    );

    return {
        // loaders
        cssLoader,
        cssModulesLoader,
        resolveUrlLoader,
        postCssLoader,
        sassLoader,
        // rules
        babelLoaderRule,
        tsLoaderRule,
        json5LoaderRule,
        // import './[MODULE-]hashed.scss'; is processed as a CSS module
        hashedSassLoaderRule: getSassLoaderRule({ hashed: true, extractCss }, [
            cssModulesLoader,
            resolveUrlLoader,
            postCssLoader,
            sassLoader,
        ]),
        // import './MODULE.scss'; is processed as usual CSS
        sassLoaderRule: getSassLoaderRule({ hashed: false, extractCss }, [
            cssLoader,
            resolveUrlLoader,
            postCssLoader,
            sassLoader,
        ]),
        cssLoaderRule: {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        svgGwIconLoaderRule,
        svgImageLoaderRule,
        imageLoadersRule,
        sourceMapLoader,
    };
};
