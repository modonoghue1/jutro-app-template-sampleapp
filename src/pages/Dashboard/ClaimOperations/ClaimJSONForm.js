import React from 'react';
import PropTypes from 'prop-types';
import { extractSubSchema, MetadataForm } from '@jutro/uiconfig';
import {
    applyRequiredForCreate,
    applyCreateOnly,
    walkMetadataTree,
} from '../../../helpers/useDynamicOverrides';

import uberSchema from './claim.openapi.json';
import uiMetadata from './ClaimJSONForm.metadata.json5';

export default class ClaimJSONForm extends React.Component {
    static propTypes = {
        renderWithMetadata: PropTypes.bool,
        uiMetadataKey: PropTypes.string,
        data: PropTypes.object,
        showErrors: PropTypes.bool,
        onDataChange: PropTypes.func,
        onValidationChange: PropTypes.func,
    };

    static defaultProps = {
        renderWithMetadata: true,
        uiMetadataKey: 'jutro-components.metadata-driven.jsonexample',
    };

    constructor(props) {
        super(props);
        this.dataSchema = extractSubSchema(uberSchema, 'Claim');
        this.fieldsWithDynamicProps = undefined;
    }

    render() {
        const {
            renderWithMetadata,
            uiMetadataKey,
            data,
            showErrors,
            isNew,
            onDataChange,
            onValidationChange,
        } = this.props;

        const uiProps = renderWithMetadata
            ? uiMetadata[uiMetadataKey]
            : undefined;

        const overrideProps = {};

        if (!this.fieldsWithDynamicProps) {
            this.fieldsWithDynamicProps = [];
            walkMetadataTree(uiProps?.content?.[0], props => {
                if (
                    props?.componentProps?.requiredForCreate ||
                    props?.componentProps?.createOnly
                ) {
                    this.fieldsWithDynamicProps.push(props);
                }
            });
        }

        if (this.fieldsWithDynamicProps?.length) {
            this.fieldsWithDynamicProps.reduce((overrides, props) => {
                const { id } = props;
                const results = isNew
                    ? applyRequiredForCreate(props)
                    : applyCreateOnly(props);
                if (results) {
                    overrides[id] = results;
                }
                return overrides;
            }, overrideProps);
        }

        return (
            <MetadataForm
                // ** ui metadata + overrides **
                uiProps={uiProps}
                overrideProps={overrideProps}
                // ** resolvers for callbacks, components and classes **
                // callbackMap={resolveCallbackMap}
                // ** data and callbacks **
                data={data}
                onDataChange={onDataChange}
                onValidationChange={onValidationChange}
                showErrors={showErrors}
                showRequired
            />
        );
    }
}
