// @ts-check
import React, { useCallback } from 'react';
import { pickBy } from 'lodash';
import PropTypes from 'prop-types';
import { warning } from '@jutro/logger';
import { BasicForm } from '../../bizPatterns/BasicForm/BasicForm';
import uiMetadata from './ClaimInjuryForm.metadata.json5';
import { useAPI } from '../../helpers/useAPI';

const claimInjuryFormPropTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    claimId: PropTypes.string,
    data: PropTypes.any,
};

export const ClaimInjuryForm = ({ id, claimId, data, onClose }) => {
    const claimApi = useAPI();
    const isNew = !data?.id;

    const handleCancel = useCallback(() => {
        onClose && onClose();
    }, [onClose]);

    const handleSave = useCallback(
        async formData => {
            try {
                let result;
                if (isNew) {
                    result = await claimApi.createClaimInjuryIncident(
                        claimId,
                        formData
                    );
                } else {
                    const changesOnly = pickBy(formData, (value, key) => {
                        if (
                            key === 'id' ||
                            key === '_checksum' ||
                            key === '_actions'
                        ) {
                            return true;
                        }
                        return value !== data[key];
                    });
                    result = await claimApi.patchInjuryIncident(
                        claimId,
                        changesOnly
                    );
                }
                onClose && onClose(result);
            } catch (ex) {
                const message = claimApi.formatApiError(ex);
                warning(message);
            }
            return true;
        },
        [onClose, claimId, data, claimApi, isNew]
    );

    const uiProps = uiMetadata;

    return (
        <BasicForm
            id={id}
            title={isNew ? 'New Injury' : 'Edit Injury'}
            uiProps={uiProps['claim.injury.incident.view']}
            data={data}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
};

ClaimInjuryForm.propTypes = claimInjuryFormPropTypes;
