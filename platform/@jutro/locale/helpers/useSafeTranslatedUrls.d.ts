import { IntlRouterLocation, IntlMessageShape, RouterLocation, IntlToShape } from '@jutro/prop-types';
import { Translator } from '../types';
export declare type UrlTranslatorAndSanitizer = <Url extends IntlMessageShape | IntlToShape | undefined>(url: Url, allowNoLeadingSlash?: boolean) => Url extends IntlRouterLocation ? RouterLocation : Url extends undefined ? undefined : string;
export declare const getUrlTranslatorAndSanitizer: (translator: Translator) => UrlTranslatorAndSanitizer;
export declare const useSafeTranslatedUrls: () => UrlTranslatorAndSanitizer;
