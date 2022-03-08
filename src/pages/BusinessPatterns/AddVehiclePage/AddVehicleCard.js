// @ts - check
import React, { useCallback, useState } from 'react';
import { set } from 'lodash';
import { Card, Button, InlineNotification } from '@jutro/components';
import { Flex, Grid } from '@jutro/layout';
import { MetadataForm } from '@jutro/uiconfig';

export const AddVehicleCard = ({ id, data, onResolve, uiProps }) => {
    const [formData, setFormData] = useState(data);
    const [formMode, setFormMode] = useState('initial');
    const [isValid, setIsValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleWrite = useCallback(
        (value, path) => {
            setFormData(prevState => {
                const newState = { ...prevState };
                set(newState, path, value);
                return newState;
            });
        },
        [setFormData]
    );

    const handleLink = useCallback(() => {
        setFormData(prevState => {
            const newState = { ...prevState };
            newState.vin = '';
            return newState;
        });
        setFormMode('continue');
    }, [setFormMode]);

    const handleContinue = useCallback(() => {
        if (isValid) {
            setFormData(prevState => {
                const newState = { ...prevState };
                newState.year = '2021';
                return newState;
            });
            setFormMode('continue');
        }
    }, [setFormMode, isValid]);

    const handleCancel = useCallback(() => {
        onResolve();
    }, [onResolve]);

    const inlineNotification = (
        <InlineNotification
            type="error"
            id="notification"
            message="Form has errors"
        />
    );

    const handleDone = useCallback(() => {
        if (!isValid) {
            setIsSubmitted(true);
            return;
        }
        onResolve && onResolve(formData);
    }, [onResolve, formData, isValid, setIsSubmitted]);

    const isContinueMode = formMode === 'continue'; // formData.vin && formData.vin.length > 10;

    // availableValues for the model can be overrided to match the make
    const availableModels = {
        BMW: [
            {
                code: '7 Series Saloon',
                name: '7 Series Saloon',
            },
            {
                code: '730i',
                name: '730i',
            },
        ],
        Ford: [
            {
                code: 'eMustang',
                name: 'eMustang',
            },
            {
                code: 'Escape',
                name: 'Escape',
            },
            {
                code: 'F-150',
                name: 'F-150',
            },
        ],
        Honda: [
            {
                code: 'Accord',
                name: 'Accord',
            },
            {
                code: 'Fit',
                name: 'Fit',
            },
        ],
        Toyota: [
            {
                code: 'Camry',
                name: 'Camry',
            },
            {
                code: 'Prius',
                name: 'Prius',
            },
        ],
        Volkswagen: [
            {
                code: 'Golf',
                name: 'Golf',
            },
            {
                code: 'Jetta',
                name: 'Jetta',
            },
        ],
    };

    const overrideProps = {
        detailsContainer: {
            visible: isContinueMode ? undefined : false,
        },
        model: {
            availableValues: availableModels[formData.make],
        },
    };

    const callbackMap = {
        continueForm: handleLink,
    };

    const handleValidationChange = useCallback(
        isFormValid => {
            setIsValid(isFormValid);
        },
        [setIsValid]
    );

    return (
        <Card id={id} title="Add Vehicle">
            <Grid>
                {isSubmitted && inlineNotification}
                <MetadataForm
                    uiProps={uiProps}
                    overrideProps={overrideProps}
                    data={formData}
                    onDataChange={handleWrite}
                    callbackMap={callbackMap}
                    onValidationChange={handleValidationChange}
                    showErrors={isSubmitted}
                />
                <Flex
                    alignItems="middle"
                    justifyContent="right"
                    wrap="reverse"
                    gap="medium"
                >
                    {!isContinueMode && (
                        <Button
                            id="continueButton"
                            type="outlined"
                            onClick={handleContinue}
                        >
                            Continue
                        </Button>
                    )}
                    {isContinueMode && (
                        <Button
                            id="cancelButton"
                            type="text"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    )}
                    {isContinueMode && (
                        <Button
                            id="doneButton"
                            type="filled"
                            onClick={handleDone}
                        >
                            Done
                        </Button>
                    )}
                </Flex>
            </Grid>
        </Card>
    );
};
