import React, { useCallback, useEffect, useState } from 'react';
import { pickBy, set } from 'lodash';
import {
    Button,
    ModalNext,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from '@jutro/components';
import { warning } from '@jutro/logger';
import { getConfigValue } from '@jutro/config';
import ClaimJSONForm from './ClaimJSONForm';
import styles from './CustomModal.module.scss';

export function ClaimModal({
    icon,
    title,
    subtitle,
    status,
    confirmButtonText,
    cancelButtonText,
    isOpen,
    onResolve,
    claimAPIInstance,
    policyAPIInstance,
    claimData,
}) {
    const isNew = !claimData || !claimData.id;
    const [formData, setFormData] = useState(
        claimData
    );
    const [isValid, setIsValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        async function getData() {
            const test = await policyAPIInstance.searchPolicies({
                "firstName": "Ray",
                "lastName": "Newton",
            });

            if (test?.length) {
                const defaultPolicyNumber = test[0].policyNumber;
                setFormData({ policyNumber: defaultPolicyNumber })
            }
        }

        if (!claimData) {
            getData();
        }
    }, []);

    const handleDataChange = useCallback(
        (value, path) => {
            setFormData(prevState => {
                const newState = { ...prevState };
                set(newState, path, value);
                return newState;
            });
        },
        [setFormData]
    );

    const handleValidationChange = useCallback(
        isFormValid => {
            setIsValid(isFormValid);
        },
        [setIsValid]
    );

    const handleCancel = useCallback(() => {
        onResolve && onResolve();
    }, [onResolve]);

    const handleSave = useCallback(async () => {
        if (!isValid) {
            setIsSubmitted(true);
            return;
        }

        try {
            let result;
            if (isNew) {
                result = await claimAPIInstance.createClaim(formData);
            } else {
                // Calculate changes only to send to update
                const changesOnly = pickBy(formData, (value, key) => {
                    if (key === 'id' || key === '_checksum') {
                        return true;
                    }
                    return value !== claimData[key];
                });
                result = await claimAPIInstance.patchClaim(changesOnly);
                // eslint-disable-next-line no-alert
                alert('claim updated');
            }
            onResolve && onResolve(result);
        } catch (ex) {
            const message = claimAPIInstance.formatApiError(ex);
            warning(message);
        }
    }, [isValid, formData, isNew, onResolve, claimData, claimAPIInstance]);

    return (
        <ModalNext
            className={styles.myModal}
            isOpen={isOpen}
            onRequestClose={handleCancel}
        >
            <ModalHeader
                icon={icon}
                title={title}
                subtitle={subtitle}
                status={status}
                onClose={handleCancel}
                ariaLabel="Close Modal"
            />
            <ModalBody autoFocus>
                <ClaimJSONForm
                    data={formData}
                    onDataChange={handleDataChange}
                    onValidationChange={handleValidationChange}
                    showErrors={isSubmitted}
                    isNew={isNew}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    type="text"
                    onClick={handleCancel}
                    aria-label="Close Modal"
                >
                    {cancelButtonText}
                </Button>
                <Button onClick={handleSave} aria-label="Save Modal">
                    {confirmButtonText}
                </Button>
            </ModalFooter>
        </ModalNext>
    );
}
