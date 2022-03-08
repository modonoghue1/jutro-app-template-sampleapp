module.exports = {
    defaultArgs: {
        check: {
            'folder-structure': {
                '--current-version': '6.0.0',
            },
            dependencies: {
                '--ignored-dependencies':
                    'node-fetch,yargs,handlebars,@jutro/*,@gtui/*',
            },
        },
        generate: {
            component: {
                '--skip-check': true,
            },
            page: {
                '--skip-check': true,
                '--path-to-component-map': './src/app/App.js',
                '--path-to-app-routes': './src/app/App.metadata.json5',
            },
            form: {
                '--skip-check': true,
            },
        },
    },
};
