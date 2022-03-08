module.exports = {
    printWidth: 80,
    tabWidth: 4,
    trailingComma: 'es5',
    arrowParens: 'avoid',
    endOfLine: 'auto',
    jsxBracketSameLine: false,
    bracketSpacing: true,
    singleQuote: true,
    useTabs: false,
    semi: true,
    overrides: [
        {
            files: '*.json5',
            options: {
                parser: 'json',
            },
        },
        {
            files: '*.json',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.scss',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.mdx',
            options: {
                proseWrap: 'always',
            },
        },
    ],
};
