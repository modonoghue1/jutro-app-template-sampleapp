import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { get } from 'lodash';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { Wizard } from '@jutro/wizard-next';
import { warning } from '@jutro/logger';
import wizardMetadata from './FNOLWizard.metadata.json5';
import FNOLWizardPage from './FNOLWizardPage';
import { FNOLWizardContext } from './FNOLWizardContext';
import { usePolicyAPI } from '../../../helpers/useAPI';
import {
    LossInjury,
    ClaimInfo,
    ClaimLocation,
    ClaimVehicle,
    ClaimConfirmation,
    ClaimProperty,
    ClaimSubmission,
    VehicleLoss,
} from './steps';

const tryToCastToBoolean = value => {
    if (value === 'true') {
        return true;
    }

    if (value === 'false') {
        return false;
    }

    return value;
};

export const FNOLWizard = () => {
    const history = useHistory();
    const location = useLocation();
    const match = useRouteMatch();
    const policyApi = usePolicyAPI();
    const [wizardData, setWizardData] = useState();

    const uiProps = wizardMetadata['fnol.wizard'];
    const route = match.path;
    const path = match.url;

    useEffect(() => {
        const test = location;
        const { start } = uiProps.flow;
        const startRoute = wizardMetadata[start].route;
        if (
            test.pathname !== path &&
            test.pathname !== `${path}/${startRoute}`
        ) {
            history.push(path);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [defaultPolicyNumber, setDefaultPolicyNumber] = useState();
    useEffect(() => {
        async function getData() {
            const test = await policyApi.searchPolicies({
                "firstName": "Ray",
                "lastName": "Newton",
            });

            if (test?.length) {
                const defaultPN = test[0].policyNumber;
                setDefaultPolicyNumber(defaultPN);
            }
        }

        getData();
    }, []);

    const steps = useMemo(
        () =>
            Object.keys(uiProps.flow)
                .map(key => {
                    const { start, knockout, end } = uiProps.flow;
                    if (key === 'start') {
                        return wizardMetadata[start];
                    }
                    if (key === 'knockout') {
                        return wizardMetadata[knockout];
                    }
                    if (key === 'end') {
                        return wizardMetadata[end];
                    }
                    if (key !== start && key !== knockout && key !== end) {
                        return wizardMetadata[key];
                    }
                    return null;
                })
                .filter(item => item),
        [uiProps.flow /*, pageHistoryRef*/]
    );

    const saveAndNext = useCallback(
        (currentStep, newData) => {
            if (
                currentStep === uiProps.flow.knockout ||
                currentStep === uiProps.flow.end
            ) {
                return {
                    success: {
                        path: uiProps.wizardProps.finishPath,
                    },
                };
            }

            const newWizardData = { ...wizardData, ...newData };

            let nextStep = uiProps.flow[currentStep] || uiProps.flow.knockout;

            if (Array.isArray(nextStep)) {
                let foundStep;

                nextStep.some(({ step, rule }) => {
                    if (rule) {
                        const [rulePath, ruleOperator, ruleValue] = rule.split(
                            ':'
                        );
                        if (rulePath && ruleOperator && ruleValue) {
                            const test = get(newWizardData, rulePath);
                            const testValue = test?.code || test;
                            const result =
                                testValue === ruleValue ||
                                testValue === tryToCastToBoolean(ruleValue);
                            if (result) {
                                foundStep = step;
                            }
                        }
                    } else {
                        foundStep = step;
                    }
                    return !!foundStep;
                });

                nextStep = foundStep || uiProps.flow.knockout;
            }

            setWizardData(newWizardData);

            if (!wizardMetadata[nextStep]) {
                warning(`unable to find info about nextStep: "${nextStep}"`);
                return false;
            }
            return {
                success: {
                    path: wizardMetadata[nextStep].route,
                },
            };
        },
        [
            uiProps.flow,
            uiProps.wizardProps,
            wizardData,
            setWizardData /*, pageHistoryRef */,
        ]
    );

    const unwindAndPrevious = useCallback(
        (/* currentStep, unwind */) => {
            history.goBack();
            return false;
        },
        [/* pageHistoryRef, */ history]
    );

    const localComponentMap = {
        FNOLWizardPage,
        LossInjury,
        ClaimInfo,
        ClaimLocation,
        ClaimVehicle,
        ClaimConfirmation,
        ClaimProperty,
        ClaimSubmission,
        VehicleLoss,
    };

    return (
        <FNOLWizardContext.Provider
            value={{ saveAndNext, unwindAndPrevious, wizardData, defaultPolicyNumber }}
        >
            <Wizard
                baseRoute={route}
                basePath={path}
                steps={steps}
                location={location}
                componentMap={localComponentMap}
                {...uiProps.wizardProps}
            />
        </FNOLWizardContext.Provider>
    );
};
