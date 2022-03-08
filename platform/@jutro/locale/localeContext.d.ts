import React from 'react';
import { Locale } from 'date-fns';
export declare type LocaleContextProps = {
    locale?: string;
    dateLocale: Locale;
    defaultTimeZone?: string;
    localeOnChangeCallback?: (val: string) => void;
};
declare const LocaleContext: React.Context<LocaleContextProps>;
export declare const LocaleContextProvider: React.Provider<LocaleContextProps>;
export declare const LocaleContextConsumer: React.Consumer<LocaleContextProps>;
export default LocaleContext;
