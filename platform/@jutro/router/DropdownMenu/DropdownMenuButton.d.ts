/**
 * @typedef DropdownMenuButtonProps
 *
 * @prop {string} [id] Used to identify menu component.
 * @prop {React.ReactNode | intlMessageShape} buttonText Content to be rendered as the 'children' for the 'Button' component.
 * @prop {boolean} isOpen The prop that indicates if the menu is currently visible.
 * @prop {boolean} dropUp If `true`, the menu appears above the trigger component.
 * @prop {boolean} alignRight If `true`, menu items are aligned to the right edge of the menu.
 * @prop {string} menuClassName Override class for the inner menu of the dropdown menu
 */
/**
 * DropdownMenuButton
 *
 * @type {React.FC<DropdownMenuButtonProps>}
 *
 *  @metadataType action
 */
export const DropdownMenuButton: React.FC<DropdownMenuButtonProps>;
export type DropdownMenuButtonProps = {
    /**
     * Used to identify menu component.
     */
    id?: string | undefined;
    /**
     * Content to be rendered as the 'children' for the 'Button' component.
     */
    buttonText: React.ReactNode | React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * The prop that indicates if the menu is currently visible.
     */
    isOpen: boolean;
    /**
     * If `true`, the menu appears above the trigger component.
     */
    dropUp: boolean;
    /**
     * If `true`, menu items are aligned to the right edge of the menu.
     */
    alignRight: boolean;
    /**
     * Override class for the inner menu of the dropdown menu
     */
    menuClassName: string;
};
import React from "react";
