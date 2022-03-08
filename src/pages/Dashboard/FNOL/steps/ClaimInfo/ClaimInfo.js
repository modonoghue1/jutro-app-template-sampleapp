import React, { useContext, useState, useCallback } from 'react';
import { MetadataForm } from '@jutro/uiconfig';
import { set } from 'lodash';
import { FNOLWizardContext } from '../../FNOLWizardContext';
import { WizardPageWrapper } from '../WizardPageWrapper/WizardPageWrapper';
import uiProps from './ClaimInfo.metadata.json5';

export const ClaimInfo = ({ id, title, wizardPageProps }) => {
    const { wizardData } = useContext(FNOLWizardContext);

    const [formData, setFormData] = useState(() => wizardData);
    const [isFormValid, setIsFormValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const writeValue = (value, path) => {
        setFormData(oldData => {
            const newData = { ...oldData };
            set(newData, path, value);
            return newData;
        });
    };

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
                uiProps={uiProps['claim.info.view']}
                data={formData}
                onDataChange={writeValue}
                showRequired
                onValidationChange={handleFormValidationChanged}
                showErrors={isSubmitted}
            />
        </WizardPageWrapper>
    );
};
