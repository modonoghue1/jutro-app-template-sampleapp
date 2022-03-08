/* eslint-disable no-console */
const { groupBy, last } = require('lodash');

const reportAssertion = assertion => {
    const { auditProperty: testName, expected, actual, passed } = assertion;

    console.log(`##teamcity[testStarted name='${testName}']`);
    console.log(
        `##teamcity[testMetadata testName='${testName}' name='Expected value' type='number' value='${expected}']`
    );
    console.log(
        `##teamcity[testMetadata testName='${testName}' name='Actual value' type='number' value='${actual}']`
    );
    if (!passed) {
        console.log(
            `##teamcity[testFailed name='${testName}' expected='${expected}' actual='${actual}']`
        );
    }
    console.log(`##teamcity[testFinished name='${testName}']`);
};

const reportAssertionsForUrl = (url, assertions) => {
    const pageName = last(url.split('/'));
    const testSuiteName = `${pageName} page`;

    console.log(`##teamcity[testSuiteStarted name='${testSuiteName}']`);
    for (const assertion of assertions) {
        reportAssertion(assertion);
    }
    console.log(`##teamcity[testSuiteFinished name='${testSuiteName}']`);
};

module.exports = {
    reportAllAssertions: allAssertions => {
        const assertionsByUrl = groupBy(allAssertions, 'url');

        console.log("##teamcity[testSuiteStarted name='lighthouse-jutro-app']");
        for (const [url, assertions] of Object.entries(assertionsByUrl)) {
            reportAssertionsForUrl(url, assertions);
        }
        console.log(
            "##teamcity[testSuiteFinished name='lighthouse-jutro-app']"
        );
    },
};
