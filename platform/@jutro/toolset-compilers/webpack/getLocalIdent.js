const path = require('path');
const loaderUtils = require('loader-utils');

const getLocalIdent = (loaderContext, localIdentName, localName, options) => {
    const identOptions = {
        ...options,
        context: options.context || loaderContext.rootContext,
    };

    const request = path
        .relative(identOptions.context, loaderContext.resourcePath)
        .replace(/\\/g, '/');

    identOptions.content = `${identOptions.hashPrefix}${request}+${localName}`;

    const filteredLocalIdent = localIdentName.replace(/\[local\]/gi, localName);

    const hash = loaderUtils.interpolateName(
        loaderContext,
        filteredLocalIdent,
        identOptions
    );

    return hash
        .replace(/.module/g, '')
        .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
        .replace(/^((-?[0-9])|--)/, '_$1');
};

module.exports = getLocalIdent;
