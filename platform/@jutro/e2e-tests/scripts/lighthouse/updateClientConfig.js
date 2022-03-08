const { mergeWith, keys, cloneDeep, isEqual, map, min } = require('lodash/fp');

const {
    optionalUpdate,
    parseBaseUrl,
    pipePromises,
    resolveAppPath,
    writeToFile,
    normalizeUrl,
    getConfigPath,
    getReportPath,
    getExtendedConfig,
    runCommand,
    getBaseConfig,
    getFullConfig,
} = require('./utils');

const findLowestScore = ({ lhReport, normalizedUrl, auditProperty }) => {
    const scores = lhReport
        .filter(({ url }) => url === normalizedUrl)
        .filter(({ summary }) => auditProperty in summary)
        .map(({ summary }) => summary[auditProperty]);
    return min(scores);
};

const enhanceThresholdsValues = ({ enhanceThresholds, lhReport, baseUrl }) =>
    optionalUpdate(enhanceThresholds, config => {
        const clonedConfig = cloneDeep(config);

        clonedConfig.pages?.forEach((page, index) => {
            const { thresholds, url: pageUrl } = page;
            const normalizedUrl = normalizeUrl(baseUrl, pageUrl);

            const newThresholds = keys(thresholds).reduce(
                (acc, auditProperty) => ({
                    ...acc,
                    [auditProperty]: findLowestScore({
                        lhReport,
                        normalizedUrl,
                        auditProperty,
                    }),
                }),
                {}
            );

            const updatedThresholds = mergeWith(
                (value, srcValue) => (value < srcValue ? srcValue : value),
                thresholds
            )(newThresholds);

            clonedConfig.pages[index].thresholds = updatedThresholds;
        });

        return clonedConfig;
    });

const applyActualThresholdsValues = ({ applyActualThresholds, baseUrl }) =>
    optionalUpdate(applyActualThresholds, config => {
        const assertions = require(resolveAppPath(
            '.lighthouseci',
            'assertion-results.json'
        ));

        const clonedConfig = cloneDeep(config);

        clonedConfig.pages?.forEach((page, index) => {
            const pageAssertions = assertions.filter(
                ({ url }) => url === normalizeUrl(baseUrl, page.url)
            );

            pageAssertions
                .filter(({ passed }) => !passed)
                .forEach(({ auditProperty, values }) => {
                    clonedConfig.pages[index].thresholds[auditProperty] = min(
                        values
                    );
                });
        });

        return clonedConfig;
    });

const updateClientConfigFile = (currentConfig, lhRcFilename) => config => {
    if (!isEqual(currentConfig, config)) {
        // eslint-disable-next-line no-console
        console.log(lhRcFilename, 'file has been updated');
        return writeToFile(resolveAppPath(lhRcFilename), config);
    }

    return undefined;
};

const generateClientConfigs = (baseConfig, configPath) => {
    const configFilesDetails = [
        {
            config: baseConfig,
            lhRcFilename: getConfigPath(configPath),
        },
    ];

    if (baseConfig.extend) {
        configFilesDetails.push({
            config: getExtendedConfig(baseConfig.extend),
            lhRcFilename: baseConfig.extend,
        });
    }

    return configFilesDetails;
};

const getReport = config => {
    const reportPath = getReportPath(config);

    return require(resolveAppPath(reportPath, 'manifest.json'));
};

const formatConfigFile = lhRcFilename => () =>
    runCommand({ command: `yarn run prettier --write ${lhRcFilename}` });

const addNewThresholds = (commitThresholds, lhRcFilename) =>
    optionalUpdate(commitThresholds, () =>
        runCommand({ command: `git add ${resolveAppPath(lhRcFilename)}` })
    );

const commitNewThresholds = commitThresholds =>
    optionalUpdate(commitThresholds, () =>
        runCommand({
            command:
                'git commit -m"chore(lighthouse): update thresholds (_)" || echo "No new thresholds to be committed."',
        })
    );

const pushNewCommit = pushCommit =>
    optionalUpdate(pushCommit, () =>
        runCommand({ command: `git pull --rebase && git push origin HEAD` })
    );

const updateConfigFileThresholds = ({
    config,
    lhRcFilename,
}) => async commonConfig => {
    const {
        applyActualThresholds,
        enhanceThresholds,
        commitThresholds,
        lhReport,
        baseUrl,
    } = commonConfig;

    await pipePromises(
        enhanceThresholdsValues({
            enhanceThresholds,
            lhReport,
            baseUrl,
        }),
        applyActualThresholdsValues({ applyActualThresholds, baseUrl }),
        updateClientConfigFile(config, lhRcFilename),
        formatConfigFile(lhRcFilename),
        addNewThresholds(commitThresholds, lhRcFilename)
    )(config);

    return commonConfig;
};

module.exports = {
    updateClientConfig: ({
        config: configPath,
        enhanceThresholds,
        applyActualThresholds,
        commitThresholds,
        pushCommit,
    }) => {
        const baseConfig = getBaseConfig(configPath);

        const fullConfig = getFullConfig(baseConfig);

        const commonConfig = {
            applyActualThresholds,
            enhanceThresholds,
            commitThresholds,
            lhReport: getReport(fullConfig),
            baseUrl: parseBaseUrl(fullConfig.baseUrl),
        };

        const configs = generateClientConfigs(baseConfig, configPath);

        const updateClientThresholds = pipePromises(
            ...map(updateConfigFileThresholds)(configs),
            commitNewThresholds(commitThresholds),
            pushNewCommit(pushCommit)
        );

        return updateClientThresholds(commonConfig);
    },
};
