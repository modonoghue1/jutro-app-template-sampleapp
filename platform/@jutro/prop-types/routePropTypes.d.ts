import type { WeakValidationMap } from 'react';
import PropTypes from 'prop-types';
import { IntlMessageShape } from './intlMessageShape';
import { IntlToShape } from './toShape';
export declare type NavLinkPropTypes = {
    /**
     * Identifier for nav link; should be unique per page
     */
    id?: string;
    /**
     * Label for nav link
     */
    text?: IntlMessageShape;
    /**
     * Icon for nav link
     */
    icon?: string;
    /**
     * Additional className for nav link
     */
    className?: string;
    /**
     * Additional className for nav link active state
     */
    activeClassName?: string;
    /**
     * The notification value of the Badge
     */
    notifications?: number;
    /**
     * React element to render nav item
     */
    component?: ReactComponent;
};
export declare type Route = {
    /**
     * URL path of the route
     */
    path?: string;
    /**
     * When true, will only match if the path matches the location.pathname exactly
     */
    exact?: boolean;
    /**
     * When true, a path that has a trailing slash will only match a location.pathname with a trailing slash.
     */
    strict?: boolean;
    /**
     * Match from case sensitive
     */
    sensitive?: boolean;
    /**
     * Path to which redirect when entering current page
     */
    redirect?: string;
    /**
     * When true, redirecting will push a new entry onto the history instead of replacing the current one
     */
    push?: boolean;
    /**
     * A location to redirect to
     */
    to?: IntlToShape;
    /**
     * A pathname to redirect from.
     */
    from?: string;
    /**
     * Identifier for route
     */
    id?: string;
    /**
     * Component to be rendered as the destination page for this route
     */
    component?: ReactComponent;
    /**
     * Properties for the component to be rendered
     */
    componentProps?: Record<string, unknown>;
    /**
     * Title to be displayed for route
     */
    title?: IntlMessageShape;
    /**
     * Defines whether route should be shown in the navigation
     */
    showOnNavBar?: boolean;
    /**
     * Nav link properties
     */
    navLink?: NavLinkPropTypes;
    /**
     * Array of route subroutes
     */
    routes?: Route[];
    /**
     * External path from application
     */
    href?: string;
};
export declare type RouteMatch = Pick<Route, 'path' | 'strict' | 'exact' | 'sensitive'>;
export declare type MatchPathProps = string | RouteMatch | Array<string | RouteMatch>;
/**
 * Default prop types for NavLink
 */
export declare const navLinkPropTypes: WeakValidationMap<NavLinkPropTypes>;
/**
 * Default PropTypes shape for routes
 */
export declare const routePropTypes: WeakValidationMap<Route>;
export declare const routeShape: PropTypes.Validator<PropTypes.InferProps<WeakValidationMap<Route>>>;
export declare const routesShape: PropTypes.Requireable<PropTypes.InferProps<WeakValidationMap<Route>>[]>;
