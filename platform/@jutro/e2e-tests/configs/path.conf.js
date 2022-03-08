module.exports = (testsFolder, visualReportsFolder) => ({
    baseSnapshotLocation: `${testsFolder}/visual/tests/__snapshots__`,
    visualArtifactLocation: `${visualReportsFolder}`,
    backstopJSHTMLReportLocation: '/backstopJSReport/html_report',
    backstopReport: '/backstopJSReport',
});
