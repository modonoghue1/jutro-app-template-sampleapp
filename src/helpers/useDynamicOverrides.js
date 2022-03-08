import { useMemo } from 'react';
import { get } from 'lodash';

export function walkMetadataTree(uiProps, visitCallback, depth = 0) {
    if (Array.isArray(visitCallback)) {
        visitCallback.forEach(callback => callback(uiProps, depth));
    } else {
        visitCallback(uiProps, depth);
    }

    if (Array.isArray(uiProps.content)) {
        uiProps.content.forEach(element =>
            walkMetadataTree(element, visitCallback, depth + 1)
        );
    }
}

export function evaluateExpression(field, operator, value) {
    let fieldValue = field;
    if (typeof fieldValue === 'object') {
        if (fieldValue?.code !== undefined) {
            fieldValue = fieldValue.code;
        }
    } else if (typeof fieldValue !== 'string') {
        fieldValue = fieldValue?.toString();
    }

    let result;

    switch (operator) {
        case 'eq':
            result = fieldValue === value;
            break;
        case 'ne':
            result = fieldValue !== value;
            break;
        case 'lt':
        case 'gt':
        case 'le':
        case 'ge':
            break;
        case 'in':
        case 'ni':
            break;
        case 'sw':
        case 'cn':
            break;
        default:
            break;
    }

    return result;
}

export function applyRequiredForCreate(uiProps /*, depth */) {
    if (uiProps?.componentProps?.requiredForCreate === true) {
        return { require: true };
    }
}

export function applyCreateOnly(uiProps /* depth */) {
    if (uiProps?.componentProps?.createOnly === true) {
        return { readOnly: true };
    }
}

export function applyDynamicProps(uiProps, /* depth */ data) {
    if (uiProps?.dynamicProps) {
        const rule = uiProps?.dynamicProps[0];
        const { if: ifProp, then: thenProp, else: elseProp } = rule;
        const [path, operator, value] = ifProp.split(':');
        if (path && operator && value) {
            const result = evaluateExpression(get(data, path), operator, value);
            if (result && thenProp) {
                return thenProp;
            }
            if (!result && elseProp) {
                return elseProp;
            }
        }
    }
}

export function useDynamicOverrides(uiProps, data, isNew) {
    const fieldsWithDynamicProps = useMemo(() => {
        const fields = [];
        const contentProps = Array.isArray(uiProps)
            ? { content: uiProps }
            : uiProps;
        walkMetadataTree(contentProps, props => {
            if (
                props?.dynamicProps ||
                props?.componentProps?.requiredForCreate ||
                props?.componentProps?.createOnly
            ) {
                fields.push(props);
            }
        });
        return fields;
    }, [uiProps]);

    const overrideProps = useMemo(() => {
        const test = fieldsWithDynamicProps.reduce((overrides, props) => {
            const { id } = props;

            // apply REST api props
            let results = isNew
                ? applyRequiredForCreate(props)
                : applyCreateOnly(props);
            if (results) {
                overrides[id] = results;
            }

            // apply dynamic props
            results = applyDynamicProps(props, data);
            if (results) {
                overrides[id] = {
                    ...overrides[id],
                    ...results,
                };
            }
            return overrides;
        }, {});
        return test;
    }, [fieldsWithDynamicProps, data, isNew]);

    return overrideProps;
}
