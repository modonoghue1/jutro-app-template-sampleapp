// @ts-check
import React, { useCallback, useState } from 'react';
import { Button } from '@jutro/components';
import { useAPI } from '../../helpers/useAPI';
import { useAsync } from '../../helpers/useAsync';
import { ListView } from '../../bizPatterns/ListView/ListView';
import { ClaimVehicleForm } from '../ClaimVehicleForm/ClaimVehicleForm';

export const ClaimVehicle = ({ id, title, claimId }) => {
    const claimApi = useAPI();

    const {
        execute: loadVehicleData,
        value: incidentsData,
        pending: incidentsPending,
    } = useAsync(
        () => claimApi.getClaimVehicleIncidents(claimId),
        [claimApi, claimId],
        true
    );
    const [selectedVehicle, setSelectedVehicle] = useState();
    const handleNewVehicle = useCallback(() => {
        setSelectedVehicle('new');
    }, [setSelectedVehicle]);

    const handleEditVehicle = useCallback(
        async VehicleId => {
            const VehicleData = await claimApi.getVehicleIncident(
                claimId,
                VehicleId
            );
            setSelectedVehicle(VehicleData);
        },
        [setSelectedVehicle, claimId, claimApi]
    );

    const handleClose = useCallback(
        Vehicle => {
            if (Vehicle) {
                loadVehicleData();
            }
            setSelectedVehicle();
        },
        [loadVehicleData, setSelectedVehicle]
    );

    const columns = [
        'vehicle',
        'lpt',
        ['vdt1', 'vdt2', 'vdt3'],
        'VIN',
        'action',
    ];

    const columnHeader = [
        'Display Name',
        'License Plate',
        'Vehicle Info',
        'VIN',
        'Action',
    ];

    const columnDefs = [
        {
            id: 'vehicle',
            path: 'vehicle.displayName',
        },
        {
            id: 'lpt',
            path: 'vehicle.licensePlate',
        },
        {
            id: 'vdt1',
            path: 'vehicle.year',
        },
        {
            id: 'vdt2',
            path: 'vehicle.make',
        },
        {
            id: 'vdt3',
            path: 'vehicle.model',
        },
        {
            id: 'VIN',
            path: 'vehicle.vin',
        },
        {
            id: 'action',
            path: '_actions.0',
            type: 'action',
            columnCallback: handleEditVehicle,
        },
    ];

    if (selectedVehicle) {
        return (
            <ClaimVehicleForm
                id={`${id}Form`}
                title="New Vehicle"
                claimId={claimId}
                data={selectedVehicle === 'new' ? undefined : selectedVehicle}
                onClose={handleClose}
            />
        );
    }

    return (
        <ListView
            id={id}
            title={title}
            loading={incidentsPending}
            data={incidentsData}
            columns={columns}
            colHeaders={columnHeader}
            columnDefs={columnDefs}
            actions={[
                <Button key="newVehicle" onClick={handleNewVehicle}>
                    New Vehicle
                </Button>,
            ]}
        />
    );
};
