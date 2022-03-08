import React from 'react';
import { IntlMessageShape, AppSwitcherItems as Items } from '@jutro/prop-types';
import { availableIconColors } from './AppSwitcherButton';
declare type AppSwitcherProps = {
    /**
     * Used to identify this component.
     */
    id: string;
    /**
     * Array of Items to be displayed in the menu
     */
    items: Items;
    /**
     * CSS class name for the wrapper div
     */
    className?: string;
    /**
     * Callback invoked when any route is clicked
     */
    onRouteClick?: () => void;
    /**
     * The color of trigger icon
     */
    iconColor?: typeof availableIconColors[number];
    /**
     * CSS class name for trigger icon
     */
    iconClassName?: string;
    /**
     * Text displayed on footer link
     */
    footerText?: IntlMessageShape;
    /**
     * URL to which footer link leads
     */
    footerUrl?: IntlMessageShape;
    /**
     * Callback which will be triggered when footer link is clicked
     */
    onFooterClick?: (event: React.SyntheticEvent) => void;
    /**
     * Should AppSwitcher be displayed as a dropdown
     */
    isDropdown?: boolean;
    /**
     * Enables apps search field if the number of items equals or is above `collapsibleGroupsThreshold` value
     */
    searchEnabled?: boolean;
    /**
     * Number of items from which the groups are collapsible and the search is displayed
     */
    collapsibleGroupsThreshold?: number;
    /**
     * Prop to specify if the footer should be hidden or not
     */
    hideFooter?: boolean;
};
export declare const AppSwitcher: React.FC<AppSwitcherProps>;
export {};
