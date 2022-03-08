// @ts-check
import React, { useCallback, useMemo } from 'react';
import { pickBy, keys, pick, sortedUniqBy } from 'lodash';
import PropTypes from 'prop-types';
import { warning } from '@jutro/logger';
import { BasicForm } from '../../bizPatterns/BasicForm/BasicForm';
import uiMetadata from './ClaimVehicleIncident.metadata.json5';
import { useAPI } from '../../helpers/useAPI';

const claimVehicleIncidentFormPropTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    claimId: PropTypes.string,
    data: PropTypes.any,
    vehiclesData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const vehcileResponseModel = {
    make: null,
    model: null,
    licensePlate: null,
    state: null,
    vin: null,
    year: null,
};
export const ClaimVehicleIncidentForm = ({
    id,
    claimId,
    data,
    onClose,
    vehiclesData,
}) => {
    const claimApi = useAPI();
    const isNew = !data?.id;
    const showVehcileSelect = vehiclesData?.id;

    const availableVehicles = sortedUniqBy(
        vehiclesData
            ?.filter(item => item !== undefined)
            ?.map(item => {
                return { code: item?.id, name: item?.displayName };
            })
            .sort((item1, item2) => {
                return (
                    item1.name.localeCompare(item2.name) ||
                    item2.code - item1.code
                );
            }),
        'name'
    );

    const overrideProps = useMemo(
        () => ({
            vehicleSelect: {
                visible: !showVehcileSelect,
                availableValues: availableVehicles,
            },
        }),
        [availableVehicles, showVehcileSelect]
    );

    const handleCancel = useCallback(() => {
        onClose && onClose();
    }, [onClose]);

    const handleSave = useCallback(
        async formData => {
            try {
                let result;
                if (isNew) {
                    const [selectedvehicle] = vehiclesData.filter(
                        vh => vh.id === formData.vehicle.code
                    );
                    const resPonse = {
                        vehicle: pick(
                            selectedvehicle,
                            keys(vehcileResponseModel)
                        ),
                        damageDescription: formData.damageDescription,
                        collision: formData.collision,
                        severity: formData.severity,
                        lossParty: formData.lossParty,
                        collisionPoint: formData.collisionPoint,
                    };
                    result = await claimApi.createClaimVehicleIncident(
                        claimId,
                        resPonse
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
        [onClose, claimId, data, claimApi, isNew, vehiclesData]
    );

    const uiProps = uiMetadata;

    return (
        <BasicForm
            id={id}
            title={isNew ? 'New Incident' : 'Edit Incident'}
            uiProps={uiProps['claim.vehicle.incident.view']}
            overrideProps={overrideProps}
            data={data}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
};

ClaimVehicleIncidentForm.propTypes = claimVehicleIncidentFormPropTypes;
