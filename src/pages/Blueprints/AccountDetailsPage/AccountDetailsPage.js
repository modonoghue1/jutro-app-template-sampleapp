import React, { useCallback, useState, useEffect } from 'react';
import { Loader } from '@jutro/components';
import { getConfigValue } from '@jutro/config';
import { error } from '@jutro/logger';
import { AccountDetails } from './AccountDetails';
import { PageWrapper } from '../../../components/Blueprints/PageWrapper';
import messages from './AccountDetailsPage.messages';
import { BillPaymentBlueprintLayout } from '../../../components/Blueprints/BillPaymentBlueprintLayout';
import mockApiResponse from './accountDetailsMockResponse.json';
import styles from './AccountDetailsPage.module.scss';

const preparedData = apiData => ({
    firstName: apiData.firstName,
    lastName: apiData.lastName,
    emailId: apiData.emailId,
    phoneNumber: apiData.phoneNumber,
    primaryAddress: {
        addressLine1: apiData.addressLine1,
        addressLine2: '',
        city: apiData.city,
        state: apiData.state,
        postalCode: apiData.postalCode,
        country: apiData.country,
    },
    billingAddress: {
        addressLine1: apiData.billingAddressLine1,
        addressLine2: '',
        city: apiData.billingAddressCity,
        state: apiData.billingAddressState,
        postalCode: apiData.billingAddressPostalCode,
        country: apiData.billingAddressCountry,
    },
    billingAddressSameAsPrimary: apiData.billingAddressSameAsPrimary,
    billDelivery: apiData.billDelivery,
    billDeliveryEmailId: apiData.billDeliveryEmailId,
});

const updateData = (userid, newData, setBackendData) => {
    const newUserData = {
        firstName: newData.firstName,
        lastName: newData.lastName,
        emailId: newData.emailId,
        phoneNumber: newData.phoneNumber,
        addressLine1: newData.primaryAddress.addressLine1,
        city: newData.primaryAddress.city,
        state: newData.primaryAddress.state,
        postalCode: newData.primaryAddress.postalCode,
        country: newData.primaryAddress.country,
        billingAddressLine1: newData.billingAddress.addressLine1,
        billingAddressCity: newData.billingAddress.city,
        billingAddressState: newData.billingAddress.state,
        billingAddressPostalCode: newData.billingAddress.postalCode,
        billingAddressCountry: newData.billingAddress.country,
        billingAddressSameAsPrimary: newData.billingAddressSameAsPrimary,
        billDelivery: newData.billDelivery,
        billDeliveryEmailId: newData.billDeliveryEmailId,
    };
    // this is mocking a PUT call to an API
    setBackendData([newUserData]);
};

export const AccountDetailsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [userId, setUserId] = useState(null);
    const [backendData, setBackendData] = useState(mockApiResponse);

    useEffect(() => {
        // this is mocking a GET call to an API
        new Promise(resolve => {
            setTimeout(() => resolve(backendData), 1000);
        })
            .then(userdata => {
                setUserId(userdata[0].id);
                setData(preparedData(userdata[0]));
                setIsLoading(false);
            })
            .catch(error);
    }, [backendData]);

    const handleCancelForm = useCallback(
        newData => {
            if (newData === data) {
                return true;
            }
            // eslint-disable-next-line no-alert
            return window.confirm('Do you want to exit without saving?');
        },
        [data]
    );

    if (isLoading) {
        return <Loader loaded={!isLoading} className={styles.loader} />;
    }

    return (
        <PageWrapper title={messages.title}>
            <AccountDetails
                disableEditingName
                formData={data}
                onSaveForm={newData => {
                    setData(newData);
                    updateData(userId, newData, setBackendData);
                }}
                onCancelForm={handleCancelForm}
                googleMapsApiKey={getConfigValue(
                    'GOOGLE_MAPS_API_KEY',
                    'yourAPIhere'
                )}
            />
        </PageWrapper>
    );
};

export const BillPaymentAccountDetailsPanel = () => (
    <BillPaymentBlueprintLayout>
        <AccountDetailsPage />
    </BillPaymentBlueprintLayout>
);
