/**
 * Resolve component string to real component using component map.
 *
 * @param {string|function} component - name of component to resolve
 * @param {object} [componentMap] - map for resolving component
 * @returns {React.Component} resolved component class
 */
export declare function resolveComponentFromMap(component: string | ReactComponent, componentMap?: Record<string, ReactComponent>): ReactComponent;
