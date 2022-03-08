const path = require('path');
const cliArgs = require('minimist')(process.argv.slice(2));

const jutroSourcePath = cliArgs.jutroPath;

function buildAliasPath(moduleName) {
    return path.resolve(path.join(jutroSourcePath, moduleName));
}

const localWebpackConfig = {
    resolve: {
        alias: {
            '@jutro/app': buildAliasPath('jutro-app'),
            '@jutro/auth': buildAliasPath('jutro-auth'),
            '@jutro/build-tools': buildAliasPath('jutro-build-tools'),
            '@jutro/cli': buildAliasPath('jutro-cli'),
            '@jutro/cli-snapshot-tools': buildAliasPath(
                'jutro-cli-snapshot-tools'
            ),
            '@jutro/cli-snapshots': buildAliasPath('jutro-cli-snapshots'),
            '@jutro/components': buildAliasPath('jutro-components'),
            '@jutro/config': buildAliasPath('jutro-config'),
            '@jutro/contract': buildAliasPath('jutro-contract'),
            '@jutro/data': buildAliasPath('jutro-data'),
            '@jutro/datatable': buildAliasPath('jutro-datatable'),
            '@jutro/e2e-tests': buildAliasPath('jutro-e2e-tests'),
            '@jutro/events': buildAliasPath('jutro-events'),
            '@jutro/floorplan': buildAliasPath('jutro-floorplan'),
            '@jutro/layout': buildAliasPath('jutro-layout'),
            '@jutro/locale': buildAliasPath('jutro-locale'),
            '@jutro/logger': buildAliasPath('jutro-logger'),
            '@jutro/overrides': buildAliasPath('jutro-overrides'),
            '@jutro/platform': buildAliasPath('jutro-platform'),
            '@jutro/prop-types': buildAliasPath('jutro-prop-types'),
            '@jutro/router': buildAliasPath('jutro-router'),
            '@jutro/services': buildAliasPath('jutro-services'),
            '@jutro/test': buildAliasPath('jutro-test'),
            '@jutro/theme-styles': buildAliasPath('jutro-theme-styles'),
            '@jutro/theme': buildAliasPath('jutro-theme'),
            '@jutro/translations': buildAliasPath('jutro-translations'),
            '@jutro/transport': buildAliasPath('jutro-transport'),
            '@jutro/uiconfig': buildAliasPath('jutro-uiconfig'),
            '@jutro/uimetadata': buildAliasPath('jutro-uimetadata'),
            '@jutro/validation': buildAliasPath('jutro-validation'),
            '@jutro/visualization': buildAliasPath('jutro-visualization'),
            '@jutro/wizard-next': buildAliasPath('jutro-wizard-next'),
            '@jutro/wizard': buildAliasPath('jutro-wizard'),
            '@jutro/lab-preview-micro-app': buildAliasPath(
                'jutro-lab-preview-micro-app'
            ),
            '@jutro/lab-preview-components': buildAliasPath(
                'jutro-lab-preview-components'
            ),
            '@jutro/lab-preview-html-metadata-loader': buildAliasPath(
                'lab-preview-html-metadata-loader'
            ),
            '@jutro/lab-preview-dataview': buildAliasPath(
                'jutro-lab-preview-dataview'
            ),
            '@jutro/lab-preview-module-federation': buildAliasPath(
                'jutro-lab-preview-module-federation'
            ),
        },
    },
};

module.exports = localWebpackConfig;
