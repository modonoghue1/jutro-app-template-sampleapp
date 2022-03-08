import React from 'react';
import { IntlConfig, IntlShape as IntlReactShape } from 'react-intl';
export declare type IntlShape = Pick<IntlReactShape, 'formatMessage' | 'locale' | 'messages' | 'defaultLocale' | 'textComponent' | 'formatNumber' | 'formatDisplayName'> & {
    id?: string;
    defaultMessage?: string;
    defaultLanguage?: string;
};
export declare const IntlContext: React.Context<IntlShape | undefined>;
export declare type IntlProviderProps = Pick<IntlConfig, 'locale'> & Partial<Pick<IntlConfig, 'defaultLocale' | 'messages' | 'textComponent'>>;
export declare const IntlProvider: React.FC<IntlProviderProps>;
