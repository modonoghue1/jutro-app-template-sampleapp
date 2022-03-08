const fs = require('fs');
const JSON5 = require('json5');
const { startCase } = require('lodash');
const {
    extractTargetDefinition,
} = require('./openapiHelpers/schemaHelpers.js');
const { getRestService } = require('./getRestService');

async function lookupTypelist(typelist) {
    try {
        const json = await getRestService()
            .get('common/v1')
            .then(res => res.json());
        const fetchedTypeKeys = json?.data?.attributes?.typeKeys;
        if (fetchedTypeKeys) {
            const typeKeys = fetchedTypeKeys.map(typekey => ({
                categories: typekey.categories,
                code: typekey.code,
                name: typekey.name,
            }));
            return typeKeys;
        }
    } catch (err) {
        console.log('*** error ***', err);
    }
    return [{ code: typelist, name: typelist }];
}

function getMetadataComponent(schemaKey, schemaProperty, requiredForCreate) {
    let componentName = 'FixMe';
    let componentProps;

    const {
        type,
        format,
        readOnly,
        maxLength,
        minLength,
        nullable,
        pattern,
    } = schemaProperty;
    const extensions = schemaProperty['x-gw-extensions'];

    switch (type) {
        case 'boolean':
            componentName = 'Toggle';
            break;
        case 'string':
            if (format === 'date-time') {
                componentName = 'Date';
                componentProps = {
                    dataType: 'date-time',
                };
            } else if (maxLength > 255) {
                componentName = 'TextArea';
                componentProps = {
                    maxLength,
                    minLength: minLength > 1 ? minLength : undefined,
                    nullable,
                    autoTrim: pattern === '\\S' ? true : undefined,
                };
            } else {
                componentName = 'Input';
                if (maxLength || minLength || nullable || pattern) {
                    componentProps = {
                        maxLength,
                        minLength: minLength > 1 ? minLength : undefined,
                        nullable,
                        autoTrim: pattern === '\\S' ? true : undefined,
                    };
                }
            }
            break;
        case 'array':
            {
                const itemType = schemaProperty?.items?.type;
                const itemRef = schemaProperty?.items?.$ref;
                if (itemType === 'string') {
                    componentName = 'TypeaheadMultiSelect';
                } else {
                    const referenceType =
                        itemRef?.substr(itemRef?.lastIndexOf('/') + 1) ||
                        itemType;
                    componentName = 'ArrayRef';
                    componentProps = {
                        referenceType,
                    };
                }
            }
            break;
        case 'object':
        default:
            if (schemaProperty.$ref?.includes('TypeKeyReference')) {
                const typelist =
                    schemaProperty['x-gw-typelist'] || extensions?.typeList;
                const typelistFilter = schemaProperty['x-gw-filterBy'];
                const choices = schemaProperty['x-gw-choices'];
                componentName = 'DropdownSelect';
                let choiceList;
                if (choices && choices.length) {
                    choiceList = choices.map(choice => ({
                        code: choice.code,
                        name: choice.name,
                    }));
                } else {
                    choiceList = [{ code: typelist, name: typelist }];
                    // typelist values will be resolved later
                }
                componentProps = {
                    dataType: 'object',
                    availableValues: choiceList,
                    availableValuesInfo:
                        typelist || typelistFilter
                            ? {
                                  typelist,
                                  typelistFilter,
                              }
                            : undefined,
                };
            } else if (schemaProperty.$ref?.includes('SimpleReference')) {
                const referenceType =
                    schemaProperty['x-gw-referenceType'] ||
                    extensions?.resourceType;
                componentName = 'SimpleRef';
                componentProps = {
                    referenceType,
                };
            } else if (schemaProperty.$ref) {
                const referenceType = schemaProperty.$ref.substr(
                    schemaProperty.$ref.lastIndexOf('/') + 1
                );
                componentName = 'ObjectRef';
                componentProps = {
                    referenceType,
                };
            }
            break;
    }

    if (readOnly) {
        componentProps = { ...componentProps, readOnly: true };
    }

    if (requiredForCreate?.includes(schemaKey)) {
        componentProps = { ...componentProps, requiredForCreate: true };
    }

    if (schemaProperty['x-gw-createOnly'] || extensions?.createOnly) {
        componentProps = { ...componentProps, createOnly: true };
    }

    componentProps = { ...componentProps, path: schemaKey };

    return [componentName, componentProps];
}

function generateMetadataField(
    schemaKey,
    schemaProperty,
    labelIdPrefix,
    requiredForCreate
) {
    console.log('processing field:', schemaKey);
    const [componentName, componentProps] = getMetadataComponent(
        schemaKey,
        schemaProperty,
        requiredForCreate
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
            label: {
                id: `${labelIdPrefix}.${schemaKey}.label`,
                defaultMessage: startCase(schemaKey),
            },
        },
    };
}

async function buildFieldMetadata(schemaFilePath, entityName) {
    let fieldMetadata = [];
    const schemaFile = JSON5.parse(fs.readFileSync(schemaFilePath));

    const labelIdPrefix = entityName?.toLowerCase();
    if (schemaFile.$schema || schemaFile.openapi || schemaFile.swagger) {
        console.log('processing entity:', entityName);
        const test = extractTargetDefinition(schemaFile, entityName);
        if (test?.properties) {
            const fields = Object.keys(test.properties).map(key =>
                generateMetadataField(
                    key,
                    test.properties[key],
                    labelIdPrefix,
                    test['x-gw-requiredForCreate']
                )
            );

            // post-process typelist fields: look up typelist values
            console.log('resolving typelist values...');
            const typelistFields = fields.filter(
                field => field?.componentProps?.availableValuesInfo?.typelist
            );
            const typeListPromises = typelistFields.map(field =>
                lookupTypelist(
                    field?.componentProps?.availableValuesInfo?.typelist
                )
            );

            // post-process typelist fields: apply typelist values
            const typelistResults = await Promise.all(typeListPromises);
            typelistFields.forEach((field, index) => {
                field.componentProps.availableValues = typelistResults[index];
            });

            fieldMetadata = [...fieldMetadata, ...fields];
        }
    } else if (schemaFile.product) {
        console.log('found product:', schemaFile.product.name);
        console.log('processing entity:', entityName);
        fieldMetadata.push('this is probably apd output');
    }

    return fieldMetadata;
}

module.exports = { buildFieldMetadata };
