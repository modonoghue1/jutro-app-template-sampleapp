const fileLoaderPath = require.resolve('file-loader');
const json5LoaderPath = require.resolve('json5-loader');
const rawLoaderPath = require.resolve('raw-loader');

exports.generateFontLoaderConfig = function generateFontLoaderConfig() {
    return {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [`${fileLoaderPath}?&name=fonts/[name].[ext]`],
    };
};

exports.generateImageLoaderConfig = function generateImageLoaderConfig() {
    return {
        test: /\.(jpg|jpeg|png|svg$)$/,
        use: [`${fileLoaderPath}?&name=images/[name].[ext]`],
    };
};

exports.generateJsonLoaderConfig = function generateJsonLoaderConfig() {
    return {
        test: /\.(json5$)$/,
        use: [json5LoaderPath],
        options: {
            esModule: false,
        },
    };
};

exports.generateTextLoaderConfig = function generateTextLoaderConfig() {
    return {
        test: /\.(txt)$/,
        use: [rawLoaderPath],
    };
};
