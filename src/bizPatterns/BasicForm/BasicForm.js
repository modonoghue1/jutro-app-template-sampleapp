import React, { useCallback, useState, useContext } from 'react';
import { set } from 'lodash';
import PropTypes from 'prop-types';
import { TranslatorContext } from '@jutro/locale';
import { Button, Card, InlineNotification } from '@jutro/components';
import { Flex, Grid } from '@jutro/layout';
import { MetadataForm } from '@jutro/uiconfig';
import { useDynamicOverrides } from '../../helpers/useDynamicOverrides';
import messages from './BasicForm.messages';
import styles from './BasicForm.module.scss';

const basicFormPropTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    uiProps: PropTypes.object,
    data: PropTypes.any,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

export const BasicForm = ({
    id,
    title,
    uiProps,
    data,
    onSave,
    onCancel,
    overrideProps,
    onDataChange,
    componentMap,
}) => {
    const translator = useContext(TranslatorContext);
    const [formData, setFormData] = useState(data || {});
    const [isValid, setIsValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleWrite = useCallback(
        (value, path) => {
            if (onDataChange) {
                onDataChange(value, path);
            }
            setFormData(prevState => {
                const newState = { ...prevState };
                set(newState, path, value);
                return newState;
            });
        },
        [setFormData, onDataChange]
    );

    const handleValidationChange = useCallback(
        isFormValid => {
            setIsValid(isFormValid);
        },
        [setIsValid]
    );

    const handleCancel = useCallback(() => {
        onCancel && onCancel();
    }, [onCancel]);

    const inlineNotification = (
        <InlineNotification
            type="warning"
            id="notification"
            message="Form has errors"
        />
    );

    const handleDone = useCallback(() => {
        if (!isValid) {
            setIsSubmitted(true);
            return;
        }

        onSave && onSave(formData);
    }, [onSave, formData, isValid, setIsSubmitted]);

    const dynamicOverrides = useDynamicOverrides(uiProps, formData);

    return (
        <Card id={id} title={title ?? translator(messages.title)}>
            <Grid>
                {isSubmitted && !isValid && inlineNotification}
                <MetadataForm
                    uiProps={uiProps}
                    overrideProps={{ ...overrideProps, ...dynamicOverrides }}
                    data={formData}
                    onDataChange={handleWrite}
                    classNameMap={styles}
                    onValidationChange={handleValidationChange}
                    showErrors={isSubmitted}
                    showRequired
                    componentMap={componentMap}
                />
                <Flex
                    alignItems="middle"
                    justifyContent="right"
                    wrap="reverse"
                    gap="medium"
                >
                    <Button
                        id="cancelButton"
                        type="text"
                        onClick={handleCancel}
                    >
                        {translator(messages.cancel)}
                    </Button>
                    <Button id="doneButton" type="filled" onClick={handleDone}>
                        {translator(messages.done)}
                    </Button>
                </Flex>
            </Grid>
        </Card>
    );
};

BasicForm.propTypes = basicFormPropTypes;
