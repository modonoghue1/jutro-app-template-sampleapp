// @ts-check
import { useContext } from 'react';
import { APIContext } from './APIContextProvider';
// eslint-disable-next-line no-unused-vars
import ClaimAPI from '../pages/Dashboard/ClaimOperations/GeneratedClaimAPI';
// eslint-disable-next-line no-unused-vars
import PolicyAPI from '../pages/Dashboard/ClaimOperations/GeneratedPolicyAPI';

/**
 * useAPI
 *
 * @returns {ClaimAPI} claim api
 */
export function useAPI() {
    const context = useContext(APIContext);
    if (context === undefined) {
        throw new Error('Context must be used within a Provider');
    }
    return context.claimApi;
}

/**
 * usePolicyAPI
 *
 * @returns {PolicyAPI} policy api
 */
 export function usePolicyAPI() {
    const context = useContext(APIContext);
    if (context === undefined) {
        throw new Error('Context must be used within a Provider');
    }
    return context.policyApi;
}
