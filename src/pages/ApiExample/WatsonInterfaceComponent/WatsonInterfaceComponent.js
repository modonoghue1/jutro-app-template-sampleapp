import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import wordsToNumbers from 'words-to-numbers';
import { InlineNotification, InlineLoader } from '@jutro/components';
import { error } from '@jutro/logger';
import { VoiceRecorder } from '../VoiceRecorder/VoiceRecorder';
import messages from './WatsonInterfaceComponent.messages';
import styles from './WatsonInterfaceComponent.module.scss';

const getTranscript = data => {
    const alternatives = data?.results?.[0]?.alternatives;
    const sortedAlternatives = sortBy(alternatives, 'confidence');
    return sortedAlternatives[0]?.transcript;
};

export const WatsonInterfaceComponent = props => {
    const { apiUrl: API_URL, apiKey: API_KEY, id } = props;
    const auth = btoa(`apikey:${API_KEY}`);
    const history = useHistory();
    const [isInvalidCommand, setIsInvalidCommand] = useState(false);
    const [isLoading, setIsLoading] = useState(undefined);
    const onVoiceRecorded = blob => {
        if (!blob || blob.size < 385) {
            return;
        }
        setIsLoading(true);
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': blob.type,
                Authorization: `Basic ${auth}`,
            },
            body: blob,
        })
            .then(response => response.json())
            .then(data => {
                const transcript = getTranscript(data);
                if (/new claim/.test(transcript)) {
                    history.push('./dashboard/claims');
                    document.querySelector('#newClaim').click();
                } else if (/new vehicle/.test(transcript)) {
                    history.push('./patterns/AddVehiclePage');
                    document.querySelector('#addvehicle').click();
                    const numberStr = transcript.split('number')[1];
                    document.getElementById('vin_0').value = wordsToNumbers(
                        numberStr
                    ).replace(/[^\S\r\n]+/g, '');
                } else if (/first notice of loss/.test(transcript)) {
                    history.push('./claim/fnol/context');
                } else {
                    setIsInvalidCommand(true);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                error(err);
                setIsLoading(false);
            });
    };

    return (
        <React.Fragment>
            {isLoading ? (
                <InlineLoader
                    id={`${id}Loader`}
                    className={styles.watsonVoiceRecorder}
                    loading
                />
            ) : (
                <VoiceRecorder
                    id={id}
                    className={styles.watsonVoiceRecorder}
                    onVoiceRecorded={onVoiceRecorded}
                />
            )}
            {isInvalidCommand ? (
                <InlineNotification
                    id={`${id}InlineNotification`}
                    type="warning"
                    message={messages.noCommandFound}
                />
            ) : null}
        </React.Fragment>
    );
};

VoiceRecorder.propTypes = {
    /**
     * Used to identify the component
     */
    id: PropTypes.string,
    /**
     * Watson speech to text API URL
     */
    apiUrl: PropTypes.string,
    /**
     * Watson speech to text API KEY
     */
    apiKey: PropTypes.string,
};
