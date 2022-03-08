import React, { useState, useCallback, useRef } from 'react';
import { set, unset, isEmpty, cloneDeep } from 'lodash';
import { set as setFp } from 'lodash/fp';
import { MetadataForm } from '@jutro/uiconfig';
import { Section } from '@business-patterns/components';

const getInitialData = overrideProps => {
    return Object.entries(overrideProps).reduce(
        (initialData, [componentId, componentProps]) => {
            componentProps?.initialData &&
                set(initialData, componentId, componentProps.initialData);
            return initialData;
        },
        {}
    );
};

const getSectionWithPath = section => ({
    ...section,
    componentProps: {
        ...section.componentProps,
        path: section.id,
    },
});

const getWrappedSection = section => ({
    id: `${section.id}.section`,
    type: 'container',
    component: 'BusinessSection',
    componentProps: {
        title: section.title,
        fluid: true,
    },
    content: [getSectionWithPath(section)],
});

export const MultiSectionForm = ({
    overrideProps = {},
    uiProps,
    componentMap: externalComponentMap,
    onSuccessfulSubmit,
    onUnsuccessfulSubmit,
    onCancel,
    path,
}) => {
    const [formData, setFormData] = useState(getInitialData(overrideProps));
    const [showErrors, setShowErrors] = useState(false);
    const validationMessages = useRef({});

    const onSubmit = useCallback(() => {
        const validationMessagesObject = path
            ? validationMessages.current[path]
            : validationMessages.current;
        if (isEmpty(validationMessagesObject)) {
            setShowErrors(false);
            onSuccessfulSubmit(formData);
        } else {
            setShowErrors(true);
            onUnsuccessfulSubmit &&
                onUnsuccessfulSubmit(validationMessages.current);
        }
    }, [formData, path, onSuccessfulSubmit, onUnsuccessfulSubmit]);

    const onDataChange = useCallback(
        (value, fieldPath, { dataPath: subComponentPath }) => {
            setFormData(previousFormData =>
                setFp(
                    `${subComponentPath}.${fieldPath}`,
                    value,
                    previousFormData
                )
            );
            onSubmit();
        },
        [onSubmit]
    );

    const onValidationChange = useCallback(
        subComponentPath => (isValid, fieldPath, messages) => {
            if (!isValid) {
                set(
                    validationMessages.current,
                    `${subComponentPath}.${fieldPath}`,
                    messages
                );
            } else {
                unset(
                    validationMessages.current,
                    `${subComponentPath}.${fieldPath}`
                );
                if (isEmpty(validationMessages.current[subComponentPath])) {
                    unset(validationMessages.current, subComponentPath);
                }
            }
        },
        []
    );

    const mergedOverrideProps = useCallback(() => {
        uiProps.content.forEach(section => {
            overrideProps[section.id] = {
                ...overrideProps?.[section.id],
                onValidationChange,
                showErrors,
            };
        });
        return overrideProps;
    }, [onValidationChange, overrideProps, showErrors, uiProps.content]);

    const wrappedUiProps = () => {
        const clonedUiProps = cloneDeep(uiProps);
        clonedUiProps.content = clonedUiProps.content.map(getWrappedSection);
        return clonedUiProps;
    };

    const callbackMap = { onSubmit, onCancel };
    const componentMap = { ...externalComponentMap, BusinessSection: Section };

    return (
        <MetadataForm
            overrideProps={mergedOverrideProps()}
            uiProps={wrappedUiProps()}
            data={formData}
            callbackMap={callbackMap}
            componentMap={componentMap}
            onDataChange={onDataChange}
        />
    );
};
