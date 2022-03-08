// @ts-check
import React, { useCallback, useState, useEffect } from 'react';
import { MetadataForm, validateMetadata } from '@jutro/uiconfig';
import { ClaimLocationForm } from '../ClaimLocationForm/ClaimLocationForm';
import uiMetadata from './ClaimLocation.metadata.json5';
import styles from './ClaimLocation.module.scss';

export const ClaimLocation = ({ id, title, claimId, data }) => {
    const [selectedLocation, setSelectedLocation] = useState();
    const [currentLocation, setCurrentLocation] = useState({
        ...data,
        policyAddress: data?.policyAddress || '',
    });

    const handleEditLocation = useCallback(() => {
        setSelectedLocation(currentLocation);
    }, [currentLocation]);

    const handleClose = useCallback(
        result => {
            if (result && result.lossLocation) {
                setCurrentLocation(result.lossLocation);
            }
            setSelectedLocation(undefined);
        },
        [setSelectedLocation]
    );

    const classNameMap = {
        editButton: styles.editButton,
        locationCard: styles.locationCard,
    };

    const callbackMap = {
        handleEditLocation: handleEditLocation,
    };

    useEffect(() => {
        validateMetadata(uiMetadata);
    }, []);

    if (selectedLocation) {
        return (
            <ClaimLocationForm
                id={`${id}Form`}
                title={title}
                claimId={claimId}
                data={selectedLocation}
                onClose={handleClose}
            />
        );
    }

    return (
        <div>
            <MetadataForm
                uiProps={uiMetadata['jutro-app.claimlocation.agent']}
                data={currentLocation}
                classNameMap={classNameMap}
                callbackMap={callbackMap}
            />
        </div>
    );
};
