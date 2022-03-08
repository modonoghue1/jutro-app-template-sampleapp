// @ts - check
import React, {
    useState,
    useCallback,
    useMemo,
    useEffect,
    useRef,
    useContext,
} from 'react';
import { MetadataForm } from '@jutro/uiconfig';
import { set, get, cloneDeep, isEmpty, concat, pullAt } from 'lodash/fp';
import { FNOLWizardContext } from '../../FNOLWizardContext';
import uiMetadata from './LossInjuryStep.metadata.json5';
import styles from './LossInjuryStep.module.scss';
import { LossInjuryForm } from './LossInjuryForm';
import {
    usePatternState,
    useErrorsFromPatternShell,
    usePatternValidationCallback,
} from '../../utils';
import { WizardPageWrapper } from '../WizardPageWrapper/WizardPageWrapper';

const roleTypes = [
    {
        code: 'insured',
        description: 'Insured',
        name: 'Insured',
        sortOrder: 0,
    },
    {
        code: 'claimant',
        description: 'Claimant',
        name: 'Claimant',
        sortOrder: 1,
    },
];
const accountPersons = [
    {
        cellPhone: {
            countryCode: {
                code: 'US',
            },
            number: '555-555-5555',
        },
        dateOfBirth: '1928-11-18',
        emailAddress1: 'mickey.mouse@email.com',
        emailAddress2: 'mickey@mouse.com',
        firstName: 'Mickey',
        homePhone: {
            countryCode: {
                code: 'US',
            },
            number: '555-555-5556',
        },
        lastName: 'Mouse',
        licenseNumber: 'ABCDE12345',
        licenseState: {
            code: 'CA',
        },
        primaryAddress: {
            addressLine1: '1313 Disneyland Dr.',
            addressLine2: 'Toon Town',
            addressLine3: "Mickey's House",
            city: 'Anaheim',
            country: 'US',
            county: 'Orange County',
            postalCode: '92802',
            state: {
                code: 'CA',
            },
        },
        primaryLanguage: {
            code: 'en_US',
        },
        primaryLocale: {
            code: 'en_US',
        },
        primaryPhoneType: {
            code: 'home',
        },
        contactSubtype: 'Person',
    },
];
const toggleStatePath = 'injuredPeopleAvailable';
const listStatePath = 'injuredList';
const contactStatePath = 'contactList';

export const LossInjury = ({
    id,
    title,
    wizardPageProps,
    data,
    onDataChange,
    path = 'injured',
    showErrors,
    onValidationChange,
    required: requiredProp,
    patternShellReSubmitted,
}) => {
    const { wizardData } = useContext(FNOLWizardContext);
    const uiProps = uiMetadata['fnol.injured'];

    const [required, setRequired] = useState(requiredProp);
    const [personIndex, setPersonIndex] = useState();
    const injuredPeopleAvailablePrev = useRef();
    const [state, onStateChange] = usePatternState(
        data,
        onDataChange,
        path,
        wizardData
    );
    const [isSubmitted, setIsSubmitted] = useState(false);
    const shouldShowErrors = useErrorsFromPatternShell(
        showErrors,
        patternShellReSubmitted || isSubmitted,
        required
    );
    const validationChangeCallback = usePatternValidationCallback(
        path,
        onValidationChange
    );
    const validate = useCallback(
        injuredList => !required || !isEmpty(injuredList),
        [required]
    );
    const [isValid, setIsValid] = useState(validate(state?.[listStatePath]));
    const [patternUiProps, setPatternUiProps] = useState(uiProps);
    const [propsOverrides, setPropsOverrides] = useState({
        validationMessage: { visible: shouldShowErrors && !isValid },
    });
    const removeInjuredIndexPattern = useMemo(
        () => new RegExp(`${'removeInjured'}((\\d)+)`),
        []
    );
    const markAsInjuredIndexPattern = useMemo(
        () => new RegExp(`${'accountPersonEntry'}((\\d)+)`),
        []
    );
    const eidtInjuredIndexPattern = useMemo(
        () => new RegExp(`${'editInjured'}((\\d)+)`),
        []
    );

    const availableAccountPersons = useMemo(() => {
        if (isEmpty(accountPersons)) {
            return [];
        }
        const injuredList = state?.[listStatePath];
        if (isEmpty(injuredList)) {
            return accountPersons;
        }
        return accountPersons.filter(person => {
            return !injuredList.find(
                injuredPerson =>
                    person.firstName + person.lastName ===
                    injuredPerson.displayName
            );
        });
    }, [state]);

    useEffect(() => {
        const injuredList = state?.[listStatePath] || [];
        setPropsOverrides(currentOverrides => ({
            ...currentOverrides,
            injuredList: {
                data: injuredList,
            },
        }));
    }, [state]);

    useEffect(() => {
        setPatternUiProps(currentProps =>
            set(
                `${'content[0]'}.componentProps.visible`,
                !requiredProp,
                currentProps
            )
        );
    }, [requiredProp]);

    useEffect(() => {
        const injuredPeopleAvailable = (state || {})[toggleStatePath];
        if (injuredPeopleAvailable !== injuredPeopleAvailablePrev.current) {
            setPatternUiProps(currentProps =>
                set(
                    `${'content[1]'}.componentProps.visible`,
                    injuredPeopleAvailable,
                    currentProps
                )
            );
            setRequired(injuredPeopleAvailable);
            if (!injuredPeopleAvailable) {
                onStateChange([], listStatePath);
            }
            injuredPeopleAvailablePrev.current = state.injuredPeopleAvailable;
        }
    }, [state, onStateChange]);

    useEffect(() => {
        const accountPersonsProvided = !isEmpty(availableAccountPersons);
        setPropsOverrides(currentOverrides => ({
            ...currentOverrides,
            accountPersonsHeading: {
                visible: accountPersonsProvided,
            },
            accountPersonsList: {
                data: availableAccountPersons,
                visible: accountPersonsProvided,
            },
            injuredPersonsHeading: {
                visible: accountPersonsProvided,
            },
        }));
    }, [availableAccountPersons]);

    useEffect(() => {
        setPropsOverrides(currentOverrides => ({
            ...currentOverrides,
            validationMessage: {
                visible: shouldShowErrors && !isValid,
            },
        }));
    }, [shouldShowErrors, isValid]);

    useEffect(() => {
        setIsValid(validate(state?.[listStatePath]));
    }, [state, validate]);

    useEffect(() => validationChangeCallback(isValid), [
        validationChangeCallback,
        isValid,
    ]);

    const restoreInitialUiConfig = useCallback(() => {
        setPatternUiProps(() => cloneDeep(uiProps));
    }, [uiProps]);

    const addInjured = useCallback(
        newInjured => {
            const injuredAccountPerson = {
                displayName: newInjured.firstName + newInjured.lastName,
                ...newInjured,
            };
            const injuredList = state?.[listStatePath] || [];
            const newInjuredList = concat(injuredList, injuredAccountPerson);
            onStateChange(newInjuredList, listStatePath);
            restoreInitialUiConfig();
        },
        [state, onStateChange, restoreInitialUiConfig]
    );

    const markAsInjured = useCallback(
        newInjuredData => {
            const accountPerson = availableAccountPersons[personIndex];

            const injuredAccountPerson = {
                displayName: accountPerson.firstName + accountPerson.lastName,
                ...newInjuredData,
            };
            const injuredList = state?.[listStatePath] || [];
            const contactList = state?.[contactStatePath] || [];
            const newInjuredList = concat(injuredAccountPerson, injuredList);
            const newContactsList = concat(accountPerson, contactList);

            onStateChange(newInjuredList, listStatePath);
            onStateChange(newContactsList, contactStatePath);

            setPropsOverrides(currentOverrides => ({
                ...currentOverrides,
            }));

            restoreInitialUiConfig();
        },
        [
            availableAccountPersons,
            state,
            onStateChange,
            personIndex,
            restoreInitialUiConfig,
        ]
    );

    const removeInjured = useCallback(
        clickEvent => {
            const injuredIndex = clickEvent.currentTarget?.id?.match(
                removeInjuredIndexPattern
            )?.[1];
            if (!injuredIndex) {
                return;
            }
            const injuredList = state?.[listStatePath] || [];
            const contactList = state?.[contactStatePath] || [];
            const newInjuredList = pullAt(injuredIndex, injuredList);
            const newContactsList = pullAt(injuredIndex, contactList);

            onStateChange(newInjuredList, listStatePath);
            onStateChange(newContactsList, contactStatePath);

            setPropsOverrides(currentOverrides => ({
                ...currentOverrides,
            }));
        },

        [removeInjuredIndexPattern, state, onStateChange]
    );

    const saveInjuredChanges = useCallback(
        (saveInjuredChangesData, injuredPersonIndex) => {
            const injuredPerson = {
                displayName:
                    saveInjuredChangesData.firstName +
                    saveInjuredChangesData.lastName,
                ...saveInjuredChangesData,
            };
            const injuredList = state?.[listStatePath] || [];
            injuredList.splice(injuredPersonIndex, 1, injuredPerson);
            onStateChange(injuredList, listStatePath);

            restoreInitialUiConfig();
        },
        [state, restoreInitialUiConfig, onStateChange]
    );

    const editInjured = useCallback(
        clickEvent => {
            const index = clickEvent.currentTarget?.id?.match(
                eidtInjuredIndexPattern
            )?.[1];

            setPersonIndex(index);

            setPatternUiProps(() => {
                const editedInjuredForm = {
                    id: 'editInjuredForm',
                    type: 'element',
                    component: 'LossInjuryForm',
                    componentProps: {
                        onSave: 'onSaveInjuredChanges',
                        onCancel: 'odDismissEditInjured',
                        roleTypes,
                        primaryData: state?.injuredList[index],
                        personIndex: index,
                    },
                };
                return set('content', [editedInjuredForm], uiProps);
            });
            setPropsOverrides(currentOverrides => ({
                ...currentOverrides,
            }));
        },
        [eidtInjuredIndexPattern, uiProps, setPersonIndex, state]
    );

    const openNewInjuredForm = useCallback(() => {
        setPatternUiProps(() => {
            const newInjuredForm = {
                id: 'addInjuredForm',
                type: 'element',
                component: 'LossInjuryForm',
                componentProps: {
                    onSave: 'onAddNewInjured',
                    onCancel: 'odDismissNewInjured',
                    roleTypes,
                },
            };
            return set('content', [newInjuredForm], uiProps);
        });
        setPropsOverrides(currentOverrides => ({
            ...currentOverrides,
        }));
    }, [uiProps]);

    const openEditInjuredForm = useCallback(
        clickEvent => {
            const index = clickEvent.currentTarget?.id?.match(
                markAsInjuredIndexPattern
            )?.[1];
            setPersonIndex(index);

            setPatternUiProps(() => {
                const editedInjuredForm = {
                    id: 'editInjuredForm',
                    type: 'element',
                    component: 'LossInjuryForm',
                    componentProps: {
                        onSave: 'onMarkAsInjured',
                        onCancel: 'odDismissEditInjured',
                        roleTypes,
                        primaryData: availableAccountPersons[index],
                    },
                };
                return set('content', [editedInjuredForm], uiProps);
            });
            setPropsOverrides(currentOverrides => ({
                ...currentOverrides,
            }));
        },
        [
            availableAccountPersons,
            markAsInjuredIndexPattern,
            uiProps,
            setPersonIndex,
        ]
    );

    const callbackMap = {
        onAddNewInjured: addInjured,
        odDismissNewInjured: restoreInitialUiConfig,
        openEditInjuredForm: openEditInjuredForm,
        onRemoveInjured: removeInjured,
        onEditInjured: editInjured,
        onSaveInjuredChanges: saveInjuredChanges,
        onAddInjured: openNewInjuredForm,
        odDismissEditInjured: restoreInitialUiConfig,
        onMarkAsInjured: markAsInjured,
    };

    const componentMap = {
        LossInjuryForm,
    };

    const classNameMap = {
        injuredPeopleSwitch: styles.injuredPeopleSwitch,
        personsList: styles.personsList,
        personEntry: styles.personEntry,
        accountPersonEntry: styles.accountPersonEntry,
        injuredValidationMessage: styles.validationMessage,
    };

    const readValue = useCallback(
        (fieldId, fieldPath) => {
            return get(fieldPath, state);
        },
        [state]
    );

    return (
        <WizardPageWrapper
            id={id}
            title={title}
            wizardPageProps={wizardPageProps}
            isFormValid={isValid}
            formData={state}
            onSubmit={setIsSubmitted}
        >
            <MetadataForm
                uiProps={patternUiProps}
                callbackMap={callbackMap}
                componentMap={componentMap}
                classNameMap={classNameMap}
                overrideProps={propsOverrides}
                showErrors={shouldShowErrors}
                onValidationChange={validationChangeCallback}
                resolveValue={readValue}
                onDataChange={onStateChange}
            />
        </WizardPageWrapper>
    );
};
