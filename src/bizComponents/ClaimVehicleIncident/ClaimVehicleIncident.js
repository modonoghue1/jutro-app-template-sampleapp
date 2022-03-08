// @ts-check
import React, { useCallback, useState } from 'react';
import { Button } from '@jutro/components';
import { useAPI } from '../../helpers/useAPI';
import { useAsync } from '../../helpers/useAsync';
import { ListView } from '../../bizPatterns/ListView/ListView';
import { ClaimVehicleIncidentForm } from '../ClaimVehicleIncidentForm/ClaimVehicleIncidentForm';

export const ClaimVehicleIncident = ({ id, title, claimId }) => {
    const claimApi = useAPI();

    const {
        execute: loadVehicleIncidentData,
        value: incidentsData,
        pending: incidentsPending,
    } = useAsync(
        () => claimApi.getClaimVehicleIncidents(claimId),
        [claimApi, claimId],
        true
    );
    const [selectedVehicleIncident, setSelectedVehicleIncident] = useState();
    const handleNewVehicleIncident = useCallback(() => {
        setSelectedVehicleIncident('new');
    }, [setSelectedVehicleIncident]);

    const handleEditVehicleIncident = useCallback(
        async VehicleIncidentId => {
            const VehicleIncidentData = await claimApi.getVehicleIncident(
                claimId,
                VehicleIncidentId
            );
            setSelectedVehicleIncident(VehicleIncidentData);
        },
        [setSelectedVehicleIncident, claimId, claimApi]
    );

    const handleClose = useCallback(
        VehicleIncident => {
            if (VehicleIncident) {
                loadVehicleIncidentData();
            }
            setSelectedVehicleIncident();
        },
        [loadVehicleIncidentData, setSelectedVehicleIncident]
    );

    const columns = ['cpt', 'priority', 'ddesc', 'cls', 'lpt', 'action'];

    const columnHeader = [
        'Collision Point',
        'Priority',
        'Description',
        'Collision',
        'Loss Party',
        'Action',
    ];
    const columnDefs = [
        {
            id: 'cpt',
            header: 'Collision Point',
            path: 'collisionPoint.name',
        },
        {
            id: 'priority',
            path: 'severity.code',
            secondaryPath: 'severity.name',
            type: 'status',
            columnMap: {
                moderateauto: 'warning',
                majorauto: 'error',
                minorauto: 'success',
            },
        },
        {
            id: 'ddesc',
            path: 'damageDescription',
        },
        {
            id: 'cls',
            path: 'collision',
            type: 'icon',
            columnMap: {
                true: 'mi-check',
                false: 'mi-close',
            },
        },
        {
            id: 'lpt',
            path: 'lossParty.name',
        },
        {
            id: 'action',
            path: '_actions.0',
            type: 'action',
            columnCallback: handleEditVehicleIncident,
        },
    ];

    if (selectedVehicleIncident) {
        return (
            <ClaimVehicleIncidentForm
                id={`${id}Form`}
                title="New VehicleIncident"
                claimId={claimId}
                data={
                    selectedVehicleIncident === 'new'
                        ? undefined
                        : selectedVehicleIncident
                }
                onClose={handleClose}
                vehiclesData={incidentsData?.map(item => item.vehicle)}
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
                <Button key="newIncident" onClick={handleNewVehicleIncident}>
                    New Incident
                </Button>,
            ]}
        />
    );
};
