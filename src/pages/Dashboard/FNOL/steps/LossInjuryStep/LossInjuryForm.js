// @ts - check
import React, { useState, useCallback } from 'react';
import { set, get } from 'lodash/fp';
import { MetadataForm, validateContentFromMetadata } from '@jutro/uiconfig';
import uiMetadata from './LossInjuryForm.metadata.json5';
import { useErrorsFromPatternShell } from '../../utils';

export const LossInjuryForm = ({
    onSave,
    onCancel,
    showErrors,
    patternShellReSubmitted,
    roleTypes,
    primaryData,
    personIndex,
}) => {
    const [data, setData] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const uiProps = uiMetadata['fnol.injuredForm'];
    const showErrorsFromPatternShell = useErrorsFromPatternShell(
        showErrors,
        patternShellReSubmitted
    );

    let overrideProps = {
        role: {
            availableValues: roleTypes,
        },
    };

    const bodyParts = primaryData?.bodyParts
        ? {
              detailedBodyPart: {
                  defaultValue: primaryData.bodyParts.detailedBodyPart?.code,
              },
              detailedBodyPartDesc: {
                  defaultValue:
                      primaryData.bodyParts.detailedBodyPartDesc?.code,
              },
              impairmentPercentage: {
                  defaultValue: primaryData.bodyParts.impairmentPercentage,
              },
              ordering: { defaultValue: primaryData.bodyParts.ordering },
              primaryBodyPart: {
                  defaultValue: primaryData.bodyParts.primaryBodyPart?.code,
              },
              sideOfBody: {
                  defaultValue: primaryData.bodyParts.sideOfBody?.code,
              },
          }
        : {};

    if (primaryData) {
        overrideProps = {
            ...overrideProps,
            ...bodyParts,
            firstName: { defaultValue: primaryData.firstName, disabled: true },
            lastName: { defaultValue: primaryData.lastName, disabled: true },
            role: {
                defaultValue: 'insured',
                availableValues: roleTypes,
                disabled: true,
            },
            ambulanceUsed: { defaultValue: primaryData.ambulanceUsed },
            description: {
                defaultValue: primaryData.description,
            },
            detailedInjuryType: {
                defaultValue: primaryData.detailedInjuryType?.code,
            },
            lossParty: {
                defaultValue: primaryData.lossParty?.code,
            },
            lostWages: {
                defaultValue: primaryData.lostWages,
            },
            primaryDoctor: {
                defaultValue: primaryData.primaryDoctor,
            },
            severity: {
                defaultValue: primaryData.severity?.code,
            },
            treatmentType: {
                defaultValue: primaryData.treatmentType?.code,
            },
        };
    }

    const writeValue = useCallback((value, path) => {
        setData(currentData => set(path, value, currentData));
    }, []);

    const readValue = useCallback(
        (id, path) => {
            return get(path, data);
        },
        [data]
    );

    const onSaveNewInjured = useCallback(() => {
        const resolvers = {
            resolveValue: readValue,
        };
        if (validateContentFromMetadata(uiProps, undefined, resolvers)) {
            onSave(data, personIndex);
            return;
        }
        setSubmitted(true);
    }, [readValue, uiProps, onSave, data, personIndex]);

    const callbackMap = {
        onSaveNewInjured,
        onCancelNewInjured: onCancel,
    };

    return (
        <MetadataForm
            uiProps={uiProps}
            callbackMap={callbackMap}
            overrideProps={overrideProps}
            data={data}
            onDataChange={writeValue}
            showErrors={submitted || showErrorsFromPatternShell}
            showRequired
        />
    );
};
