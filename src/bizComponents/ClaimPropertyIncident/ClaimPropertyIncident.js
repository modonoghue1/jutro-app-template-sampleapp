// @ts-check
import React, { useCallback, useState } from 'react';
import { Button } from '@jutro/components';
import { useAPI } from '../../helpers/useAPI';
import { useAsync } from '../../helpers/useAsync';
import { ListView } from '../../bizPatterns/ListView/ListView';
import { ClaimPropertyIncidentForm } from '../ClaimPropertyIncidentForm/ClaimPropertyIncidentForm';

export const ClaimPropertyIncident = ({ id, title, claimId }) => {
    const claimApi = useAPI();

    const {
        execute: loadPropertyIncidentData,
        value: incidentsData,
        pending: incidentsPending,
    } = useAsync(
        () => claimApi.getClaimFixedPropertyIncidents(claimId),
        [claimApi, claimId],
        true
    );
    const [selectedPropertyIncident, setSelectedPropertyIncident] = useState();
    const handleNewPropertyIncident = useCallback(() => {
        setSelectedPropertyIncident('new');
    }, [setSelectedPropertyIncident]);

    const handleEditPropertyIncident = useCallback(
        async PropertyIncidentId => {
            const PropertyIncidentData = await claimApi.getFixedPropertyIncident(
                claimId,
                PropertyIncidentId
            );
            setSelectedPropertyIncident(PropertyIncidentData);
        },
        [setSelectedPropertyIncident, claimApi, claimId]
    );

    const handleClose = useCallback(
        PropertyIncident => {
            if (PropertyIncident) {
                loadPropertyIncidentData();
            }
            setSelectedPropertyIncident();
        },
        [loadPropertyIncidentData, setSelectedPropertyIncident]
    );

    const columns = ['ocp', 'severity', 'lpt', 'action'];

    const columnHeader = ['Occupancy Type', 'Severity', 'Loss Party', 'Action'];
    const columnDefs = [
        {
            id: 'ocp',
            path: 'occupancyType.name',
        },
        {
            id: 'severity',
            path: 'severity.code',
            secondaryPath: 'severity.name',
            type: 'status',
            columnMap: {
                minor: 'success',
                moderateprop: 'warning',
                severegen: 'error',
                majorprop: 'error',
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
            columnCallback: handleEditPropertyIncident,
        },
    ];

    if (selectedPropertyIncident) {
        return (
            <ClaimPropertyIncidentForm
                id={`${id}Form`}
                title="New PropertyIncident"
                claimId={claimId}
                data={
                    selectedPropertyIncident === 'new'
                        ? undefined
                        : selectedPropertyIncident
                }
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
                <Button key="newIncident" onClick={handleNewPropertyIncident}>
                    New Incident
                </Button>,
            ]}
        />
    );
};
