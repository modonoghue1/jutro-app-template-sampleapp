/** @typedef {typeof TooltipIcon.propTypes} TooltipIconPropTypes
 * @extends React.Component<PropTypes.InferProps<TooltipIconPropTypes>> */
export class TooltipIcon extends React.Component<PropTypes.InferProps<{
    /**
     * Positions of the tooltip relative to its reference element (icon)
     */
    placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
    /**
     * Additional class names for component.
     */
    className: PropTypes.Requireable<string>;
    /**
     * Message props(error message/aria-label)
     */
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        showTooltip: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    /**
     * Determines the order of flipping of tooltip, i.e. which placements to prefer if a certain placement cannot be used
     */
    flipBehavior: PropTypes.Requireable<any[]>;
    /**
     * Information from Field Component to the Tooltip Icon about the whole label position
     */
    labelPosition: PropTypes.Requireable<string>;
    /**
     * Information from Field Component. If true, label is displayed inline
     */
    showInlineLabel: PropTypes.Requireable<boolean>;
    text: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    link: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    renderContent: PropTypes.Requireable<(...args: any[]) => any>; /**
     * Base tooltip props, include text, title, link and href properties.
     */
    /**
     * Used to identify the component. Referenced to find it in the document tree
     */
    id: PropTypes.Validator<string>;
    /**
     * Icon to be displayed
     */
    icon: PropTypes.Requireable<string>;
}>, any, any> {
    static propTypes: {
        /**
         * Positions of the tooltip relative to its reference element (icon)
         */
        placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
        /**
         * Additional class names for component.
         */
        className: PropTypes.Requireable<string>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            showTooltip: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Determines the order of flipping of tooltip, i.e. which placements to prefer if a certain placement cannot be used
         */
        flipBehavior: PropTypes.Requireable<any[]>;
        /**
         * Information from Field Component to the Tooltip Icon about the whole label position
         */
        labelPosition: PropTypes.Requireable<string>;
        /**
         * Information from Field Component. If true, label is displayed inline
         */
        showInlineLabel: PropTypes.Requireable<boolean>;
        text: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        link: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        renderContent: PropTypes.Requireable<(...args: any[]) => any>; /**
         * Base tooltip props, include text, title, link and href properties.
         */
        /**
         * Used to identify the component. Referenced to find it in the document tree
         */
        id: PropTypes.Validator<string>;
        /**
         * Icon to be displayed
         */
        icon: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        icon: string;
    };
    constructor(props: any);
    iconRef: React.RefObject<any>;
    /**
     * Handles clicking outside
     * @param {Event} event
     */
    handleClickOutside: (event: Event) => void;
    /**
     * getOpenIcon
     * @param {string} icon
     * @returns {string}
     */
    getOpenIcon: (icon: string) => string;
    /**
     * getClosedIcon
     * @param {string} icon
     * @returns {string}
     */
    getClosedIcon: (icon: string) => string;
    setClosedIcon: () => Promise<void>;
    setOpenIcon: () => Promise<void>;
    /**
     * toggleTooltip
     * @param {Event} evt
     */
    toggleTooltip: (evt: Event) => void;
    hideTooltip: () => void;
    /**
     * Returns accessibility properties for tooltip icon button
     *
     * @param {Function} translator function used to translate the message
     * @returns {object} object containing accessibility properties
     */
    getAccessibilityProperties: (translator: Function) => object;
    /**
     * Render tooltip icon
     *
     * @param {Function} translator function to translate strings
     * @returns {React.ReactElement} tooltip icon
     */
    renderComponent: (translator: Function) => React.ReactElement;
    tooltip: any;
}
export type TooltipIconPropTypes = typeof TooltipIcon.propTypes;
import PropTypes from "prop-types";
import React from "react";
