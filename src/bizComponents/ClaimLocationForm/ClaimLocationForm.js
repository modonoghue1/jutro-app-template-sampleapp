// @ts-check
import React, { useCallback, useState } from 'react';
import { pickBy, set } from 'lodash';
import { warning } from '@jutro/logger';
import { AddressComponent } from '@business-patterns/address-component';
import { BasicForm } from '../../bizPatterns/BasicForm/BasicForm';
import { useAPI } from '../../helpers/useAPI';
import uiProps from './ClaimLocationForm.metadata.json5';

export const ClaimLocationForm = ({ id, claimId, data, onClose, title }) => {
    const [formData, setFormData] = useState(() => ({
        address: { ...data },
    }));

    const claimApi = useAPI();

    const handleCancel = useCallback(() => {
        onClose && onClose();
    }, [onClose]);

    const handleSave = useCallback(
        async editedData => {
            const addressData = editedData.address;
            try {
                const changesOnly = pickBy(addressData, (value, key) => {
                    if (key === 'id' || key === '_checksum') {
                        return false;
                    }
                    return value !== data[key];
                });
                if (changesOnly.state) {
                    changesOnly.state = addressData.state;
                }

                // @ts-ignore
                const result = await claimApi.patchClaim({
                    lossLocation: changesOnly,
                    id: claimId,
                });
                onClose && onClose(result);
            } catch (ex) {
                const message = claimApi.formatApiError(ex);
                // eslint-disable-next-line no-alert
                warning(message);
            }
            return true;
        },
        [claimApi, claimId, onClose, data]
    );

    const writeValue = useCallback((value, path) => {
        setFormData(oldData => {
            const newData = { ...oldData };
            set(newData, path, value);
            return newData;
        });
    }, []);

    return (
        <BasicForm
            id={id}
            title={title}
            uiProps={uiProps['claim.location.view']}
            data={formData}
            onSave={handleSave}
            onCancel={handleCancel}
            onDataChange={writeValue}
            componentMap={{ AddressComponent }}
        />
    );
};
