/**
 * DropdownMenuLink
 *
 * @type {React.FC<DropdownMenuLinkProps>}
 *
 * @metadataType action
 */
export const DropdownMenuLink: React.FC<DropdownMenuLinkProps>;
export type DropdownMenuLinkProps = {
    /**
     * Used to identify dropdown menu link component.
     */
    id?: string | undefined;
    /**
     * Internal link.
     */
    to?: IntlToShape | undefined;
    /**
     * External link.
     */
    href?: IntlMessageShape | undefined;
    /**
     * The class name of the link.
     */
    className?: string | undefined;
    /**
     * If `true`, this link is disabled
     */
    disabled?: boolean | undefined;
    /**
     * On link click event handler
     */
    onClick?: Function | undefined;
};
import React from "react";
import { IntlToShape } from "@jutro/prop-types/src/toShape";
import { IntlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
