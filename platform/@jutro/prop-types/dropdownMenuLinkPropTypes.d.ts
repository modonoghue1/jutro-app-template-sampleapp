import React, { WeakValidationMap } from 'react';
import { IntlMessageShape } from './intlMessageShape';
import { IntlToShape } from './toShape';
export declare type DropdownMenuLinkPropTypes = {
    /**
     * Used to identify dropdown menu link component.
     */
    id?: string;
    /**
     * Internal link.
     */
    to?: IntlToShape;
    /**
     * External link.
     */
    href?: IntlMessageShape;
    /**
     * Specifies where to open the external link.
     */
    target?: string;
    /**
     * Specifies the relationship between the current and an external document.
     */
    rel?: string;
    /**
     * If `true`, this link is disabled
     */
    disabled?: boolean;
    /**
     * Callback supposed to be triggered when clicked in the context of menu
     */
    onMenuItemClick?: string | ((event: React.SyntheticEvent) => void);
    /**
     * If `true`, the link is considered as a currently active one
     */
    focused?: boolean;
    /**
     * The class name of the link
     */
    className?: string;
    /**
     * The class to give the link when it is active
     */
    activeClassName?: string;
    /**
     * If true, this link is visible.
     */
    visible?: boolean;
    /**
     * On link click event handler
     */
    onClick?: string | ((event: React.SyntheticEvent) => void);
    /**
     *  The children elements to render inside of the DropdownMenuLink
     */
    children?: IntlMessageShape | React.ReactNode;
};
export declare const dropdownMenuLinkPropTypes: WeakValidationMap<DropdownMenuLinkPropTypes>;
