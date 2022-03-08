import React from 'react';
import { Button } from '@jutro/components';
import { ListView } from '../../bizPatterns/ListView/ListView';
import { useAsyncPaging } from '../../helpers/useAsync';
import { useAPI } from '../../helpers/useAPI';

export const ClaimActivityList = ({ id, title = 'Activities', claimId }) => {
    const claimApi = useAPI();

    const {
        execute: loadActivities,
        value: activitiesData,
        pending: activitiesPending,
        count,
        total,
    } = useAsyncPaging(
        (pageOffset, pageSize) => {
            return claimApi.getClaimActivities(claimId, {
                pageOffset,
                pageSize,
            });
        },
        [claimApi, claimId /*, activeFilter */ /*, includes */]
    );

    const handleNext = () => {
        loadActivities(count);
    };

    return (
        <ListView
            id={id}
            title={title}
            count={count}
            total={total}
            loading={activitiesPending && !activitiesData}
            data={activitiesData}
            colHeaders={['Status', 'Subject', 'Priority']}
            // pass columnSizes if not auto
            // columnSizes={['auto', 'auto', 'auto']}
            columns={['status', 'sbj', 'prt']}
            columnDefs={[
                { id: 'status', path: 'status.name' },
                {
                    id: 'sbj',
                    path: 'subject',
                },
                {
                    id: 'prt',
                    path: 'priority.name',
                    type: 'status',
                    columnMap: {
                        High: 'warning',
                        Urgent: 'error',
                        Complete: 'success',
                    },
                },
            ]}
            actions={[
                count < total && (
                    <Button
                        key="loadMore"
                        type="text"
                        fullWidth
                        onClick={handleNext}
                    >
                        {activitiesPending ? 'Loading...' : 'Load More'}
                    </Button>
                ),
            ]}
        />
    );
};
