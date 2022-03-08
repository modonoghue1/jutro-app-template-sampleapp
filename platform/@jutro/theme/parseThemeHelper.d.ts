/**
 * Parse the theme config into classNames, styles
 * classNames are used to provide answer to getRootStyle()
 * styles are used to populate dynamic css
 *
 * @param {object} config - theme configuration to parse
 * @returns {object} parsed classNames, styles and propOverrides
 */
export function parseThemeConfig(config: object): object;
