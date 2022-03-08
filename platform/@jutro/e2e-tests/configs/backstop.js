module.exports = visualReportsFolder => ({
    id: 'backstop_default',
    viewports: [],
    onBeforeScript: '',
    onReadyScript: '',
    scenarios: [],
    paths: {
        /* eslint-disable camelcase */
        bitmaps_reference: `${visualReportsFolder}/backstopJSReport/baseImages`,
        bitmaps_test: `${visualReportsFolder}/backstopJSReport/actualImages`,
        engine_scripts: `${visualReportsFolder}/backstopJSReport/engine_scripts`,
        html_report: `${visualReportsFolder}/backstopJSReport/html_report`,
        ci_report: `${visualReportsFolder}/backstopJSReport/ci_report`,
        /* eslint-enable camelcase */
    },
    report: ['browser', 'CI'],
    engine: 'puppeteer',
    engineOptions: {
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
    },
    asyncCaptureLimit: 5,
    asyncCompareLimit: 50,
    debug: false,
    debugWindow: false,
});
