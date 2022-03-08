import { WrappedComponentProps } from 'react-intl';
import React from 'react';
import { IntlProviderProps } from './IntlProvider';
/**
 * A GlobalizationProvider that can be placed in the app component hierarchy.
 *
 * @returns {Function} Locale Provider component
 */
export declare function withIntl<T extends WrappedComponentProps>(ComponentToWrap: React.ComponentType<T>): React.ComponentType<Omit<T, 'intl'>>;
/**
 * A GlobalizationProvider that can be placed in the app component hierarchy.
 */
export declare const GlobalizationProvider: {
    (props: GlobalizationProviderProps): JSX.Element;
    defaultProps: {
        defaultLocale: string;
        messages: {};
        onLanguageChange: () => void;
        onLocaleChange: () => void;
    };
    displayName: string;
    propTypes: React.WeakValidationMap<GlobalizationProviderProps>;
};
/**
 * JUT-6351 - https://guidewirejira.atlassian.net/browse/JUT-6351
 * PropTypes extension required.
 */
export declare type GlobalizationProviderProps = {
    id?: string;
    defaultMessage?: string;
    messages?: Record<string, string>;
    defaultLocale?: string;
    intlTextComponent?: IntlProviderProps['textComponent'];
    defaultLanguage?: string;
    onLanguageChange?: (val: string) => void;
    onLocaleChange?: (val: string) => void;
    children: React.ReactNode;
};
