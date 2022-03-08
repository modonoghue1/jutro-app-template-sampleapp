// @ts-check
import React from 'react';
import { startCase } from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Link } from '@jutro/components';
import { Grid, Flex } from '@jutro/layout';
import { FormattedMessage } from '@jutro/locale';
import { DropdownMenu, DropdownMenuLink } from '@jutro/router';
import { useAsync } from '../../../helpers/useAsync';
import styles from './ClaimDetailsPage.module.scss';
import { useAPI } from '../../../helpers/useAPI';
import { useClaimModal } from '../../../helpers/useClaimModal';
import { ClaimSummary } from '../../../bizComponents/ClaimSummary/ClaimSummary';
import { ClaimActivityList } from '../../../bizComponents/ClaimActivityList/ClaimActivityList';
import { ClaimLocation } from '../../../bizComponents/ClaimLocation/ClaimLocation';
import { ClaimContacts } from '../../../bizComponents/ClaimContacts/ClaimContacts';
import { ClaimNotes } from '../../../bizComponents/ClaimNotes/ClaimNotes';
import { ClaimVehicle } from '../../../bizComponents/ClaimVehicle/ClaimVehicle';
import { ClaimInjuryIncident } from '../../../bizComponents/ClaimInjuryIncidents/ClaimInjuryIncident';
import { ClaimVehicleIncident } from '../../../bizComponents/ClaimVehicleIncident/ClaimVehicleIncident';
import { ClaimPropertyIncident } from '../../../bizComponents/ClaimPropertyIncident/ClaimPropertyIncident';
import { ClaimDetails } from '../../../bizComponents/ClaimDetails/ClaimDetails';

const ClaimActionsMenu = ({ id, actions }) => {
    const renderTrigger = (props, toggleMenu) => {
        const isOpen = props.isOpen;
        return (
            <Button icon="mi-more-horiz" onClick={() => toggleMenu(!isOpen)} />
        );
    };

    const actionItems = actions?.map(action => {
        if (action === 'patchClaim') {
            return null;
        }
        return (
            <DropdownMenuLink id={action} key={action}>
                {startCase(action)}
            </DropdownMenuLink>
        );
    });

    return (
        <DropdownMenu id={id} onRenderTrigger={renderTrigger}>
            {actionItems}
        </DropdownMenu>
    );
};

export const ClaimDetailsPage = () => {
    const params = useParams();
    const history = useHistory();
    const claimApi = useAPI();

    const claimId = params.claimid;

    const { value: claimData, pending: claimPending } = useAsync(
        () => claimApi.getClaim(claimId),
        [claimApi, claimId],
        true
    );

    const { triggerModal } = useClaimModal();

    const handleBack = evt => {
        evt.preventDefault();
        history.goBack();
    };

    if (claimPending || !claimData /* || claimError */) {
        return (
            <div id="claimdetails" className={styles.claimDetailsPage}>
                <Grid>
                    <Flex justifyContent="between">
                        <Link to="/ignore" onClick={handleBack}>
                            Back
                        </Link>
                    </Flex>
                    {claimPending && <div>Loading...</div>}
                </Grid>
            </div>
        );
    }
    return (
        <div id="claimdetails" className={styles.claimDetailsPage}>
            <Grid>
                <Flex justifyContent="between">
                    <Link to="/ignore" onClick={handleBack}>
                        Back
                    </Link>
                    <Flex>
                        <ClaimActionsMenu
                            id="testActions"
                            actions={claimData._actions}
                        />
                        <Button
                            icon="mi-edit"
                            onClick={() => triggerModal(claimData)}
                        >
                            <FormattedMessage
                                id="jutro-app.add-button.label"
                                defaultMessage="Edit Claim"
                            />
                        </Button>
                    </Flex>
                </Flex>
                <ClaimSummary
                    id="summary"
                    title={`Claim: ${claimData.claimNumber}`}
                    data={claimData}
                />
                <ClaimDetails
                    id="claimDetails"
                    data={claimData}
                    title="Claim Details"
                />
                <Grid columns={[1, 1]}>
                    <ClaimActivityList
                        id="activities"
                        claimId={claimId}
                        title="Activities"
                    />
                    <ClaimLocation
                        data={claimData?.lossLocation}
                        id="location"
                        claimId={claimId}
                    />
                </Grid>
                <ClaimContacts
                    id="contacts"
                    title="Contacts"
                    claimId={claimId}
                />
                <ClaimNotes id="notes" title="Notes" claimId={claimId} />
                <ClaimVehicle
                    id="vincidents"
                    title="Vehicle"
                    claimId={claimId}
                />
                <ClaimVehicleIncident
                    id="vincidents"
                    title="Vehicle Incidents"
                    claimId={claimId}
                />
                <ClaimInjuryIncident
                    id="injury"
                    title="Injury Incidents"
                    claimId={claimId}
                />
                <ClaimPropertyIncident
                    id="property"
                    title="Property Incidents"
                    claimId={claimId}
                />
            </Grid>
        </div>
    );
};
