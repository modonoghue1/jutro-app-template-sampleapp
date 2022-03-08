const { takeScreenshotAndMatch } = require('./takeScreenshotAndMatch');

/**
 * Matches a visual snapshot with the one previously taken
 *
 * @param {object} t testcafe
 * @param {object} selectors testcafe selector or array of selectors
 * @returns {object} result of the match
 */
async function verifyVisualSnapshot(t, selectors) {
    const { isMatched, metadata } = await takeScreenshotAndMatch(t, selectors);
    return t
        .expect(isMatched)
        .ok(
            `Image is not matched, please check the metadata ${JSON.stringify(
                metadata
            )}`
        );
}

module.exports = { verifyVisualSnapshot };
