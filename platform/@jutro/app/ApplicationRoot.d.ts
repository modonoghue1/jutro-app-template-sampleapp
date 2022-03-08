/**
 * A root-level component that takes care of application-level
 * concerns for you:
 * -- internationalization
 * -- routing
 * -- error handling (uncaught)
 * If the application requires a custom HOC, rootHOCs render prop
 * can be used, e.g. <ApplicationRoot rootHOCs={composeRedux(store)} />.
 * Array of HOCs are applied in order starting with first to last and then
 * ErrorBoundary is added.
 *
 * @extends Component<{}>
 * @param messages
 */
export class ApplicationRoot extends React.Component<{}, any, any> {
    /**
     * @type {object}
     * @prop {(locale:string) => object} messageLoader - The function to load locale messages
     * @prop {(locale:string) => object} coreMessageLoader - The function to load core app locale messages
     * @prop {string} intlTextComponent - The tag to render text inside of react-intl <Formatted*> components; defaults to React.Fragment (https://formatjs.io/docs/react-intl/upgrade-guide-3x)
     * @prop {React.ReactElement} errorBoundary - The application 'catch-all' error boundary
     * @prop {React.ReactElement} loaderComponent - The component for wrapping the main component and presenting a loader UI when the app is loading
     * @prop {Function} trackingCallback - callback fired by RouteTracker on route change with values location, action
     * @prop {React.ReactElement} main - The application entry component
     * @prop {BrowserRouter|MemoryRouter} router - The router to use
     * @prop {object} routerHistory - configuration for creating  MemoryHistory or BrowserHistory
     * @prop {string} routerBasename - The base URL for all locations. If you serve the app from a sub-directory on your server, you'll want to set this to the sub-directory. A properly formatted basename should have a leading slash, but no trailing slash.
     * @prop {boolean} refreshOnLanguageChange - if `true`, reloads on every language change (`window.location.reload()`). Default is `false`.
     * @prop {boolean} refreshOnLanguageOrLocaleChange - if `true`, reloads on every language or locale change (`window.location.reload()`). Default is `false`.
     * @prop {boolean} saveDefaultLanguageAndLocaleToLocalStorage - if `true`, saves default language and locale to localStorage if not already set. Default is `true`.
     * @prop {(body:React.ReactElement) => React.ReactElement} rootHOCs - HOC which provides store, e.g. Redux composing function
     * @prop {React.ReactElement} authErrorComponent - a custom error component to render on the auth redirect path
     * @prop {object} modalEmitter - Instance of ModalNextEmitter passed down to ModalNextProvider for accessing modal functions from outside the scope of the ModalNextProvider
     */
    static propTypes: object;
    static defaultProps: {
        messageLoader: (locale: any) => {};
        coreMessageLoader: (locale: any) => {};
        errorBoundary: typeof ErrorBoundary;
        loaderComponent: React.FC<Readonly<{
            className?: string | undefined;
            children?: React.ReactNode;
            loaded?: boolean | Promise<unknown> | readonly Promise<unknown>[] | undefined;
            text?: import("@jutro/prop-types").IntlMessageShape | undefined;
            renderLoader?: (() => React.ReactNode) | undefined;
        }>>;
        routerBasename: any;
        refreshOnLanguageChange: boolean;
        refreshOnLanguageOrLocaleChange: boolean;
        saveDefaultLanguageAndLocaleToLocalStorage: boolean;
        authErrorComponent: React.FC<{
            error: {
                name: string;
                message: string;
                errorCode: string;
            };
        }>;
        modalEmitter: ModalNextEmitter;
    };
    constructor(props: any);
    routerHistory: any;
    authEnabled: any;
    getUserConfirmation: (message: any, callback: any) => void;
    /**
     * If the router history prop is provided, use it. Otherwise
     * default to the memory router for test, or browser router for all other cases
     *
     * @returns {object} - The router history to use
     */
    getRouterHistory: () => object;
    /**
     * Refreshes the browser if the option is enabled.
     * Otherwise loads the new messages
     *
     * @param {string} language - the new language
     */
    onLanguageOrLocaleChange: ({ locale, language, languageChanged, }: string) => Promise<void>;
    onLocaleChange: (locale: any) => Promise<void>;
    onLanguageChange: (language: any) => Promise<void>;
    onLoadMessages: (messages: any) => void;
    onLoadMessagesTSM: (messages: any) => void;
    onLoadLanguages: () => void;
    /**
     * Returns an array of higher-order components.
     *
     * @returns {Array<Function>} - The array of higher-order components
     */
    getHOCs(): Array<Function>;
    /**
     * Render the children with the correct router. If a custom Router prop is present
     * use it as the router. Otherwise use the base React Router with a custom history.
     *
     * @param {React.ReactElement} children - router children to render
     * @returns {React.ReactElement} - the rendered router
     */
    renderWithRouter: (children: React.ReactElement) => React.ReactElement;
    /**
     * Render any additional components required for Jutro app functionality
     *
     * @returns {React.ReactElement} - The fragment containing the additional components
     */
    renderRequiredComponents: () => React.ReactElement;
    /**
     * Applies the HOCs to the body of the application.
     *
     * @param {React.ReactElement} body - The application body
     * @returns {React.ReactElement} - The wrapped application body
     */
    applyHOCs(body: React.ReactElement): React.ReactElement;
    /**
     * Renders a react-helmet element that builds a localized titleTemplate and description, and other meta tags.
     *
     * @param {Function} translator - The localization translator function
     * @returns {React.ReactElement} - The Helmet header element
     */
    renderPageHead: (translator: Function) => React.ReactElement;
}
import React from "react";
import { ErrorBoundary } from "@jutro/components";
import { ModalNextEmitter } from "@jutro/components";
