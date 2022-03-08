import React, { WeakValidationMap } from 'react';
import { DropdownMenuLinkPropTypes } from './dropdownMenuLinkPropTypes';
import { AvailableValuesIdDisplayNameObject } from './availableValuePropTypes';
import { IntlMessageShape } from './intlMessageShape';
import { AppSwitcherItems } from './appSwitcherRoutePropTypes';
import { LinkPropTypes } from './linkShape';
import { AvatarPropTypes } from './avatarPropTypes';
import { Route } from './routePropTypes';
export declare type LookupOptionShape = AvailableValuesIdDisplayNameObject & {
    type: string;
};
export declare type DropdownMenuLinkShape = DropdownMenuLinkPropTypes & {
    /**
     * The link title
     */
    title?: Nullable<IntlMessageShape>;
};
export declare type ApplicationHeaderPropTypes = {
    /**
     * CSS class name for this component
     */
    className?: string;
    /**
     * Display logo from source
     */
    logoSrc?: string;
    /**
     * The link path for the logo
     */
    logoUrl?: string;
    /**
     * The title for the logo
     */
    logoTitle?: IntlMessageShape;
    /**
     * Display search field. Callback for the search field value change
     */
    onSearchValueChange?: Function;
    /**
     * Function for asynchronous data loading in search field
     */
    onLoadValues?: Function;
    /**
     * Array of choice objects to display
     */
    searchAvailableValues?: LookupOptionShape[];
    /**
     * Display notification icon
     */
    showNotifications?: boolean;
    /**
     * Notification content to be rendered
     */
    notificationChildren?: React.ReactNode;
    /**
     * Display avatar
     */
    showAvatar?: boolean;
    /**
     * Avatar content to be rendered
     */
    avatarChildren?: React.ReactNode;
    /**
     * Avatar props to be passed down if not using auth info (username, imageSource, title, subtitle)
     */
    avatarProps?: AvatarPropTypes;
    /**
     * Array of items to be displayed as common Avatar content
     */
    commonAvatarRoutes?: Array<DropdownMenuLinkShape>;
    /**
     * Search field placeholder
     */
    searchFieldPlaceholder?: IntlMessageShape;
    /**
     * Flag to show App Switcher when set to true
     */
    showAppSwitcher?: boolean;
    /**
     * Array of items to be displayed in App Switcher menu
     */
    appSwitcherItems?: AppSwitcherItems;
    /**
     * Use Okta auth info
     */
    useAuthInfo?: boolean;
    /**
     * Flag to show Help dropdown when set to true
     */
    showHelp?: boolean;
    /**
     * The link path for the help page
     */
    helpUrl?: IntlMessageShape | LinkPropTypes;
    /**
     * Help popover items
     */
    helpPopoverItems?: unknown[];
    /**
     * Map to resolve callbacks on avatar links
     */
    callbackMap?: Record<string, unknown>;
    /**
     * Text displayed on footer link in AppSwitcher
     */
    appSwitcherFooterText?: IntlMessageShape;
    /**
     * URL to which footer link in AppSwitcher leads
     */
    appSwitcherFooterUrl?: IntlMessageShape;
    /**
     * Callback which will be triggered when footer link in AppSwitcher is clicked
     */
    onAppSwitcherFooterClick?: (event: React.SyntheticEvent) => void;
    /**
     * Enables search field in AppSwitcher if the number of items equals or is above `appSwitcherCollapsibleGroupsThreshold` value
     */
    appSwitcherSearchEnabled?: boolean;
    /**
     * Number of items from which the groups in AppSwitcher are collapsible and the search is displayed
     */
    appSwitcherCollapsibleGroupsThreshold?: number;
    /**
     * Prop to specify if the footer in AppSwitcher should be hidden or not
     */
    appSwitcherHideFooter?: boolean;
    /**
     * Routes to be rendered in burger menu (for breakpoints lower than desktop)
     */
    burgerMenuRoutes?: Route[];
};
export declare const applicationHeaderPropTypes: WeakValidationMap<ApplicationHeaderPropTypes>;
