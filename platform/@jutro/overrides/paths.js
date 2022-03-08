const cwd = process.cwd();

/**
 * Creates paths for use in the build configuration.
 * @param {{root:string, js:string, styles:string}} [options] - Build path options
 * @returns {{BUILD_ROOT:string,BUILD_OUTPUT:string,COMMON_ROOT:string,JS_ROOT:string,STYLES_ROOT:string,TEMP:string}}
 * - The project paths
 */
module.exports = (options = {}) => {
    const { root = cwd } = options;
    return {
        BUILD_ROOT: root,
        BUILD_OUTPUT: `${root}/dist`,
        JS_ROOT: options.js || root,
        STYLES_ROOT: options.styles || root,
    };
};
