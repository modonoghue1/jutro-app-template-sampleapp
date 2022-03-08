/**
 * Content component that render inside tooltip
 *
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
export const TooltipContent: React.FC<PropTypes.InferProps<typeof propTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare const propTypes: {
    /**
     * Id for the tooltip content
     */
    id: PropTypes.Requireable<string>;
    /**
     * Class to customize the component
     */
    className: PropTypes.Requireable<string>;
    /**
     * Class to customize title
     */
    titleClass: PropTypes.Requireable<string>;
    /**
     * Class to customize text
     */
    textClass: PropTypes.Requireable<string>;
    /**
     * Class to customize link
     */
    linkClass: PropTypes.Requireable<string>;
    /**
     * Function to translate the content
     */
    translator: PropTypes.Requireable<(...args: any[]) => any>;
    text: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    link: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    renderContent: PropTypes.Requireable<(...args: any[]) => any>;
};
export {};
