import React, { ReactNode } from 'react';
import { ReactComponentLike } from 'prop-types';
import { MetadataContent } from '@jutro/uiconfig';
import { Route, ContextSwitcherPropTypes, ApplicationHeaderPropTypes, SideContentShape, MatchPathProps } from '@jutro/prop-types';
declare type MetadataContent = {
    [_: string]: unknown;
};
declare type MetadataContentArray = Array<MetadataContent>;
declare type UnknownFunction = (...args: any[]) => unknown;
declare type SubHeaderProps = {
    className?: string;
    contextSwitcher?: ContextSwitcherPropTypes;
};
export declare type RenderHeaderProps = {
    /**
     * Visible routes (routes with property `showOnNavBar` not equal/set to `false`)
     */
    navigationRoutes: Route[];
    /**
     * Header properties
     */
    header: ApplicationHeaderPropTypes;
    /**
     * Sub header properties
     */
    subHeader: SubHeaderProps;
};
export declare type RenderHeader = (props: RenderHeaderProps) => ReactNode;
export declare type FloorPlan = {
    /**
     * Show/hide Header
     */
    showHeader?: boolean;
    /**
     * Defines whether the sub navigation is shown or not
     */
    showSubHeader?: boolean;
    /**
     * Show/hide footer
     */
    showFooter?: boolean;
    /**
     * Show/hide left navigation
     */
    showLeftSide?: boolean;
    /**
     * Show/hide right panel
     */
    showRightSide?: boolean;
    /**
     * App routes to be shown in Sub Header
     */
    routes?: Route[];
    /**
     * App routes to be shown in Left Side
     */
    sideRoutes?: Route[];
    /**
     * Render custom header
     */
    renderHeader?: RenderHeader | string;
    /**
     * Properties for Application Header component
     */
    header?: ApplicationHeaderPropTypes;
    /**
     * Sub header config
     */
    subHeader?: SubHeaderProps;
    /**
     * Right panel config
     */
    rightSide?: {
        isInitiallyCollapsed?: boolean;
        collapsible?: boolean;
        sides?: SideContentShape[];
    };
    /**
     * Children components config for Footer
     */
    footer?: {
        /**
         * Component to be rendered
         */
        component?: string;
        componentProps?: Record<string, unknown>;
        /**
         * Array of element, container, field or action definitions
         */
        content?: MetadataContentArray;
    };
    /**
     * Make content scrollable
     */
    scrollContent?: boolean;
    /**
     * Additional class names for component.
     */
    className?: string;
    /**
     * Props passed to SideNavigation
     */
    leftSide?: {
        /**
         * Context switcher object
         */
        contextSwitcher?: Nullable<ContextSwitcherPropTypes>;
        className?: string;
        collapsible?: boolean;
        collapsed?: boolean;
    };
    /**
     * routes to be excluded from automatic scroll to top on location change
     */
    excludeScrollToTopRoutes?: MatchPathProps;
};
export declare type FloorPlanOverride = FloorPlan & {
    /**
     * The props to match against the current location. If match, the configuration override will be applied
     */
    matches: MatchPathProps;
};
export declare type FloorPlans = Array<FloorPlan | FloorPlanOverride>;
export declare type AppFloorPlanProps = {
    componentMap?: Record<string, ReactComponentLike>;
    classNameMap?: Record<string, string>;
    callbackMap?: Record<string, UnknownFunction>;
    floorPlans?: FloorPlans;
};
/**
 * Floorplan for the app, giving ability to use footer, header and nav out of the box
 */
export declare const AppFloorPlan: React.FC<AppFloorPlanProps>;
export default AppFloorPlan;
