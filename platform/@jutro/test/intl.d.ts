/**
 * Shallow mounts the component with the react-intl context automatically provided.
 *
 * @param {React.ReactNode} node - The component being wrapped
 * @param {string} [locale='en'] - The locale to use
 * @param {Record<string, any>} [messages] - The i18n messages to use
 * @param {Record<string, any>} context - Any additional context that needs to be provided
 * @param {Record<string, any>} childContextTypes - Any additional child context types that needs to be provided
 * @param {string} textComponent - The tag to render text inside of react-intl <Formatted*> components; defaults to React.Fragment
 * @returns {ShallowWrapper} - The enzyme shallow wrapper
 */
export function shallowIntl(node: React.ReactNode, { locale, messages, context, textComponent }?: string | undefined): any;
/**
 * Mounts the component with the react-intl context automatically provided.
 *
 * @param {React.ReactElement} node - The component being wrapped
 * @param {string} [locale='en'] - The locale to use
 * @param {Record<string, any>} [messages] - The i18n messages to use
 * @param {Record<string, any>} context - Any additional context that needs to be provided
 * @param {Record<string, any>} childContextTypes - Any additional child context types that needs to be provided
 * @param {string} textComponent - The tag to render text inside of react-intl <Formatted*> components; defaults to React.Fragment
 * @returns {ReactWrapper} - The enzyme wrapper
 */
export function mountIntl(node: React.ReactElement, { locale, messages, context, childContextTypes, textComponent }?: string | undefined): any;
export function skipContextConsumer(wrapper: any): any;
export function mountWithIntlContext(node: any, locale: string | undefined, textComponent: any): any;
export function mountWithTranslatorContext(node: React.ReactNode, locale?: string | undefined, textComponent?: string | undefined, translator?: Function | undefined): any;
export function mountWithTranslatorAndRouterContext(node: any, locale: string | undefined, textComponent: any, translator?: (key?: string | Record<string, any> | undefined) => string): any;
export function TranslatorContextForTest(node: React.ReactNode, locale: string | undefined, textComponent: string, dateLocale?: string, translator?: Function): React.ReactElement;
export function mountWithLocaleContext(node: any, locale?: string, dateLocale?: Locale, translator?: (key?: string | Record<string, any> | undefined) => string): any;
import React from "react";
