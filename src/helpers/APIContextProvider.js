// @ts-check
import React, { useMemo, createContext } from 'react';
import {
    HttpRequestBuilder,
    analyticsHandler,
    basicAuthOptions,
    jsonOptions,
} from '@jutro/transport';
import { getConfigValue } from '@jutro/config';

import ClaimAPI from '../pages/Dashboard/ClaimOperations/GeneratedClaimAPI';
import PolicyAPI from '../pages/Dashboard/ClaimOperations/GeneratedPolicyAPI';

export const APIContext = createContext(undefined);

export function APIContextProvider({ children }) {
    const apiInstance = useMemo(() => {
        const restService = new HttpRequestBuilder()
            .addHandler(analyticsHandler)
            .addOptions(jsonOptions)
            .addOptions(basicAuthOptions('aapplegate', 'gw'))
            .build();

        const claimBase = getConfigValue('BASE_URI');
        const claimApi = new ClaimAPI(restService, `${claimBase}claim/v1`);

        const policyBase = getConfigValue('BASE_URI').replace('cc-', 'pc-');
        const policyApi = new PolicyAPI(restService, `${policyBase}policy/v1`);

        return { claimApi, policyApi };
    }, []);

    return (
        <APIContext.Provider value={apiInstance}>
            {children}
        </APIContext.Provider>
    );
}
