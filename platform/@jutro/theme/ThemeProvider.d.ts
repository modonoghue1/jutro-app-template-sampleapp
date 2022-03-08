/**
 * Create a HOC wrapper that injects 'theme' as a prop
 *
 * @param {React.Component} ComponentToWrap - component to wrap
 * @returns {React.Component} wrapped component
 */
export function withTheme(ComponentToWrap: React.Component): React.Component;
/**
 * Render by invoking a render prop with 'theme'.
 * This is an alternative to using ThemeContext.Consumer directly. Useful for consuming without
 * using a HOC.
 *
 * @param {Function} renderProp - render method to be invoked by the ThemeContext
 * @returns {React.ReactNode} returns JSX wrapping the invocation of the 'renderProp'
 */
export function renderWithTheme(renderProp: Function): React.ReactNode;
export const THEMEPROVIDER_DEFAULT: any;
export namespace defaultTheme {
    export { THEMEPROVIDER_DEFAULT as name };
    export function switchTheme(): void;
}
/**
 * @type {React.ContextType}
 */
export const ThemeContext: any;
/**
 * A ThemeProvider that can be placed in the app component hierarchy. It takes a theme configuration object
 * and injects a 'theme' object into any consumers.
 * @extends Component<{}>
 */
export class ThemeProvider extends React.Component<{}, any, any> {
    static propTypes: {
        /**
         * The initial state configuration object
         */
        initialConfig: PropTypes.Requireable<PropTypes.InferProps<{
            name: PropTypes.Validator<string>;
            rootStyle: PropTypes.Validator<any>;
            componentStyles: PropTypes.Validator<any>;
            baseTheme: PropTypes.Requireable<string>;
            styleOverrides: PropTypes.Requireable<string>;
            variableOverrides: PropTypes.Requireable<string>;
        }>>;
        /**
         * Additional component styling class name
         */
        className: PropTypes.Requireable<string>;
        /**
         * The component children wrapped by the theme provider
         */
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Flag for applying styles locally
         */
        applyLocally: PropTypes.Requireable<boolean>;
    };
    static bodyStylesMounted: boolean;
    constructor(props: any);
    get useBodyStyles(): boolean;
    get themeRootStyles(): any[];
    /**
     * Set the theme for this theme provider by providing another theme configuration.
     * This is to change the theme after the initial load at runtime
     *
     * @param {object} newConfig - new theme configuration object
     */
    switchTheme: (newConfig: object) => void;
    /**
     * create state from config
     * @param {object} config configuration for the ThemeProvider
     * @returns {object} ThemeProvider state
     */
    createStateFromConfig: (config: object) => object;
    /**
     * Get the root style from a theme. This should be a single string.
     *
     * @returns {string} root style from theme or default style
     */
    getRootStyle: () => string;
    appendStyleOverrides(): void;
    /**
     * Create dynamic style sheet for configuration styles
     */
    createDynamicStylesheet(): void;
    stylesheet: DynamicStyleSheet | null | undefined;
    /**
     * Remove dynamic style sheet
     */
    removeDynamicStylesheet(): void;
    updateCreatedStateIfNeeded(initialConfig: any, prevConfig: any): void;
    renderContent(): JSX.Element;
}
import React from "react";
import { Component } from "react";
import { DynamicStyleSheet } from "./DynamicStyleSheet";
import PropTypes from "prop-types";
