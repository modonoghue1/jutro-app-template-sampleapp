module.exports = {
    extends: [
        'airbnb',
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    settings: {
        react: {
            version: '17.0',
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'jsx-a11y',
        'no-only-tests',
        'react-hooks',
    ],
    env: {
        browser: true,
    },
    globals: {
        util: false,
        shallow: false,
        mount: false,
        render: false,
        __DEV__: false,
        __TEST__: false,
        __PROD__: false,
        __FULL_ENV__: false,
    },
    rules: {
        // We use it for dynamic loading of files like json
        'global-require': 'off',
        // Used for things like __TEST__ or __docgenInfo
        'no-underscore-dangle': [
            'error',
            {
                allow: [
                    '__docgenInfo',
                    '__TEST__',
                    '__DEV__',
                    '__PROD__',
                    '__BUILD_PARAMS__',
                    '__FULL_ENV__',
                    '__JUTRO_VERSION__',
                    '__APP_ROOT__',
                    '_ITEM_ID_',
                    '_ITEM_DATA_',
                    '_ITEM_VALUE_',
                    '_ITEM_INDEX_',
                    '_ITEM_PATH_',
                    '_ITEM_CHILDREN_',
                ],
            },
        ],
        // We don't allow to add comments like todo or fixme
        'no-warning-comments': 'error',
        // Turned to error not a warning
        'no-console': 'error',
        'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
        'no-use-before-define': 'off',
        'import/extensions': 'off',
        'import/first': 'off',
        'import/no-dynamic-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-mutable-exports': 'off',
        'import/no-named-as-default': 'off',
        'import/no-unresolved': 'off',
        'import/no-webpack-loader-syntax': 'off',
        'import/prefer-default-export': 'off',
        'no-only-tests/no-only-tests': 'error',
        'react/button-has-type': 'off',
        'react/default-props-match-prop-types': 'off',
        'react/destructuring-assignment': 'off',
        'react/forbid-foreign-prop-types': 'off',
        'react/forbid-prop-types': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-fragments': ['error', 'element'],
        'react/jsx-props-no-spreading': 'off',
        'react/no-array-index-key': 'off',
        'react/no-find-dom-node': 'off',
        'react/no-unescaped-entities': 'off',
        'react/no-unused-prop-types': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/state-in-constructor': 'off',
        'react/static-property-placement': ['error', 'static public field'],
        // Prevents missing translations
        'react/jsx-no-literals': [
            'error',
            {
                ignoreProps: true,
            },
        ],
        // Typescript eslint overrides
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',

        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                ignoreRestSiblings: true,
            },
        ],

        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',

        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
            },
        },
        {
            files: [
                '*+(-test|.spec|.test).*',
                '**/tests/**',
                '**/__tests__/**',
            ],
            env: {
                jest: true,
            },
            rules: {
                'react/react-in-jsx-scope': 'off',
                'react/jsx-no-literals': 'off',
            },
            globals: {
                fixture: true,
                Exception: true,
            },
        },
    ],
};
