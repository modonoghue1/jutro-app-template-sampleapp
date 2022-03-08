import React, { ReactNode } from 'react';
import type { Translator } from './types';
declare type TranslatorProviderProps = {
    children: ReactNode;
};
/**
 * @type {React.ContextType}
 */
export declare const TranslatorContext: React.Context<Translator>;
export declare const TranslatorProvider: React.FC<TranslatorProviderProps>;
export declare const withTranslator: (ComponentToWrap: React.ComponentType) => React.ComponentType;
export {};
