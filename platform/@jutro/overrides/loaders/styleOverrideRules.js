const path = require('path');
const loaderUtils = require('loader-utils');

const styleLoaderV0 = {
    loader: 'style-loader',
    options: {
        insertAt: 'top',
    },
};

const modulesOverride = {
    localIdentName: 'app__[name]__[local]',
    getLocalIdent: (loaderContext, localIdentName, localName, options) => {
        const identOptions = {
            ...options,
            context: options.context || loaderContext.rootContext,
        };

        const request = path
            .relative(identOptions.context, loaderContext.resourcePath)
            .replace(/\\/g, '/');

        identOptions.content = `${identOptions.hashPrefix}${request}+${localName}`;

        const filteredLocalIdent = localIdentName.replace(
            /\[local\]/gi,
            localName
        );

        const hash = loaderUtils.interpolateName(
            loaderContext,
            filteredLocalIdent,
            identOptions
        );

        return hash
            .replace(/.module/g, '')
            .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
            .replace(/^((-?[0-9])|--)/, '_$1');
    },
};

const styleLoaderV1 = {
    loader: 'style-loader',
    options: {
        insert: element => {
            const parent = document.querySelector('head');
            // eslint-disable-next-line no-underscore-dangle
            const lastInsertedElement =
                // eslint-disable-next-line no-underscore-dangle
                window._lastElementInsertedByStyleLoader;

            if (!lastInsertedElement) {
                parent.insertBefore(element, parent.firstChild);
            } else if (lastInsertedElement.nextSibling) {
                parent.insertBefore(element, lastInsertedElement.nextSibling);
            } else {
                parent.appendChild(element);
            }

            // eslint-disable-next-line no-underscore-dangle
            window._lastElementInsertedByStyleLoader = element;
        },
    },
};

function getStyleLoader() {
    const pathToLoader = require.resolve('style-loader');

    // style-loader < 1 had index.js as main file
    if (!/index\.js$/.test(pathToLoader)) {
        return styleLoaderV1;
    }
    return styleLoaderV0;
}

/** @typedef {{ test: RegExp, use: object[] }} Rule */

/** @typedef {(rule: Rule) => void} RuleModifier */

/**
 * Creates a function to adjust loader rule
 * @param {object} dependencies additional dependencies configuration
 * @returns {RuleModifier} function to modify rule
 */
function modifyStyleLoaderRules(dependencies = {}) {
    return ({ test, use }) => {
        if ('*.scss'.match(test)) {
            // eslint-disable-next-line no-param-reassign
            use[0] = getStyleLoader(dependencies);
        }
    };
}

module.exports = { modifyStyleLoaderRules, modulesOverride };
