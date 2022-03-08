// @ts-check
import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, ClickableCard, Card } from '@jutro/components';
import { ButtonLink } from '@jutro/router';
import { Grid } from '@jutro/layout';
import { FormattedMessage } from '@jutro/locale';
import { useAsync } from '../../helpers/useAsync';
import { useAPI } from '../../helpers/useAPI';
import styles from './Dashboard.module.scss';
import { useClaimModal } from '../../helpers/useClaimModal';
import { ClaimsList } from '../../bizComponents/ClaimsList/ClaimsList';

const TileContent = ({ title, count, active }) => {
    return (
        <div className={styles.tileContent}>
            <span className={styles.tileCount}>{count || '-'}</span>
            <span className={styles.tileTitle}>{title}</span>
            {active && <div className={styles.tileActiveBar} />}
        </div>
    );
};

export const Dashboard = () => {
    const history = useHistory();
    const params = useParams();
    const claimApi = useAPI();
    const { triggerModal } = useClaimModal();

    const [shouldWaitForClaims, setShouldWaitForClaims] = useState(false);

    const { value: claims } = useAsync(
        () => {
            const filter = 'state:eq:open';
            return claimApi.getClaims({
                filter: filter && ['assignedUser:eq:demo_sample::1', filter],
                fields: ['id'],
                // add pageSize of 1 to minimize the results
                pageSize: 1,
            });
        },
        [claimApi],
        true
    );

    const handleClaimClick = claim => {
        const claimLink = `/claim/${claim.id}/details`;
        history.push(claimLink);
    };

    // get 'total' from the results for this big number
    // calculation
    const claimCount = claims?.total || '--';

    return (
        <div className={styles.dashboard}>
            <Grid>
                <Grid columns={[1, 1, 1, 1]}>
                    <ClickableCard
                        className={styles.tile}
                        onClick={() => history.push('/dashboard/policies')}
                    >
                        <TileContent
                            title="Policies"
                            active={params.selection === 'policies'}
                        />
                    </ClickableCard>
                    <ClickableCard
                        className={styles.tile}
                        onClick={() => history.push('/dashboard/renewals')}
                    >
                        <TileContent
                            title="Renewals"
                            active={params.selection === 'renewals'}
                        />
                    </ClickableCard>
                    <ClickableCard
                        className={styles.tile}
                        onClick={() => history.push('/dashboard/claims')}
                    >
                        <TileContent
                            title="Claims"
                            count={claimCount}
                            active={params.selection === 'claims'}
                        />
                    </ClickableCard>
                    <ClickableCard
                        className={styles.tile}
                        onClick={() => history.push('/dashboard/payments')}
                    >
                        <TileContent
                            title="Payments"
                            active={params.selection === 'payments'}
                        />
                    </ClickableCard>
                </Grid>
                {params.selection === 'claims' && (
                    <Grid>
                        <Card id="claimsCard" className={styles.dashboardCard}>
                            <ClaimsList
                                id="claims"
                                icon="mio drive-eta"
                                title="Claims"
                                titleBarClassName={styles.titleBar}
                                filtersClassName={styles.filters}
                                actions={[
                                    <Button
                                        key="newClaim"
                                        id="newClaim"
                                        onClick={() =>
                                            triggerModal().then(() =>
                                                setShouldWaitForClaims(true)
                                            )
                                        }
                                        className={styles.actionButtons}
                                    >
                                        <FormattedMessage
                                            id="jutro-app.add-button.label"
                                            defaultMessage="New Claim"
                                        />
                                    </Button>,
                                    <ButtonLink
                                        key="newFNOL"
                                        id="newFNOL"
                                        to="/claim/fnol"
                                        className={styles.actionButtons}
                                    >
                                        New FNOL
                                    </ButtonLink>,
                                ]}
                                // ** ui metadata + overrides **
                                columns={[
                                    'claimNumber',
                                    'policyNumber',
                                    'lossType',
                                    'lossCause',
                                    'mainContact',
                                    'claimantPhone',
                                    'state',
                                    'actions',
                                ]}
                                // *default,*details,*summary,*all
                                columnDefs={[]}
                                filters={[
                                    { name: 'Open', filter: 'state:eq:open' },
                                    {
                                        name: 'Closed',
                                        filter: 'state:eq:closed',
                                    },
                                    { name: 'Draft', filter: 'state:eq:draft' },
                                    { name: 'All', filter: 'state:ne:null' },
                                ]}
                                onRowClick={handleClaimClick}
                                shouldWaitForClaims={shouldWaitForClaims}
                                setShouldWaitForClaims={setShouldWaitForClaims}
                            />
                        </Card>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};
