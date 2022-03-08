const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getLocalIdent = require('./getLocalIdent');

const sassModulesRegEx = /\.module.(s(a|c)ss)$/;
const cssModulesRegEx = /\.module.css$/;
const jutroCssModulesRegEx = /[/\\]@?(jutro|business-patterns).*\.module.css/;
const nodeModulesRegEx = /node_modules/;

const createStyleLoaders = (
    { exctractCss, sourceMaps, include } = {
        exctractCss: true,
        sourceMaps: true,
        include: [],
    }
) => {
    const resolveUrlLoader = {
        loader: 'resolve-url-loader',
        options: {
            sourceMap: sourceMaps,
            removeCR: process.platform === 'win32',
        },
    };

    const postCssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: sourceMaps,
            postcssOptions: {
                hideNothingWarning: true,
                plugins: function postCssLoaderPlugins() {
                    return [
                        require('postcss-import')(),
                        require('autoprefixer')(),
                    ];
                },
            },
        },
    };

    const cssModulesLoader = {
        loader: 'css-loader',
        options: {
            modules: {
                getLocalIdent,
                localIdentName: 'jut__[name]__[local]',
            },
            sourceMap: sourceMaps,
            importLoaders: 2,
        },
    };

    const cssRegularLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: sourceMaps,
            importLoaders: 2,
        },
    };

    const sassLoader = {
        loader: 'sass-loader',
        options: {
            sourceMap: sourceMaps,
            implementation: require('sass'),
            sassOptions: {
                sourceMapContents: true,
                includePaths: include,
            },
        },
    };

    const scssLoader = {
        test: /\.(s(a|c)ss)$/,
        include,
        exclude: [nodeModulesRegEx, sassModulesRegEx],
        use: [
            exctractCss ? MiniCssExtractPlugin.loader : 'style-loader',
            cssRegularLoader,
            resolveUrlLoader,
            postCssLoader,
            sassLoader,
        ],
    };

    const scssModuleLoader = {
        test: sassModulesRegEx,
        include,
        exclude: [nodeModulesRegEx],
        use: [
            exctractCss ? MiniCssExtractPlugin.loader : 'style-loader',
            cssModulesLoader,
            resolveUrlLoader,
            postCssLoader,
            sassLoader,
        ],
    };

    const cssLoader = {
        test: /\.css$/,
        include,
        exclude: [cssModulesRegEx],
        use: [
            exctractCss ? MiniCssExtractPlugin.loader : 'style-loader',
            cssRegularLoader,
            resolveUrlLoader,
            postCssLoader,
        ],
    };

    const cssModuleLoader = {
        test: cssModulesRegEx,
        include,
        exclude: [nodeModulesRegEx],
        use: [
            exctractCss ? MiniCssExtractPlugin.loader : 'style-loader',
            cssModulesLoader,
            resolveUrlLoader,
            postCssLoader,
        ],
    };

    const jutroCssModuleLoader = {
        test: cssModulesRegEx,
        include: [jutroCssModulesRegEx],
        use: [
            exctractCss ? MiniCssExtractPlugin.loader : 'style-loader',
            cssModulesLoader,
            resolveUrlLoader,
            postCssLoader,
        ],
    };

    return {
        oneOf: [
            scssLoader,
            scssModuleLoader,
            cssLoader,
            cssModuleLoader,
            jutroCssModuleLoader,
        ],
    };
};

const createScriptLoaders = (
    { include, options } = { include: [], options: null }
) => {
    const extendWithOptions = (config, opts = null) =>
        opts ? { ...config, options: opts } : config;

    const scriptsLoader = {
        test: /\.(t|j)sx?$/,
        use: [
            extendWithOptions({ loader: 'babel-loader' }, options),
            'source-map-loader',
        ],
        include,
        exclude: [nodeModulesRegEx],
    };

    return {
        oneOf: [scriptsLoader],
    };
};

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
    exclude: [/node_modules(?![/\\]@?jutro.*.svg)|vendor/],
    include: [/@?jutro.*.svg/],
    loader: 'url-loader',
    options: {
        importLoaders: 1,
        limit: 1,
        name: '[name].[hash].[ext]',
    },
};

const json5Loader = {
    test: /\.json5$/,
    loader: 'json5-loader',
    options: {
        esModule: false,
    },
};

const textLoader = {
    test: /\.(txt)$/,
    use: 'raw-loader',
};

module.exports = {
    createScriptLoaders,
    createStyleLoaders,
    imageLoadersRule,
    json5Loader,
    svgGwIconLoaderRule,
    svgImageLoaderRule,
    textLoader,
};
