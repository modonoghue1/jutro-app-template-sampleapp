// @ts-check
import React, { useCallback, useEffect, useState } from 'react';
import { TableView } from '../../bizPatterns/TableView/TableView';
import { useAsync } from '../../helpers/useAsync';
import { useAPI } from '../../helpers/useAPI';
// eslint-disable-next-line no-unused-vars
import { ClaimActionColumn } from './ClaimActionColumn/ClaimActionColumn'; // this imported so it will self register in component map

import uiMetadata from './ClaimsList.metadata.json5';

export const ClaimsList = ({
    id,
    // titlebar props
    icon,
    iconColor,
    title,
    subtitle,
    actions,
    // api props
    filters,
    shouldWaitForClaims,
    setShouldWaitForClaims,
    // datatable props
    columns,
    columnDefs: columnDefsProp,
    onRowClick,
    titleBarClassName,
    filtersClassName,
}) => {
    const claimApi = useAPI();

    const [activeFilter, setActiveFilter] = useState(filters?.[0]?.filter);

    const {
        value: claims,
        pending: claimsPending,
        error: claimsError,
        execute,
    } = useAsync(
        () =>
            claimApi.getClaims({
                filter: activeFilter && [
                    'assignedUser:eq:demo_sample::1',
                    activeFilter,
                ],
                include: activeFilter?.includes('draft')
                    ? ''
                    : 'mainContact,reporter',
            }),
        [claimApi, activeFilter /*, include */],
        true
    );

    useEffect(() => {
        shouldWaitForClaims && execute && execute();
        setShouldWaitForClaims(false);
    }, [shouldWaitForClaims, execute, setShouldWaitForClaims]);

    const uiBaseColumns = uiMetadata['jutro-app.claimslist.columns'];

    const actionCallback = useCallback(
        (claimId, name) => {
            let apiCallbackResult;
            switch (name) {
                case 'cancel':
                    apiCallbackResult = claimApi
                        .cancel(claimId)
                        .then(() => setShouldWaitForClaims(true));
                    break;
                case 'closeClaim':
                    apiCallbackResult = claimApi
                        .closeClaim(claimId)
                        .then(() => setShouldWaitForClaims(true));
                    break;
                case 'submitClaim':
                    apiCallbackResult = claimApi.submitClaim(claimId);
                    break;
                case 'validate':
                    apiCallbackResult = claimApi.validate(claimId, {
                        validateExposures: true,
                        validationLevel: {
                            code: 'loadsave',
                        },
                    });
                    break;
                default:
                    return;
            }
            apiCallbackResult.catch(ex =>
                // eslint-disable-next-line no-alert
                alert(claimApi.formatApiError(ex))
            );
        },
        [claimApi, setShouldWaitForClaims]
    );

    return (
        <TableView
            id={id}
            icon={icon}
            iconColor={iconColor}
            title={title}
            subtitle={subtitle}
            loading={claimsPending}
            error={claimApi.formatApiError(claimsError)}
            titleBarClassName={titleBarClassName}
            filtersClassName={filtersClassName}
            columns={columns}
            columnDefs={[
                {
                    id: 'claimNumber',
                    label: 'Foo',
                },
                {
                    id: 'claimantPhone',
                    label: 'Claimant Phone',
                    path: 'mainContact._ref.primaryPhone',
                },
                {
                    id: 'actions',
                    label: 'Actions',
                    path: '_actions',
                    component: 'ClaimActionColumn',
                    componentProps: {
                        actionCallback: actionCallback,
                    },
                },
                ...columnDefsProp,
            ]}
            baseColumnDefs={uiBaseColumns}
            data={claims}
            filters={filters}
            onFilterChange={setActiveFilter}
            onRowClick={onRowClick}
            actions={actions}
        />
    );
};
