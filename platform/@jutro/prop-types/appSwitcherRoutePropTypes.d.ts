import React, { Requireable } from 'react';
import { IntlMessageShape } from './intlMessageShape';
import { IntlToShape } from './toShape';
export declare type Separator = {
    separator?: boolean;
};
export declare type AppSwitcherApp = {
    /**
     * Title that will be displayed below the icon
     */
    title: IntlMessageShape;
    /**
     * Internal path to the application
     */
    to?: IntlToShape;
    /**
     * External path
     */
    href?: IntlMessageShape;
    /**
     * Source of the image
     */
    imageUrl?: string;
    /**
     * Alternative text of the image
     */
    imageAlt?: string;
    /**
     * Flag for the exact path matching in react-router
     */
    exact?: boolean;
    /**
     * Callback on item click event handler
     */
    onClick?: (event: React.SyntheticEvent) => void;
    /**
     * Flag to indicate if the current item is focused
     */
    isFocused?: boolean;
};
export declare type AppSwitcherGroup = {
    /**
     * Title of the application group
     */
    title: IntlMessageShape;
    /**
     * Array of AppSwitcher routes
     */
    items: AppSwitcherApp[];
    /**
     * Default state for the expandable application group
     */
    isInitiallyCollapsed?: boolean;
};
export declare type AppSwitcherItem = AppSwitcherApp | AppSwitcherGroup | Separator;
export declare type AppSwitcherItems = AppSwitcherItem[];
export declare const separatorPropType: Requireable<Separator>;
export declare const appSwitcherRoutePropTypes: Requireable<AppSwitcherApp>;
export declare const appSwitcherRouteGroupPropTypes: Requireable<AppSwitcherGroup>;
export declare const appSwitcherItemsObject: Requireable<AppSwitcherItems>;
