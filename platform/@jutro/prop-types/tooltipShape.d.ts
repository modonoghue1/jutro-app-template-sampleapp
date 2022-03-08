/// <reference types="react" />
import PropTypes from 'prop-types';
export declare const placementOptions: readonly ["top", "top-start", "top-end", "right", "right-start", "right-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "auto", "auto-start", "auto-end"];
export declare const tooltipBaseProps: {
    /**
     * Text to be rendered inside the tooltip
     */
    text: import("react").Requireable<import("./intlMessageShape").IntlMessageShape>;
    /**
     * Title to be rendered inside the tooltip
     */
    title: import("react").Requireable<import("./intlMessageShape").IntlMessageShape>;
    /**
     * Text of link to be rendered inside tooltip
     */
    link: import("react").Requireable<import("./intlMessageShape").IntlMessageShape>;
    /**
     * Url to be opened when user clicks on link text
     */
    href: import("react").Requireable<import("./intlMessageShape").IntlMessageShape>;
    /**
     * Function to render custom content in the tooltip. Overrides default content.
     * When provided `link`, `href`, `text` and `title` properties are ignored.
     */
    renderContent: PropTypes.Requireable<(...args: any[]) => any>;
};
export declare const tooltipShape: PropTypes.Requireable<PropTypes.InferProps<{
    /**
     * Positions of the tooltip relative to its reference element
     */
    placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
    /**
     * Text to be rendered inside the tooltip
     */
    text: import("react").Requireable<import("./intlMessageShape").IntlMessageShape>;
    /**
     * Title to be rendered inside the tooltip
     */
    title: import("react").Requireable<import("./intlMessageShape").IntlMessageShape>;
    /**
     * Text of link to be rendered inside tooltip
     */
    link: import("react").Requireable<import("./intlMessageShape").IntlMessageShape>;
    /**
     * Url to be opened when user clicks on link text
     */
    href: import("react").Requireable<import("./intlMessageShape").IntlMessageShape>;
    /**
     * Function to render custom content in the tooltip. Overrides default content.
     * When provided `link`, `href`, `text` and `title` properties are ignored.
     */
    renderContent: PropTypes.Requireable<(...args: any[]) => any>;
}>>;
/**
 * Configuration options for tooltips nested within other components
 */
export declare const nestedTooltipShape: PropTypes.Requireable<PropTypes.InferProps<{
    /**
     * Used to identify the component. Referenced to find it in the document tree
     */
    id: PropTypes.Requireable<string>;
    /**
     * Icon to be displayed
     */
    icon: PropTypes.Requireable<string>;
    /**
     * Positions of the tooltip relative to its reference element
     */
    placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
    /**
     * Text to be rendered inside the tooltip
     */
    text: import("react").Requireable<import("./intlMessageShape").IntlMessageShape>;
    /**
     * Title to be rendered inside the tooltip
     */
    title: import("react").Requireable<import("./intlMessageShape").IntlMessageShape>;
    /**
     * Text of link to be rendered inside tooltip
     */
    link: import("react").Requireable<import("./intlMessageShape").IntlMessageShape>;
    /**
     * Url to be opened when user clicks on link text
     */
    href: import("react").Requireable<import("./intlMessageShape").IntlMessageShape>;
    /**
     * Function to render custom content in the tooltip. Overrides default content.
     * When provided `link`, `href`, `text` and `title` properties are ignored.
     */
    renderContent: PropTypes.Requireable<(...args: any[]) => any>;
}>>;
