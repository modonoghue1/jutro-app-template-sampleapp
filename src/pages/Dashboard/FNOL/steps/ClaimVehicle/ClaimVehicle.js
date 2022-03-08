import React, {
    useContext,
    useState,
    useCallback,
    useEffect,
    useMemo,
} from 'react';
import { MetadataForm } from '@jutro/uiconfig';
import { set, cloneDeep, isEmpty, pullAt, concat } from 'lodash/fp';
import { FNOLWizardContext } from '../../FNOLWizardContext';
import { WizardPageWrapper } from '../WizardPageWrapper/WizardPageWrapper';
import { VehicleForm } from './VehicleForm';
import styles from './ClaimVehicle.module.scss';
import uiMetadata from './ClaimVehicle.metadata.json5';

export const ClaimVehicle = ({
    id,
    title,
    wizardPageProps,
    required,
    showErrors = true,
    uiProps = uiMetadata['claim.vehicle.view'],
    removeVehicleActionId = 'removeVehicle',
}) => {
    const { wizardData } = useContext(FNOLWizardContext);
    const [formData, setFormData] = useState(() => wizardData);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [vehicles, onVehiclesChange] = useState(formData?.vehicles);

    const validate = useCallback(
        vehiclesList => {
            return !isEmpty(vehiclesList);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [required]
    );

    const [isValid, setIsValid] = useState(validate(vehicles));

    const writeValue = (value, writeValuePath) => {
        setFormData(oldData => {
            let newData = { ...oldData };
            newData = set(writeValuePath, value, newData);
            return newData;
        });
    };

    const [patternUiProps, setPatternUiProps] = useState(uiProps);
    const [propsOverrides, setPropsOverrides] = useState({
        validationMessage: { visible: showErrors && !isValid },
    });

    const removeVehicleIndexPattern = useMemo(
        () => new RegExp(`${removeVehicleActionId}((\\d)+)`),
        [removeVehicleActionId]
    );

    useEffect(() => {
        const availableVehicles = vehicles?.map(vehicle => ({
            ...vehicle,
            insuranceNumber: vehicle.insuranceNumber,
        }));

        setPropsOverrides(currentOverrides => ({
            ...currentOverrides,
            vehiclesList: {
                data: availableVehicles || [],
            },
        }));
    }, [vehicles]);

    useEffect(
        () =>
            setPropsOverrides(currentOverrides => ({
                ...currentOverrides,
                validationMessage: {
                    visible: showErrors && !isValid,
                },
            })),
        [showErrors, isValid]
    );

    useEffect(() => setIsValid(validate(vehicles)), [validate, vehicles]);

    const restoreInitialUiConfig = useCallback(() => {
        setIsValid(validate(vehicles));
        setPatternUiProps(() => cloneDeep(uiProps));
    }, [uiProps, vehicles, validate]);

    const addVehicle = useCallback(
        newVehicle => {
            const newVehiclesList = concat(vehicles || [], newVehicle);
            onVehiclesChange(newVehiclesList);
            restoreInitialUiConfig();
            setFormData(oldData => {
                let newData = { ...oldData };
                newData = set('vehicles', newVehiclesList, newData);
                return newData;
            });
        },
        [onVehiclesChange, vehicles, restoreInitialUiConfig]
    );

    const removeVehicle = useCallback(
        clickEvent => {
            const vehicleIndex = clickEvent.currentTarget?.id?.match(
                removeVehicleIndexPattern
            )?.[1];

            if (!vehicleIndex) {
                return;
            }
            const newVehiclesList = pullAt(vehicleIndex, vehicles);
            onVehiclesChange(newVehiclesList);
        },
        [vehicles, onVehiclesChange, removeVehicleIndexPattern]
    );

    const openNewVehicleForm = useCallback(() => {
        setIsValid(false);
        setPatternUiProps(() => {
            const newVehicleForm = {
                id: 'addVehicleForm',
                type: 'element',
                component: 'VehicleForm',
                componentProps: {
                    onSave: 'onAddNewVehicle',
                    onCancel: 'onDismissNewVehicle',
                },
            };
            return set('content', [newVehicleForm], uiProps);
        });
    }, [uiProps]);

    const callbackMap = {
        onAddNewVehicle: addVehicle,
        onRemoveVehicle: removeVehicle,
        onDismissNewVehicle: restoreInitialUiConfig,
        onAddVehicle: openNewVehicleForm,
        onSetFormData: setFormData,
    };

    const componentMap = {
        VehicleForm,
    };

    const classNameMap = {
        vehiclesValidationMessage: styles.validationMessage,
        vehicleEntry: styles.vehicleEntry,
    };

    return (
        <WizardPageWrapper
            id={id}
            title={title}
            wizardPageProps={wizardPageProps}
            isFormValid={isValid}
            onSubmit={setIsSubmitted}
            formData={formData}
        >
            <MetadataForm
                uiProps={patternUiProps}
                data={formData}
                callbackMap={callbackMap}
                componentMap={componentMap}
                classNameMap={classNameMap}
                showErrors={isSubmitted}
                overrideProps={propsOverrides}
                onDataChange={writeValue}
            />
        </WizardPageWrapper>
    );
};
