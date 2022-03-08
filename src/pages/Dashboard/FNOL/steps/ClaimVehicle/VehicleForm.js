import React, { useState, useCallback, useRef, useEffect } from 'react';
import { get, set, pipe } from 'lodash/fp';
import { MetadataForm, validateContentFromMetadata } from '@jutro/uiconfig';
import uiMetadata from './VehicleForm.metadata.json5';
import { useErrorsFromPatternShell } from '../../utils';
import styles from './ClaimVehicle.module.scss';

export const VehicleForm = ({
    uiProps = uiMetadata['fnol.vehicleForm'],
    onSave,
    onCancel,
    showErrors,
    patternShellReSubmitted,
}) => {
    const [patternUiProps, setPatternUiProps] = useState(uiProps);
    const [data, setData] = useState({
        insuranceNumberAvailable: false,
    });
    const insuranceNumberAvailablePrev = useRef();
    const [submitted, setSubmitted] = useState(false);
    const showErrorsFromPatternShell = useErrorsFromPatternShell(
        showErrors,
        patternShellReSubmitted
    );

    const writeValue = useCallback((value, path) => {
        setData(currentData => set(path, value, currentData));
    }, []);

    useEffect(() => {
        const insuranceNumberAvailable = data.insuranceNumberAvailable;
        if (insuranceNumberAvailable !== insuranceNumberAvailablePrev.current) {
            setPatternUiProps(currentProps => {
                return pipe(
                    set(
                        'content[7].componentProps.visible',
                        insuranceNumberAvailable
                    ),
                    set(
                        'content[7].componentProps.visible',
                        insuranceNumberAvailable
                    )
                )(currentProps);
            });
            if (!insuranceNumberAvailable) {
                setData(currentData =>
                    set('insuranceNumber', undefined, currentData)
                );
            }
            insuranceNumberAvailablePrev.current =
                data.insuranceNumberAvailable;
        }
    }, [data]);

    const readValue = useCallback(
        (id, path) => {
            return get(path, data);
        },
        [data]
    );

    const onSaveNewVehicle = useCallback(() => {
        const resolvers = {
            resolveValue: readValue,
        };
        if (validateContentFromMetadata(patternUiProps, undefined, resolvers)) {
            onSave(data);
            return;
        }
        setSubmitted(true);
    }, [patternUiProps, readValue, onSave, data]);

    const callbackMap = {
        onSaveNewVehicle,
        onCancelNewVehicle: onCancel,
    };

    const classNameMap = {
        vehiclesInsuranceNumberSwitch: styles.vehiclesInsuranceNumberSwitch,
    };

    return (
        <MetadataForm
            uiProps={patternUiProps}
            callbackMap={callbackMap}
            classNameMap={classNameMap}
            data={data}
            showRequired
            onDataChange={writeValue}
            showErrors={submitted || showErrorsFromPatternShell}
        />
    );
};
