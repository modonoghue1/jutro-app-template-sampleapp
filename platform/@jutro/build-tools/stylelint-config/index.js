module.exports = {
    extends: ['stylelint-config-standard'],
    plugins: ['stylelint-declaration-use-variable'],
    rules: {
        'declaration-colon-newline-after': null,
        'at-rule-no-unknown': null,
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],
        'selector-type-no-unknown': null,
        'property-no-unknown': [
            true,
            {
                ignoreProperties: ['composes'],
            },
        ],
        'sh-waqar/declaration-use-variable': [
            [
                '/color/',
                'font-size',
                {
                    ignoreValues: ['transparent', 'inherit', 'currentColor'],
                },
            ],
        ],
        'no-descending-specificity': null,
    },
};
