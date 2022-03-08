import React, { useContext, useState, useCallback, useEffect } from 'react';
import { MetadataForm } from '@jutro/uiconfig';
import { AddressComponent } from '@business-patterns/address-component';
import { set } from 'lodash';
import { WizardPageWrapper } from '../WizardPageWrapper/WizardPageWrapper';
import { FNOLWizardContext } from '../../FNOLWizardContext';
import uiProps from './ClaimLocation.metadata.json5';

export const ClaimLocation = ({ id, title, wizardPageProps }) => {
    const { wizardData, defaultPolicyNumber } = useContext(FNOLWizardContext);
    const [formData, setFormData] = useState(() => wizardData);
    const [isFormValid, setIsFormValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        setFormData(oldData => {
            const newData = { ...oldData };
            set(
                newData,
                'claimInfo.policyNumber',
                defaultPolicyNumber
            );
            set(newData, 'claimInfo.reporter', {
                policySystemId: 'test_pp:2',
            });
            return newData;
        });
    }, []);

    const writeValue = useCallback((value, path) => {
        setFormData(oldData => {
            const newData = { ...oldData };
            set(newData, path, value);
            return newData;
        });
    }, []);

    const handleFormValidationChanged = useCallback(
        isValid => {
            if (isFormValid !== isValid) {
                setIsFormValid(isValid);
            }
        },
        [isFormValid, setIsFormValid]
    );

    return (
        <WizardPageWrapper
            id={id}
            title={title}
            wizardPageProps={wizardPageProps}
            isFormValid={isFormValid}
            onSubmit={setIsSubmitted}
            formData={formData}
        >
            <MetadataForm
                uiProps={uiProps['claim.location.view']}
                data={formData}
                onDataChange={writeValue}
                showRequired
                componentMap={{ AddressComponent }}
                onValidationChange={handleFormValidationChanged}
                showErrors={isSubmitted}
            />
        </WizardPageWrapper>
    );
};
