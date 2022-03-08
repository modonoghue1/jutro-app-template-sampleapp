import { IntlMessageObject } from '@jutro/prop-types';
/**
 * Determines whether to display string ids instead of actual translations.
 * Use query string `displayStringId` or `DEV_DISPLAY_STRING_ID` config variable
 * to enable string ids. The result is cached for the app lifetime.
 *
 * @returns true if should display string ids instead of translations
 */
export declare function shouldDisplayStringId(): boolean;
export declare function stringIdTranslator(key: IntlMessageObject | string): string | undefined;
