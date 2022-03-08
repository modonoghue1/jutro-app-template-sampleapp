/// <reference types="react" />
declare type Props = {
    /** Callback fired when loading languages is finished */
    onLoad: () => void;
    children: never;
};
/**
 * Handles loading available languages which are used by GlobalizationChooser.
 * It works only when both auth and TSM integrations are enabled AND no languages are passed manually to GlobalizationChooser
 */
export declare const LanguagesLoader: React.FC<Props>;
export {};
