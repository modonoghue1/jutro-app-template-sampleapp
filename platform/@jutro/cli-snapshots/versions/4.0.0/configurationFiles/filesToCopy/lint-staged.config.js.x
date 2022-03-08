module.exports = {
    linters: {
        '*.js': ['npm run prettier-check', 'eslint'],
        '*.{ts,tsx}': ['npm run prettier-check'],
        '*.scss': ['stylelint'],
    },
};
