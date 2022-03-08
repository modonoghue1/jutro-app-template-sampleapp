/* eslint-disable no-warning-comments, no-template-curly-in-string */

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3,
            },
        ],
        '@babel/preset-react',
        // Reminder for future. Could be required for apps compilation in production mode later
        // ['@babel/preset-react',{ development: process.env.NODE_ENV !== 'production' } ],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            'transform-imports',
            // TODO: uncomment when lodash usages would be consistent in project :(
            {
                'lodash/fp': {
                    transform: 'lodash/fp/${member}',
                    // preventFullImport: true,
                },
                lodash: {
                    transform: 'lodash/${member}',
                    // preventFullImport: true,
                },
            },
        ],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/transform-runtime', { corejs: 3, regenerator: true }],

        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-destructuring',
        '@babel/plugin-transform-classes',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
};
