const fs = require('fs-extra');
const path = require('path');

const FILE_EXTENSION_REGEX = /\.(js|ts)x?$/;
const FILE_EXTENSIONS = ['js', 'jsx', 'ts', 'tsx'];

const getSrc = filePath => {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
    }
    return undefined;
};

const resolveRelativePathToModule = (referencePath, relativePath) => {
    try {
        return require.resolve(relativePath, { paths: [referencePath] });
    } catch {
        return null;
    }
};

const resolveRelativePathToFile = (referencePath, relativePath) => {
    try {
        const srcPath = path.resolve(path.dirname(referencePath), relativePath);

        if (FILE_EXTENSION_REGEX.exec(srcPath)) {
            return srcPath;
        }

        const extension = FILE_EXTENSIONS.find(ext =>
            fs.existsSync(`${srcPath}.${ext}`)
        );
        return `${srcPath}.${extension}`;
    } catch {
        return null;
    }
};

const resolveRelativePath = (referencePath, relativePath) => {
    const resolvedPath = resolveRelativePathToModule(
        referencePath,
        relativePath
    );

    if (!resolvedPath) {
        return resolveRelativePathToFile(referencePath, relativePath);
    }

    return resolvedPath;
};

module.exports = {
    getSrc,
    resolveRelativePath,
};
