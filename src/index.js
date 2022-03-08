// @ts-check
import { start } from '@jutro/app';
import { warning } from '@jutro/logger';
import appConfig from './config/config.json';
import { App } from './app/App';
import messages from './app/App.messages';

/**
 * Load application specific messages
 * @param {string} lang
 *
 * @returns {Promise<object>} - Loaded messages
 */
const loadMessages = async lang => {
    try {
        const { default: result } = await import(`./i18n/${lang}.json`);
        return result;
    } catch (error) {
        warning(`Unable to load translations for lang: ${lang}.`);
        return {};
    }
};

/**
 * Load core application messages
 * @param {string} lang
 *
 * @returns {Promise<object>} - Loaded messages
 */
const loadCoreMessages = async lang => {
    try {
        const { default: result } = await import(
            `@jutro/translations/lang-data/${lang}`
        );
        return result;
    } catch (error) {
        warning(`Unable to load core translations for lang: ${lang}.`);
        return {};
    }
};

start(App, {
    rootId: 'root',
    config: [appConfig, { 'dynamic-param': 'World' }],
    messageLoader: loadMessages,
    coreMessageLoader: loadCoreMessages,
    appName: messages.appName,
    appDescription: messages.appDescription,
});
