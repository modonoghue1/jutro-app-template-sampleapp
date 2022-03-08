import { Requireable, WeakValidationMap } from 'react';
import PropTypes from 'prop-types';
import { IntlMessageShape } from './intlMessageShape';
export declare type ContextPropTypes = {
    /**
     * The context path
     */
    path?: string;
    /**
     * Context title
     */
    title?: IntlMessageShape;
    /**
     * When true, will only match if the path matches the location.pathname exactly
     * (unless match regular expression matches)
     */
    exact?: boolean;
    /**
     * The context will be considered active if the path matches this regular
     * expression, even if the path does not match the active route
     */
    match?: string | RegExp;
};
export declare type ContextSwitcherPropTypes = {
    /**
     * Default button label when no context is active
     */
    defaultLabel?: IntlMessageShape;
    /**
     * Array of values for the contexts
     */
    values: Array<ContextPropTypes>;
};
/**
 * Default prop types for Context value
 */
export declare const contextPropType: WeakValidationMap<ContextPropTypes>;
export declare const contextShape: PropTypes.Requireable<PropTypes.InferProps<WeakValidationMap<ContextPropTypes>>>;
/**
 * Context switcher configuration
 */
export declare const contextSwitcherPropTypes: WeakValidationMap<ContextSwitcherPropTypes>;
export declare const contextSwitcherShape: Requireable<ContextSwitcherPropTypes>;
