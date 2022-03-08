// @ts-check
import React, { useState, useEffect } from 'react';
import { get, set } from 'lodash';
import cx from 'classnames';
import { ModalNextProvider, Button } from '@jutro/components';
import { getConfigValue } from '@jutro/config';
import { debug } from '@jutro/logger';
import { createJsonHttpRequest } from '@jutro/transport';
import {
    MetadataForm,
    validateContentFromMetadata,
    validateMetadata,
} from '@jutro/uiconfig';
import styles from './CodelessForm.module.scss';
import uiMetadata from './CodelessForm.metadata.json5';
import messages from './CodelessForm.messages';

export const CodelessForm = props => {
    const submitToServer = getConfigValue('submitToServer');

    const serverUrl = getConfigValue('serverUrl');

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        validateMetadata(uiMetadata);
    }, []);

    const readValue = (id, path) => get(formData, path);

    const writeValue = (value, path) => {
        setFormData(prevState => {
            const newState = { ...prevState };
            set(newState, path, value);
            return newState;
        });
    };

    const saveForm = () => {
        const overrideProps = undefined;
        const resolvers = {
            // only a subset of resolvers needed for 'validation' vs 'render'
            resolveValue: readValue, // get value (needs base data to make it generic)
        };

        if (
            validateContentFromMetadata(
                uiMetadata['a.b.codelessForm'],
                overrideProps,
                resolvers
            )
        ) {
            if (submitToServer) {
                /** @type {import('@jutro/transport').HttpRequest} */ (createJsonHttpRequest(
                    serverUrl
                ))
                    .post('/submit', formData)
                    .then(result => {
                        showSuccess(messages.backendMetadataValidationSucess);
                        debug(result.content);
                    })
                    .catch(error => showError(JSON.stringify(error)));
            } else {
                showSuccess(messages.formSavedSuccesfully);
            }
        } else {
            showError(messages.formValidationError);
            setSubmitted(true);
        }
    };

    const showSuccess = msg => {
        ModalNextProvider.showAlert({
            status: 'success',
            title: messages.genericSuccessMessage,
            message: msg,
        });
    };

    const showError = msg => {
        ModalNextProvider.showAlert({
            status: 'error',
            title: messages.genericErrorMessage,
            message: msg,
        });
    };

    const resetForm = () => {
        setSubmitted(false);
        setFormData({});
    };

    const handleRenderTrigger = (toggleMenuProps, toggleMenu) => {
        const { isOpen } = toggleMenuProps;
        const handleButtonClick = () => toggleMenu(!isOpen);
        return (
            <Button onClick={handleButtonClick}>
                {messages.externalLinksMenuButtonText}
            </Button>
        );
    };

    const { className } = props;

    return (
        <div className={cx(styles.formExamplePage, className)}>
            <MetadataForm
                uiProps={uiMetadata['a.b.codelessForm']}
                data={formData}
                onDataChange={writeValue}
                showErrors={submitted}
                showOptional
                classNameMap={styles}
                callbackMap={{
                    resetForm: resetForm,
                    saveForm: saveForm,
                    menuTriggerCallback: handleRenderTrigger,
                }}
            />
        </div>
    );
};
