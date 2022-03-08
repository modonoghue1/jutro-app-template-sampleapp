// @ts-check
import React, { useCallback, useMemo } from 'react';
import { pickBy, keys, pick } from 'lodash';
import PropTypes from 'prop-types';
import { warning } from '@jutro/logger';
import { BasicForm } from '../../bizPatterns/BasicForm/BasicForm';
import uiMetadata from './ClaimVehicleForm.metadata.json5';
import { useAPI } from '../../helpers/useAPI';

const claimVehicleFormPropTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    claimId: PropTypes.string,
    data: PropTypes.any,
};

const vehcileResponseModel = {
    make: null,
    model: null,
    licensePlate: null,
    state: null,
    vin: null,
    year: null,
};
export const ClaimVehicleForm = ({ id, claimId, data, onClose }) => {
    const claimApi = useAPI();
    const isNew = !data?.id;

    const overrideProps = useMemo(
        () => ({
            displayName: {
                visible: !isNew,
            },
            policyVehicle: {
                visible: !isNew,
            },
        }),
        [isNew]
    );

    const handleCancel = useCallback(() => {
        onClose && onClose();
    }, [onClose]);

    const handleSave = useCallback(
        async formData => {
            try {
                let result;
                if (isNew) {
                    result = await claimApi.createClaimVehicleIncident(
                        claimId,
                        formData
                    );
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
                    const vehcileData = pick(
                        data.vehicle,
                        keys(vehcileResponseModel)
                    );
                    result = await claimApi.patchVehicleIncident(claimId, {
                        ...changesOnly,
                        vehicle: vehcileData,
                    });
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
            title={isNew ? 'New Vehicle' : 'Edit Vehicle'}
            uiProps={uiProps['claim.vehicle.view']}
            overrideProps={overrideProps}
            data={data}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
};

ClaimVehicleForm.propTypes = claimVehicleFormPropTypes;
