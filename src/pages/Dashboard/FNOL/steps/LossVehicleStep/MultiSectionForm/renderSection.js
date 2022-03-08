import React from 'react';
import { MetadataForm } from '@jutro/uiconfig';

export const renderSection = (props, propsOverrides) => {
    const {
        uiProps,
        showErrors,
        onValidationChange,
        data,
        path,
        onDataChange,
    } = props;

    const overrideProps = {
        ...propsOverrides?.overrideProps,
        '@field': {
            ...propsOverrides?.overrideProps?.['@field'],
            dataPath: path,
            onValidationChange: onValidationChange(path),
        },
        '@container': {
            ...propsOverrides?.overrideProps?.['@container'],
            dataPath: path,
        },
    };

    return (
        <MetadataForm
            {...propsOverrides}
            uiProps={uiProps}
            data={data}
            overrideProps={overrideProps}
            onDataChange={onDataChange}
            showOptional
            showErrors={showErrors}
        />
    );
};
