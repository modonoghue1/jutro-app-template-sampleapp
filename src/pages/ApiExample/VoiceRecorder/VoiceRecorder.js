import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton, InlineNotification } from '@jutro/components';
import messages from './VoiceRecorder.messages';

const requestAudioPermission = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
};
export const VoiceRecorder = ({ id, className, onVoiceRecorded }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [audioRecorder, setAudioRecorder] = useState(null);

    const errorCallback = () => {
        setIsBlocked(true);
    };
    useEffect(() => {
        if (audioRecorder === null) {
            if (isRecording) {
                requestAudioPermission().then(setAudioRecorder, errorCallback);
            }
            return;
        }
        if (isRecording) {
            audioRecorder.start();
        } else if (audioRecorder?.state === 'recording') {
            audioRecorder.stream.getTracks()[0].stop();
        }
        const handleData = e => {
            onVoiceRecorded(e.data);
        };

        audioRecorder.addEventListener('dataavailable', handleData);
        return () =>
            audioRecorder.removeEventListener('dataavailable', handleData);
    }, [audioRecorder, isRecording, onVoiceRecorded]);

    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    return (
        <React.Fragment>
            <IconButton
                id={id}
                icon={isRecording ? 'mi-pause-circle-filled' : 'mi-mic'}
                className={className}
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
            />
            {isBlocked ? (
                <InlineNotification
                    id={`${id}InlineNotification`}
                    type="warning"
                    message={messages.permissionDenied}
                    isDismissable={false}
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
     * Callback to be fired when there is voice recorded
     */
    onVoiceRecorded: PropTypes.func,
    /**
     * className for applying custom styles
     */
    className: PropTypes.string,
};
