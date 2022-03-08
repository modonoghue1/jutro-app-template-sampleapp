import React from 'react';
import { Action, Location } from 'history';
export declare type RouteTrackerProps = {
    track?: (params: Location, action: Action) => unknown;
};
/**
 * RouteTracker is a component that will register a listener with route history.
 * Drop into any component render that is contained in a <Router>.
 *
 * @example
 * <RouteTracker track={this.callback} />
 */
export declare const RouteTracker: React.FC<RouteTrackerProps>;
