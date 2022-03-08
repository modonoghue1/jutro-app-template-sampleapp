// @ts-check
import React, { useState, useContext, useCallback } from 'react';
import {
    Card,
    TextAreaField,
    Button,
    TypeaheadMultiSelectField,
} from '@jutro/components';
import { TranslatorContext } from '@jutro/locale';
import { Grid } from '@jutro/layout';
import { warning } from '@jutro/logger';
import { pickBy, set, omit } from 'lodash';
import { ActionLayout } from '../../components/layouts/ActionLayout';
import { lossTypeAvailableValues } from './ClaimDetailHelpers';
import styles from './ClaimDetails.module.scss';
import messages from './ClaimDetails.messages';
import { useAPI } from '../../helpers/useAPI';

export const ClaimDetails = ({ id, title, data }) => {
    const translator = useContext(TranslatorContext);
    const claimApi = useAPI();

    const [formData, setFormData] = useState(data);
    const [readOnlyState, setReadOnlyState] = useState(true);

    const toggleReadOnly = () => {
        setReadOnlyState(value => !value);
    };

    const handleDataChange = path => {
        return value => {
            setFormData(prevState => {
                const newState = { ...prevState };
                set(newState, path, value);
                return newState;
            });
        };
    };

    const onCancelButtonClick = () => {
        setFormData(data);
        toggleReadOnly();
    };

    const onDoneButton = async () => {
        await handleSave();
        toggleReadOnly();
    };

    const handleLossCauseError = useCallback(
        async changesOnly => {
            try {
                await claimApi.patchClaim(omit(changesOnly, 'lossCause'));
                // eslint-disable-next-line no-alert
                alert('Claim Details description was updated');
            } catch (ex) {
                const message = claimApi.formatApiError(ex);
                warning(message);
            }
        },
        [claimApi]
    );

    const handleSave = useCallback(async () => {
        const changesOnly = pickBy(formData, (value, key) => {
            if (key === 'id' || key === '_checksum' || key === '_actions') {
                return true;
            }
            return value !== data[key];
        });
        try {
            await claimApi.patchClaim(changesOnly);
            // eslint-disable-next-line no-alert
            alert('Claim Details were updated');
        } catch (ex) {
            const message = claimApi.formatApiError(ex);

            if (message.match(/lossCause/)) {
                // reset value of lossCause on lossCause api error
                setFormData(prevState => {
                    const newState = { ...prevState };
                    set(newState, 'lossCause', data.lossCause);
                    return newState;
                });
                if (changesOnly.description !== undefined) {
                    handleLossCauseError(changesOnly);
                }
            }

            warning(message);
        }
    }, [formData, claimApi, data, handleLossCauseError]);

    const fields = (
        <React.Fragment>
            <TypeaheadMultiSelectField
                singleSelect
                dataType="object"
                id="typeOfLoss"
                label="Type of accident"
                labelPosition="top"
                readOnly={readOnlyState}
                value={formData.lossCause}
                availableValues={lossTypeAvailableValues}
                onValueChange={handleDataChange('lossCause')}
            />
            <TextAreaField
                autoTrim={false}
                dataPath=""
                dataType="string"
                disabled={false}
                hideLabel={false}
                id="accountOfLoss"
                label="Account of loss"
                labelPosition="top"
                readOnly={readOnlyState}
                value={formData?.description}
                onValueChange={handleDataChange('description')}
            />
        </React.Fragment>
    );

    const actionButtons = readOnlyState ? (
        <Button onClick={toggleReadOnly}>
            {`${translator(messages.edit)} ${title}`}
        </Button>
    ) : (
        <React.Fragment>
            <Button type="text" onClick={onCancelButtonClick}>
                {translator(messages.cancel)}
            </Button>
            <Button type="filled" onClick={onDoneButton}>
                {translator(messages.done)}
            </Button>
        </React.Fragment>
    );
    return (
        <Card id={id} title={title} className={styles.detailsCard}>
            <Grid columns={[1]} gap="large">
                {fields}
            </Grid>
            <ActionLayout className={styles.actionBar}>
                {actionButtons}
            </ActionLayout>
        </Card>
    );
};
