import { IntlMessageObject } from '@jutro/prop-types';
import { ReactNode } from 'react';
export declare type TranslatorArgs = Record<string, string | ((a: string) => void)>;
export interface Translator {
    (key?: string | IntlMessageObject | {
        id: string;
        defaultMessage: string;
    }, args?: TranslatorArgs): string;
    (key?: undefined, args?: Record<string, string>): undefined;
    (key?: ReactNode, args?: Record<string, string>): ReactNode;
}
