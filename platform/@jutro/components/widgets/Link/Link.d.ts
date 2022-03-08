export const Link: React.MemoExoticComponent<React.ForwardRefExoticComponent<PropTypes.InferProps<{
    /**
     *  The children elements to render inside of the Link
     */
    children: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    /**
     * CSS class name for this component
     */
    className: PropTypes.Requireable<string>;
    /**
     * If `true`, this link is disabled
     */
    disabled: PropTypes.Requireable<boolean>;
    /**
     * Optional icon name
     */
    icon: PropTypes.Requireable<string>;
    /**
     * Indicates whether link located inside of paragraph
     */
    inline: PropTypes.Requireable<boolean>;
    /**
     * Where the icon is placed relative to the text
     */
    iconPosition: PropTypes.Requireable<string>;
    /**
     * Callback when link is clicked
     */
    onClick: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * The destination path when link is clicked.
     * Use this for paths internal to the application.
     */
    to: React.Requireable<import("@jutro/prop-types").IntlToShape>;
    /**
     * The destination path when link is clicked.
     * Use this for paths external to the application.
     */
    href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Where to display linked URL. Used only for external paths.
     */
    target: PropTypes.Requireable<string>;
    /**
     * Relationship of the linked URL. Used only for external paths.
     */
    rel: PropTypes.Requireable<string>;
    /**
     * CSS class name for the link text
     */
    textClassName: PropTypes.Requireable<string>;
    /**
     * CSS class name for element when it is active
     */
    activeClassName: PropTypes.Requireable<string>;
    /**
     * When true, the activeClassName will only be applied if location is matched exactly
     */
    exact: PropTypes.Requireable<boolean>;
    /**
     * Specific router history to use for navigation
     */
    history: PropTypes.Requireable<object>;
}>>>;
import PropTypes from "prop-types";
import React from "react";
