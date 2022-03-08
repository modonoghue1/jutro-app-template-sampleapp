import React from 'react';
import { SettingsCard } from '@jutro/lab-preview-components';

import uiProps from './AboutSettingsCard.metadata.json5';

export const AboutSettingsCard = ({ id, title }) => {
    return (
        <SettingsCard
            id={id}
            title={title}
            formProps={{
                uiProps: uiProps['about-card'],
            }}
            readOnly
        />
    );
};
