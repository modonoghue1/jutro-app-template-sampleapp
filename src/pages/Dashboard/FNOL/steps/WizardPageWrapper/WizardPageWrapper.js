import React, { useCallback, useContext } from 'react';
import { WizardPage } from '@jutro/wizard-next';
import { useLocation } from 'react-router-dom';
import { FNOLWizardContext } from '../../FNOLWizardContext';

export const WizardPageWrapper = ({
    id,
    title,
    wizardPageProps,
    children,
    isFormValid,
    onSubmit,
    formData,
}) => {
    const { saveAndNext, unwindAndPrevious } = useContext(FNOLWizardContext);
    const location = useLocation();
    const handleNext = () => {
        if (!isFormValid) {
            onSubmit(true);
            return false;
        }
        return saveAndNext(id, formData);
    };

    const handlePrevious = useCallback(() => {
        return unwindAndPrevious(id);
    }, [id, unwindAndPrevious]);

    return (
        <WizardPage
            id={id}
            title={title}
            {...wizardPageProps}
            onNext={handleNext}
            onPrevious={handlePrevious}
            location={location}
        >
            {children}
        </WizardPage>
    );
};
