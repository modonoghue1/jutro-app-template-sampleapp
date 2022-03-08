export const Routes: React.NamedExoticComponent<PropTypes.InferProps<{
    /**
     * Array of step metadata: { key, route, component, ...}
     */
    steps: PropTypes.Validator<any[]>;
    /**
     * Callback to render 'not found' content; if not provided, nothing will be rendered if path is not found
     */
    renderNotFound: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Path to initial step; if not provided, the first step will be displayed
     */
    initialStepPath: PropTypes.Requireable<string>;
    /**
     * Base path for the wizard; used when building step links
     */
    basePath: PropTypes.Validator<string>;
    /**
     *  Base route for the wizard; used when building step routes
     */
    baseRoute: PropTypes.Validator<string>;
    /**
     * Component map for page component resolver
     */
    componentMap: PropTypes.Requireable<object>;
    /**
     * Array of subRoute metadata: { key, route, component, ...}
     */
    subRoutes: PropTypes.Validator<any[]>;
}>>;
import PropTypes from "prop-types";
import React from "react";
