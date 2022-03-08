import { WeakValidationMap, Requireable } from 'react';
export declare type IntlMessageObject = {
    id?: string;
    defaultMessage?: string;
    args?: Record<string, string>;
};
export declare const intlMessageObject: WeakValidationMap<IntlMessageObject>;
export declare type IntlMessageShape = string | IntlMessageObject;
/**
 * Default PropTypes shape for l10n props
 */
export declare const intlMessageShape: Requireable<IntlMessageShape>;
