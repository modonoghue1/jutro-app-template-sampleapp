import React, { useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { set } from 'lodash';
import { WizardPage } from '@jutro/wizard-next';
import { MetadataForm } from '@jutro/uiconfig';
import { FNOLWizardContext } from './FNOLWizardContext';

const FNOLWizardPage = ({ id, title, uiProps, wizardPageProps }) => {
    const { saveAndNext, unwindAndPrevious, wizardData } = useContext(
        FNOLWizardContext
    );
    const [formData, setFormData] = useState(() => wizardData);

    const writeValue = (value, path) => {
        setFormData(oldData => {
            const newData = { ...oldData };
            set(newData, path, value);
            return newData;
        });
    };

    const handleNext = useCallback(() => {
        return saveAndNext(id, formData);
    }, [id, formData, saveAndNext]);

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
        >
            <MetadataForm
                uiProps={uiProps}
                data={formData}
                onDataChange={writeValue}
                showRequired
            />
        </WizardPage>
    );
};

FNOLWizardPage.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    uiProps: PropTypes.object,
    wizardPageProps: PropTypes.object,
};

export default FNOLWizardPage;
