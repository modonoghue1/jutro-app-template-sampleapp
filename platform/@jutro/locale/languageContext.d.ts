/// <reference types="react" />
export declare type LanguageContextProps = {
    language?: string;
    languageOnChangeCallback?: (value: string) => void;
};
declare const LanguageContext: import("react").Context<LanguageContextProps>;
export declare const LanguageContextProvider: import("react").Provider<LanguageContextProps>;
export declare const LanguageContextConsumer: import("react").Consumer<LanguageContextProps>;
export default LanguageContext;
