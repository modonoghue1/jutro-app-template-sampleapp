const { resolve, basename } = require('path');
const { execSync } = require('child_process');
const { existsSync, promises } = require('fs');
const { pipe, set, mapKeys, mapValues, uniq } = require('lodash/fp');

const {
    optionalUpdate,
    parseBaseUrl,
    pipePromises,
    resolveAppPath,
    resolveToolPath,
    getReportPath,
    writeToFile,
    normalizeUrl,
    runCommand,
} = require('./utils');

const { reportAllAssertions } = require('./teamcityReporter');

const { unlink, writeFile } = promises;

const mapValuesWithKey = mapValues.convert({ cap: false });

const tempConfigPath = resolveToolPath('lhConfig.json');

const configureUrls = (pages, baseUrl) => {
    const urls = pages.map(({ url }) => normalizeUrl(baseUrl, url));

    return set('ci.collect.url', urls);
};

const configureAssertions = (pages, tolerances) => {
    const addAssertions = pipe(
        mapValuesWithKey((minScore, category) => [
            'error',
            { minScore: minScore - (tolerances[category] ?? 0) },
        ]),
        mapKeys(category => `categories:${category}`)
    );

    const assertMatrix = pages.map(({ url, thresholds }) => ({
        matchingUrlPattern: normalizeUrl('.*', url),
        assertions: addAssertions(thresholds),
    }));

    return set('ci.assert.assertMatrix', assertMatrix);
};

const normalizeConfig = ({ baseUrl, pages, tolerances, lighthouseConfig }) => {
    const createNormalizedConfig = pipe(
        set('ci', lighthouseConfig),
        configureUrls(pages, parseBaseUrl(baseUrl)),
        configureAssertions(pages, tolerances)
    );

    return createNormalizedConfig({});
};

const filterIncludedPages = includePages =>
    optionalUpdate(includePages, config => {
        const includedPages = includePages.split(',');
        const filteredPages = config.pages.filter(({ url }) =>
            includedPages.includes(url)
        );
        return set('pages', filteredPages, config);
    });

const filterExcludedPages = excludePages =>
    optionalUpdate(excludePages, config => {
        const excludedPages = excludePages.split(',');

        const filteredPages = config.pages.filter(
            ({ url }) => !excludedPages.includes(url)
        );

        return set('pages', filteredPages, config);
    });

const writeNormalizedConfig = async normalizedConfig => {
    await writeToFile(tempConfigPath, normalizedConfig);

    return normalizedConfig;
};

const runAuditFactory = headless => () => {
    const normalizedConfigFile = require.resolve(tempConfigPath);

    const pathToLighthouseCli = resolve(
        process.cwd(),
        'node_modules',
        '.bin',
        'lhci'
    );

    const hasPathToLh = existsSync(pathToLighthouseCli);

    const hasYarn = execSync('yarn -v')
        .toString()
        .match(/^\d+\..*/);

    const yarnCommand = hasYarn && 'yarn lhci';

    const nodeCommand = hasPathToLh && `node ${pathToLighthouseCli}`;

    const lhCommand = yarnCommand || nodeCommand;

    if (!lhCommand) {
        throw new Error(
            'Unable to find @lhci/cli, please make sure you have it installed.'
        );
    }

    const headlessFlag = headless ? '' : '--collect.headful';

    return runCommand({
        command: `${lhCommand} autorun --config=${normalizedConfigFile} ${headlessFlag}`,
        alwaysResolve: true,
    });
};

const removeConfigFile = () => unlink(tempConfigPath);

const printTeamcityReport = () => {
    if (process.env.TEAMCITY_VERSION === undefined) {
        return;
    }

    const assertionResult = require(resolveAppPath(
        '.lighthouseci',
        'assertion-results.json'
    ));
    reportAllAssertions(assertionResult);
};

const generateHtmlReportFile = config => async () => {
    const reportPath = getReportPath(config);
    const audits = require(resolveAppPath(reportPath, 'manifest.json'));
    const links = uniq(
        audits.map(
            ({ htmlPath, url }) =>
                `<li><a href="./${basename(htmlPath)}">${url}</a></li>`
        )
    ).join('\n');
    const htmlReport = `<html><body><ul>${links}</ul></body></html>`;
    await writeFile(resolveAppPath(reportPath, 'index.html'), htmlReport);
};

module.exports = ({ config, headless, includePages, excludePages }) => {
    const runtAuditsTestFlow = pipePromises(
        filterExcludedPages(excludePages),
        filterIncludedPages(includePages),
        normalizeConfig,
        writeNormalizedConfig,
        runAuditFactory(headless),
        removeConfigFile,
        printTeamcityReport,
        generateHtmlReportFile(config)
    );

    return runtAuditsTestFlow(config);
};
