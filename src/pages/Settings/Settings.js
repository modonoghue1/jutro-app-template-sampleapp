// @ts-check
import React from 'react';
import { MetadataForm } from '@jutro/uiconfig';
import { NavigationPlacementSettingsCard } from './NavigationPlacementSettingsCard';
import { AboutSettingsCard } from './AboutSettingsCard';

import uiProps from './Settings.metadata.json5';
import style from './Settings.module.scss';
import config from '../../config/config.json';

const componentMap = {
    NavigationPlacementSettingsCard,
    AboutSettingsCard,
};

export const Settings = () => {
    const {
        localeSettings: { availableLocales, availableLanguages },
    } = config;

    const overrideProps = {
        'globalization-settings-card': {
            availableLocaleValues: availableLocales,
            availableLanguageValues: availableLanguages,
        },
    };

    return (
        <MetadataForm
            componentMap={componentMap}
            uiProps={uiProps['settings-page']}
            classNameMap={style}
            overrideProps={overrideProps}
        />
    );
};
