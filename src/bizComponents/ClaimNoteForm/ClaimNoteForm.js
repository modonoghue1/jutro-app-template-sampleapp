// @ts-check
import React, { useCallback } from 'react';
import { pickBy } from 'lodash';
import PropTypes from 'prop-types';
import { warning } from '@jutro/logger';
import { BasicForm } from '../../bizPatterns/BasicForm/BasicForm';
import uiMetadata from './ClaimNoteForm.metadata.json5';
import { useAPI } from '../../helpers/useAPI';

const claimNoteFormPropTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    claimId: PropTypes.string,
    data: PropTypes.any,
};

export const ClaimNoteForm = ({ id, claimId, data, onClose }) => {
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
                    result = await claimApi.createClaimNote(claimId, formData);
                } else {
                    // Calculate changes only to send to update
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
                    result = await claimApi.updateNote(changesOnly);
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
            title={isNew ? 'New Note' : 'Edit Note'}
            uiProps={uiProps['claim.notes.view']}
            data={data}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
};

ClaimNoteForm.propTypes = claimNoteFormPropTypes;
