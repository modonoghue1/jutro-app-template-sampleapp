import React, { useCallback } from 'react';
import { ModalNextProvider } from '@jutro/components';
import { ClaimModal } from '../pages/Dashboard/ClaimOperations/ClaimModal';
import { useAPI, usePolicyAPI } from './useAPI';

export const useClaimModal = () => {
    const claimApi = useAPI();
    const policyApi = usePolicyAPI();
    const triggerModal = useCallback(
        async claimData => {
            const isNew = !claimData || !claimData.id;
            const id = isNew ? 'CreateClaim' : 'EditClaim';
            const subTitle = isNew
                ? 'Create a new claim'
                : 'Update an existing claim';
            const confirmButtonText = isNew ? 'Create' : 'Update';
            return ModalNextProvider.showModal(
                <ClaimModal
                    bodyAutoFocus
                    cancelButtonText="Cancel"
                    confirmButtonText={confirmButtonText}
                    id={id}
                    status="info"
                    subtitle={subTitle}
                    title="Claim Ops"
                    claimAPIInstance={claimApi}
                    policyAPIInstance={policyApi}
                    claimData={claimData}
                />
            );
        },
        [claimApi]
    );
    return { triggerModal };
};
