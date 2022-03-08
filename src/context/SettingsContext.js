import React, { useContext, useState, useCallback } from 'react';
import { cloneDeep, set } from 'lodash';

const SettingsContext = React.createContext(null);

export const SettingsProvider = ({ children }) => {
    const [value, setValue] = useState({});

    const updateValue = useCallback(
        (key, newValue) =>
            setValue(currentSettings => {
                const newSettings = cloneDeep(currentSettings);
                set(newSettings, `setting:${key}`, newValue);
                return newSettings;
            }),
        []
    );

    return (
        <SettingsContext.Provider value={{ ...value, updateValue }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSetting = settingName => {
    const ctx = useContext(SettingsContext);
    return {
        getValue: () => ctx?.[`setting:${settingName}`],
        setValue: newValue => ctx && ctx.updateValue(settingName, newValue),
    };
};
