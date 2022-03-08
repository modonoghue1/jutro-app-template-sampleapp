// @ts-check
import React, { useCallback, useState } from 'react';
import { Button } from '@jutro/components';
import { useAPI } from '../../helpers/useAPI';
import { useAsync } from '../../helpers/useAsync';
import { ListView } from '../../bizPatterns/ListView/ListView';
import { ClaimInjuryForm } from '../ClaimInjuryIcidentsForm/ClaimInjuryForm';

export const ClaimInjuryIncident = ({ id, title, claimId }) => {
    const claimApi = useAPI();

    const {
        execute: loadincidentsData,
        value: incidentsData,
        pending: incidentsPending,
    } = useAsync(
        () => claimApi.getClaimInjuryIncidents(claimId),
        [claimApi, claimId],
        true
    );

    const [selectedInjury, setSelectedInjury] = useState();

    const handleNewInjury = useCallback(() => {
        setSelectedInjury('new');
    }, [setSelectedInjury]);

    const handleEditInjury = useCallback(
        async injuryId => {
            const injuryData = await claimApi.getInjuryIncident(
                claimId,
                injuryId
            );
            setSelectedInjury(injuryData);
        },
        [setSelectedInjury, claimId, claimApi]
    );

    const handleClose = useCallback(
        injury => {
            if (injury) {
                loadincidentsData();
            }
            setSelectedInjury();
        },
        [loadincidentsData, setSelectedInjury]
    );

    const columnDefs = [
        {
            id: 'severity',
            path: 'severity.code',
            secondaryPath: 'severity.name',
            type: 'status',
            columnMap: {
                moderategen: 'warning',
                majorgen: 'error',
                majorinjury: 'error',
                severegen: 'error',
                minor: 'success',
            },
        },
        {
            id: 'ambulanceUsed',
            path: 'ambulanceUsed',
            type: 'icon',
            columnMap: {
                true: 'mi-check',
                false: 'mi-close',
            },
        },
        {
            id: 'detailedInjuryType',
            path: 'detailedInjuryType.name',
        },
        {
            id: 'disabledDueToAccident',
            path: 'disabledDueToAccident.name',
        },
        {
            id: 'generalInjuryType',
            path: 'generalInjuryType.name',
        },
        {
            id: 'lossParty',
            path: 'lossParty.name',
        },
        {
            id: 'lostWages',
            path: 'lostWages',
            type: 'icon',
            columnMap: {
                true: 'mi-check',
                false: 'mi-close',
            },
        },
        {
            id: 'action',
            path: '_actions.0',
            type: 'action',
            columnCallback: handleEditInjury,
        },
    ];
    const columns = [
        'severity',
        'ambulanceUsed',
        ['detailedInjuryType', 'generalInjuryType'],
        'disabledDueToAccident',
        'lossParty',
        'lostWages',
        'action',
    ];

    const colHeaders = [
        'Severity',
        'Ambulance Used',
        'Injury Type',
        'Disabled',
        'Loss Party',
        'Lost Wages',
        'Actions',
    ];

    if (selectedInjury) {
        return (
            <ClaimInjuryForm
                id={`${id}Form`}
                title="New Injury"
                claimId={claimId}
                data={selectedInjury === 'new' ? undefined : selectedInjury}
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
            colHeaders={colHeaders}
            columns={columns}
            columnDefs={columnDefs}
            actions={[
                <Button key="newInjury" onClick={handleNewInjury}>
                    New Injury
                </Button>,
            ]}
        />
    );
};
