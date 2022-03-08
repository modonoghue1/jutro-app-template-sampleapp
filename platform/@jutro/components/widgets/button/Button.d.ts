export const buttonTypes: string[];
export const buttonActionTypes: string[];
export const buttonSizes: string[];
export const buttonIconPositions: string[];
export const Button: React.MemoExoticComponent<React.ForwardRefExoticComponent<PropTypes.InferProps<{
    /**
     * Optional string id for button
     */
    id: PropTypes.Requireable<string>;
    /**
     *  The children elements to render inside of the Button
     */
    children: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    /**
     * CSS class name for this component
     */
    className: PropTypes.Requireable<string>;
    /**
     * CSS class name for icon
     */
    iconClassName: PropTypes.Requireable<string>;
    /**
     * If `true`, this button is disabled
     */
    disabled: PropTypes.Requireable<boolean>;
    /**
     * If `true`, the button expands to the available width
     */
    fullWidth: PropTypes.Requireable<boolean>;
    /**
     * Optional icon name
     */
    icon: PropTypes.Requireable<string>;
    /**
     * Where the icon is placed relative to the text
     */
    iconPosition: PropTypes.Requireable<string>;
    /**
     * Callback when button is clicked
     */
    onClick: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Callback when want to wrap button content
     */
    renderContent: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Allows you to select the smaller or larger variant
     */
    size: PropTypes.Requireable<string>;
    /**
     * Determines the display variety (filled, outlined, text)
     */
    type: PropTypes.Requireable<string>;
    /**
     *  if this prop is used an `<a>` tag will be used instead of `<button>`
     *  this will be the href passed to the `<a>` tag used.
     */
    href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Type of action button performs
     */
    actionType: PropTypes.Requireable<string>;
    /**
     * React.ForwardedRef or React.MutableRefObject access prop
     */
    ref: PropTypes.Requireable<object>;
}>>>;
import PropTypes from "prop-types";
import React from "react";
