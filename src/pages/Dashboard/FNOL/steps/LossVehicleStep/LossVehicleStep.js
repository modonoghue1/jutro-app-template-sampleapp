import React, { useContext, useMemo, useState } from 'react';
import { keyBy } from 'lodash';
import uiMetadata from './VehicleLoss.metadata.json5';
import { renderSection } from './MultiSectionForm/renderSection';
import styles from './VehicleLoss.module.scss';
import { SelectableImageCards } from './SelectableImageCards';
import { availableDamages } from './mockedData';
import { MultiSectionForm } from './MultiSectionForm/MultiSectionForm';
import { WizardPageWrapper } from '../WizardPageWrapper/WizardPageWrapper';
import { usePatternState } from '../../utils';
import { FNOLWizardContext } from '../../FNOLWizardContext';

const VehicleLossInner = props => {
    const { data = {}, onDataChange, path } = props;

    const damagesByCode = useMemo(
        () =>
            keyBy(
                [...availableDamages.external, ...availableDamages.internal],
                'code'
            ),
        []
    );
    const mapCodesToLabel = codes =>
        codes?.map(code => damagesByCode[code].label).join(', ');

    const classNameMap = {
        additionalQuestionSwitch: styles.additionalQuestionSwitch,
    };

    const callbackMap = {
        updateExternalDamages: value =>
            onDataChange(value, 'externalDamages', { dataPath: path }),
        updateInternalDamages: value =>
            onDataChange(value, 'internalDamages', { dataPath: path }),
    };

    const componentMap = {
        SelectableImageCards,
    };

    const overrideProps = {
        externalDamages: {
            visible: data.damageType === 'External damage',
            selected: data.externalDamages,
            availableValues: availableDamages.external,
        },
        internalDamages: {
            visible: data.damageType === 'Internal damage',
            selected: data.internalDamages,
            availableValues: availableDamages.internal,
        },
        selectedExternalDamages: {
            content: mapCodesToLabel(data.externalDamages),
        },
        selectedInternalDamages: {
            content: mapCodesToLabel(data.internalDamages),
        },
    };

    return renderSection(props, {
        classNameMap,
        callbackMap,
        componentMap,
        overrideProps,
    });
};

VehicleLossInner.defaultProps = {
    uiProps: uiMetadata['patterns.vehicle.loss'],
};

const componentMap = { VehicleLoss: VehicleLossInner };

export const VehicleLoss = ({
    id,
    title,
    onDataChange,
    data,
    path = 'vehicleLoss',
}) => {
    const { wizardData } = useContext(FNOLWizardContext);

    const [state, onStateChange] = usePatternState(
        data,
        onDataChange,
        path,
        wizardData
    );

    const [isValid, setIsValid] = useState(false);

    return (
        <WizardPageWrapper
            id={id}
            title={title}
            isFormValid={isValid}
            formData={state}
        >
            <MultiSectionForm
                uiProps={{
                    id: 'shell',
                    type: 'page',
                    content: [
                        {
                            id: 'vehicleLoss',
                            type: 'container',
                            component: 'VehicleLoss',
                        },
                    ],
                }}
                componentMap={componentMap}
                onSuccessfulSubmit={res => {
                    onStateChange(res);
                    setIsValid(true);
                }}
                onUnsuccessfulSubmit={() => setIsValid(false)}
            />
        </WizardPageWrapper>
    );
};
