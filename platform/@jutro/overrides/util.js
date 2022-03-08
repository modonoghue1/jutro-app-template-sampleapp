const path = require('path');
const fs = require('fs');

const getGlobalPaths = () => ({
    paths: {
        root: '.',
        app: 'app',
        customer: 'app/customer',
        common: 'common',
        dist: 'dist',
        jutro: 'app/node_modules/@jutro',
    },
});

/**
 * Is the given path the `common` project root?
 * @param {string} pathName - The path to test
 * @returns {boolean} - True if the given path is the common project root
 */
const isCommonRoot = pathName => {
    const absolutePath = path.isAbsolute(pathName)
        ? pathName
        : path.resolve(pathName);
    const packageJson = getPackageJson(absolutePath);
    if (!packageJson) {
        return false;
    }
    return packageJson.name === 'common';
};

/**
 * Gets the common root directory path given the project root.
 * @param {string} [projectRoot= '.'] - The path to resolve the common root from (must be project root)
 * @returns {string} - The path for the common root
 */
const getCommonRoot = (projectRoot = process.cwd()) => {
    const subRoot = () =>
        isCommonRoot(`${projectRoot}/../frontend`)
            ? fs.realpathSync(`${projectRoot}/../frontend`)
            : fs.realpathSync(`${projectRoot}/frontend`);
    return isCommonRoot(projectRoot) ? projectRoot : subRoot();
};

/**
 * Gets the JavaScript source root from the project root path.
 * @param {string} projectRoot - The path of the project root
 * @returns {string} - The path of the JavaScript root
 */
const getJsRoot = projectRoot =>
    isCommonRoot(projectRoot)
        ? `${projectRoot}/js/src`
        : `${projectRoot}/app/js`;

/**
 * Gets the contents of the package.json at the given path.
 * @param {string} packageRoot - The root of the package (folder path)
 * @returns {Object|undefined} - The contents of the package.json, or undefined if no package.json on path
 */
const getPackageJson = packageRoot => {
    const packageJsonPath = path.join(packageRoot, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
        // console.warn(
        //     `No package.json at ${packageJsonPath}. This is not a package root.`
        // );
        return undefined;
    }
    return JSON.parse(fs.readFileSync(packageJsonPath).toString());
};

module.exports = {
    getPackageJson,

    getGlobalPaths,

    // gets the /common (i.e. frontend) path
    getCommonRoot,

    // get JavaScript source root
    getJsRoot,

    // is path common root?
    isCommonRoot,

    /**
     * Is the given root project a portal?
     * @param {string} rootPath - The path of the project root
     * @returns {boolean} -
     */
    isPortal(rootPath) {
        return !isCommonRoot(rootPath);
    },

    supportedBrowsersList: {
        // https://github.com/ai/browserslist
        browsers: [
            'last 1 Chrome version',
            'last 1 ChromeAndroid version',
            'last 1 iOS version',
            'last 1 Edge version',
            'last 1 Firefox version',
        ],
    },
};
