/* eslint-disable no-console */
const ReactDocgen = require('react-docgen');
const { namedTypes: types } = require('ast-types');

const {
    getPropertyName,
    getPropType,
    resolveToValue,
    resolveToModule,
    printValue,
    getMemberValuePath,
    getMembers,
    isReactModuleName,
} = ReactDocgen.utils;

function isRequiredPropType(valuePath) {
    return getMembers(valuePath).some(
        ({ computed, path }) =>
            (computed ? path.node.name : path.node.value) === 'isRequired'
    );
}

function isPropTypesExpression(path) {
    const moduleName = resolveToModule(path);
    if (moduleName) {
        return isReactModuleName(moduleName) || moduleName === 'ReactPropTypes';
    }
    return false;
}

/**
 * @typedef {object} NodePath
 * @prop
 */

/**
 * react-docgen Documentation stub
 *
 * @typedef {object} Documentation
 * @prop
 */

/**
 * adds deprecation info and updates description for objects that use the deprecated function
 *
 * @param {NodePath} valuePath path to the node using `deprecated()`
 * @param {object} objectToAmend object property inside the documentation
 */
function amendDeprecatedInfo(valuePath, objectToAmend) {
    const version =
        printValue(valuePath.get('arguments', 1)).split("'")[1] || '@next';
    const info = printValue(valuePath.get('arguments', 2));
    const { description = '' } = objectToAmend;
    if (!description.includes('@deprecated')) {
        // eslint-disable-next-line no-param-reassign
        objectToAmend.description = `@deprecated${
            description && ` ${description}`
        }`;
    }
    // eslint-disable-next-line no-param-reassign
    objectToAmend.deprecationInfo = {
        version,
        mapTo: info.split('"')[1] || null,
    };
}

function getDeprecatedPropType(valuePath) {
    const deprecatedType = valuePath.get('arguments', 0);
    return getPropType(deprecatedType);
}

function amendDeprecatedPropTypesInsideShape(valuePath, shapeObject) {
    const shape = valuePath.get('arguments', 0);
    const subproperties = shape.get('properties');
    subproperties.each(subPropertyPath => {
        const subValuePath = subPropertyPath.get('value');

        if (printValue(subValuePath).startsWith('deprecated')) {
            const subPropName = getPropertyName(subPropertyPath);
            amendDeprecatedInfo(subValuePath, shapeObject.value[subPropName]);

            const subPropType = getDeprecatedPropType(subValuePath);
            if (subPropType) {
                Object.assign(shapeObject.value[subPropName], subPropType);
            }
        }
    });
}

/**
 * based on the implementation of the propTypeHandler by react-docgen, amendPropTypes is
 * used to assign a value and name to the PropType wrapped in the 'deprecated' handler
 *
 * @param {Function} getDescriptor a function of the Documentation object that gets the description of the prop
 * @param {NodePath} path the AST node
 */
function amendPropTypes(getDescriptor, path) {
    if (!types.ObjectExpression.check(path.node)) {
        return;
    }

    const properties = path.get('properties');
    properties.each(propertyPath => {
        try {
            switch (propertyPath.node.type) {
                case types.Property.name: {
                    const propName = getPropertyName(propertyPath);
                    if (!propName) return;

                    const propDescriptor = getDescriptor(propName);
                    const valuePath = propertyPath.get('value');
                    let type = null;

                    // check for deprecated wrapper and resolve type to the first argument
                    if (printValue(valuePath).startsWith('deprecated')) {
                        type = getDeprecatedPropType(valuePath);
                        amendDeprecatedInfo(valuePath, propDescriptor);
                    } else if (printValue(valuePath).includes('deprecated')) {
                        type = isPropTypesExpression(valuePath)
                            ? getPropType(valuePath)
                            : { name: 'custom', raw: printValue(valuePath) };

                        if (type.name === 'shape') {
                            amendDeprecatedPropTypesInsideShape(
                                valuePath,
                                type
                            );
                        }

                        if (
                            type.name === 'arrayOf' &&
                            type.value.name === 'shape'
                        ) {
                            amendDeprecatedPropTypesInsideShape(
                                valuePath.get('arguments', 0),
                                type.value
                            );
                        }
                    }

                    if (type) {
                        propDescriptor.type = type;
                        try {
                            propDescriptor.required =
                                type.name !== 'custom' &&
                                isRequiredPropType(valuePath);
                        } catch (err) {
                            console.log(
                                `Could not access "required" property of propDescriptor for ${propName}`,
                                err
                            );
                        }
                    }
                    break;
                }
                case types.SpreadElement.name: {
                    const resolvedValuePath = resolveToValue(
                        propertyPath.get('argument')
                    );
                    if (
                        resolvedValuePath.node.type ===
                        types.ObjectExpression.name
                    ) {
                        amendPropTypes(getDescriptor, resolvedValuePath);
                    }
                    break;
                }
                default:
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    });
}

/**
 * the deprecatedPropsHandler gets the PropTypes definitions and amends any PropTypes
 * wrapped in "deprecated()" from jutro-prop-types to their actual value
 *
 * @param {Documentation} documentation the Documentation object used by react-docgen
 * @param {NodePath} path the AST node for the component definition
 */
function deprecatedPropsHandler(documentation, path) {
    try {
        let propTypesPath = getMemberValuePath(path, 'propTypes');
        propTypesPath = propTypesPath ? resolveToValue(propTypesPath) : null;
        if (!propTypesPath) {
            return;
        }

        const getDescriptor = documentation.getPropDescriptor;

        amendPropTypes(getDescriptor.bind(documentation), propTypesPath);
    } catch (err) {
        console.log('Could not amend PropTypes', err);
    }
}

module.exports = {
    deprecatedPropsHandler,
};
