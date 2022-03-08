import React, { useCallback } from 'react';
import { SettingsCard } from '@jutro/lab-preview-components';
import uiMetadata from './NavigationPlacementSettingsCard.metadata.json5';
import { useSetting } from '../../context/SettingsContext';

export const NavigationPlacementSettingsCard = ({ id, title }) => {
    const ctx = useSetting('navPlacement');

    const updateSetting = useCallback(
        value => ctx && ctx.setValue(value.navigationPlacement),
        [ctx]
    );

    return (
        <SettingsCard
            id={id}
            formProps={{
                uiProps: uiMetadata.navigationPlacementSettingsCardContent,
                data: { navigationPlacement: ctx?.getValue() || 'top' },
            }}
            title={title}
            onSaveClick={updateSetting}
        />
    );
};
