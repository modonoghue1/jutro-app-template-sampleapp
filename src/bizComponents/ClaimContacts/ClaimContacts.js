// @ts-check
import React from 'react';
import { useAPI } from '../../helpers/useAPI';
import { useAsync } from '../../helpers/useAsync';
import { ListView } from '../../bizPatterns/ListView/ListView';

export const ClaimContacts = ({ id, title, claimId }) => {
    const claimApi = useAPI();

    const { value: contactsData, pending: contactsPending } = useAsync(
        () => claimApi.getClaimContacts(claimId),
        [claimApi, claimId],
        true
    );
    return (
        <ListView
            id={id}
            title={title}
            loading={contactsPending}
            data={contactsData}
            columns={[
                'dsp',
                ['email1', 'email2'],
                ['phone1', 'phone2'],
                'country',
            ]}
            columnDefs={[
                { id: 'dsp', path: 'displayName' },
                {
                    id: 'email1',
                    path: 'emailAddress1',
                },
                {
                    id: 'email2',
                    path: 'emailAddress2',
                },
                {
                    id: 'phone1',
                    path: 'primaryPhone',
                },
                {
                    id: 'phone2',
                    path: 'cellPhone.displayName',
                },
                { id: 'country', path: 'cellPhone.countryCode.name' },
            ]}
        />
    );
};
