/**
 * A dropdown menu where you can add your actions to each item.
 *
 * @type {React.FC<PropTypes.InferProps<typeof DropDownMenuPropTypes>>}
 *
 * @metadataType container
 */
export const DropdownMenu: React.FC<PropTypes.InferProps<typeof DropDownMenuPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace DropDownMenuPropTypes {
    const id: PropTypes.Validator<string>;
    const renderTrigger: PropTypes.Requireable<(...args: any[]) => any>;
    const onRenderTrigger: PropTypes.Validator<any>;
    const isOpen: PropTypes.Requireable<boolean>;
    const dropUp: PropTypes.Requireable<boolean>;
    const alignRight: PropTypes.Requireable<boolean>;
    const className: PropTypes.Requireable<string>;
    const menuClassName: PropTypes.Requireable<string>;
    const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    const focused: PropTypes.Requireable<boolean>;
    const openMenuId: PropTypes.Requireable<string>;
    const onMenuOpen: PropTypes.Requireable<(...args: any[]) => any>;
    const onMenuClose: PropTypes.Requireable<(...args: any[]) => any>;
    const keepContext: PropTypes.Requireable<boolean>;
}
export {};
