const fs = require('fs');
const JSON5 = require('json5');
const { startCase } = require('lodash');
const {
    extractTargetDefinition,
} = require('./openapiHelpers/schemaHelpers.js');

function getMetadataComponent(schemaKey, schemaProperty) {
    let componentName = 'FixMe';
    let componentProps;

    const { type, format, readOnly, maxLength } = schemaProperty;
    const extensions = schemaProperty['x-gw-extensions'];

    switch (type) {
        case 'boolean':
            componentName = 'DisplayColumn';
            componentProps = {
                path: schemaKey,
            };
            break;
        case 'string':
            if (format === 'date-time') {
                componentName = 'DisplayColumn';
                componentProps = {
                    dataType: 'date-time',
                    path: schemaKey,
                };
            } else if (maxLength > 80) {
                componentName = 'DisplayColumn';
                componentProps = {
                    maxLength,
                    path: schemaKey,
                };
            } else {
                componentName = 'DisplayColumn';
                if (maxLength) {
                    componentProps = {
                        maxLength,
                        path: schemaKey,
                    };
                }
            }
            break;
        case 'array':
            {
                const itemType = schemaProperty?.items?.type;
                const itemRef = schemaProperty?.items?.$ref;
                if (itemType === 'string') {
                    componentName = 'DisplayColumn';
                    componentProps = {
                        path: schemaKey,
                    };
                } else {
                    const referenceType =
                        itemRef?.substr(itemRef?.lastIndexOf('/') + 1) ||
                        itemType;
                    componentName = 'DisplayColumn';
                    componentProps = {
                        referenceType,
                        path: schemaKey,
                    };
                }
            }
            break;
        case 'object':
        default:
            if (schemaProperty.$ref?.includes('TypeKeyReference')) {
                const typelist =
                    schemaProperty['x-gw-typelist'] || extensions?.typeList;
                const choices = schemaProperty['x-gw-choices'];
                componentName = 'DisplayColumn';
                let choiceList;
                if (choices && choices.length) {
                    choiceList = choices.map(choice => ({
                        code: choice.code,
                        name: choice.name,
                    }));
                } else {
                    choiceList = [{ code: typelist, name: typelist }];
                }
                componentProps = {
                    dataType: 'object',
                    path: `${schemaKey}.name`,
                    availableValues: choiceList,
                };
            } else if (schemaProperty.$ref?.includes('SimpleReference')) {
                const referenceType =
                    schemaProperty['x-gw-referenceType'] ||
                    extensions?.resourceType;
                componentName = 'DisplayColumn';
                componentProps = {
                    referenceType,
                    path: `${schemaKey}.displayName`,
                };
            } else if (schemaProperty.$ref) {
                const referenceType = schemaProperty.$ref.substr(
                    schemaProperty.$ref.lastIndexOf('/') + 1
                );
                componentName = 'DisplayColumn';
                componentProps = {
                    referenceType,
                    path: `${schemaKey}.displayName`,
                };
            }
            break;
    }

    if (readOnly) {
        componentProps = { ...componentProps, readOnly: true };
    }

    if (schemaProperty['x-gw-createOnly'] || extensions?.createOnly) {
        componentProps = { ...componentProps, createOnly: true };
    }

    return [componentName, componentProps];
}

function generateMetadataColumn(schemaKey, schemaProperty, labelIdPrefix) {
    console.log('processing', schemaKey);
    const [componentName, componentProps] = getMetadataComponent(
        schemaKey,
        schemaProperty
    );
    if (!componentName) {
        return undefined;
    }
    return {
        id: schemaKey,
        type: 'field',
        component: componentName,
        componentProps: {
            ...componentProps,
            header: {
                id: `${labelIdPrefix}.${schemaKey}.header`,
                defaultMessage: startCase(schemaKey),
            },
        },
    };
}

function buildColumnMetadata(schemaFilePath, entityName) {
    let fieldMetadata = [];
    const schemaFile = JSON5.parse(fs.readFileSync(schemaFilePath));

    const labelIdPrefix = entityName?.toLowerCase();
    const test = extractTargetDefinition(schemaFile, entityName);
    if (test?.properties) {
        const fields = Object.keys(test.properties).map(key =>
            generateMetadataColumn(key, test.properties[key], labelIdPrefix)
        );
        fieldMetadata = [...fieldMetadata, ...fields];
    }

    return fieldMetadata;
}

module.exports = { buildColumnMetadata };
