/**
 * Adds a tooltip to the parent component.
 *
 * @typedef {typeof Tooltip.propTypes} TooltipPropTypes
 * @extends React.Component<PropTypes.InferProps<TooltipPropTypes>>
 */
export class Tooltip extends React.Component<PropTypes.InferProps<{
    /**
     * Used to identify the component. referenced to find it in the document tree
     */
    id: PropTypes.Validator<string>;
    /**
     * Determines if follows the user's mouse cursor
     */
    followCursor: PropTypes.Requireable<boolean>;
    /**
     * Positions of the tooltip relative to its reference element
     */
    placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
    /**
     *  The events (each separated by a space) which cause tooltip to show
     */
    trigger: PropTypes.Requireable<string>;
    /**
     *  Duration of the CSS transition animation in ms
     */
    duration: PropTypes.Requireable<number | any[]>;
    /**
     *  Determines if the tooltip should hide if a mousedown event was fired outside of it
     */
    hideOnClick: PropTypes.Requireable<string | boolean>;
    /**
     * The type of transition animation
     */
    animation: PropTypes.Requireable<string>;
    /**
     * Delay in ms once a trigger event is fired before a tooltip shows or hides
     */
    delay: PropTypes.Requireable<number | any[]>;
    /**
     * Ensures the tooltip stays stuck to its reference element if it moves around or changes size while showing
     */
    sticky: PropTypes.Requireable<string | boolean>;
    /**
     * Determines the order of flipping, i.e. which placements to prefer if a certain placement cannot be used
     */
    flipBehavior: PropTypes.Requireable<any[]>;
    /**
     * Show tooltip when page is loaded
     */
    showOnInit: PropTypes.Requireable<boolean>;
}>, any, any> {
    static propTypes: {
        /**
         * Used to identify the component. referenced to find it in the document tree
         */
        id: PropTypes.Validator<string>;
        /**
         * Determines if follows the user's mouse cursor
         */
        followCursor: PropTypes.Requireable<boolean>;
        /**
         * Positions of the tooltip relative to its reference element
         */
        placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
        /**
         *  The events (each separated by a space) which cause tooltip to show
         */
        trigger: PropTypes.Requireable<string>;
        /**
         *  Duration of the CSS transition animation in ms
         */
        duration: PropTypes.Requireable<number | any[]>;
        /**
         *  Determines if the tooltip should hide if a mousedown event was fired outside of it
         */
        hideOnClick: PropTypes.Requireable<string | boolean>;
        /**
         * The type of transition animation
         */
        animation: PropTypes.Requireable<string>;
        /**
         * Delay in ms once a trigger event is fired before a tooltip shows or hides
         */
        delay: PropTypes.Requireable<number | any[]>;
        /**
         * Ensures the tooltip stays stuck to its reference element if it moves around or changes size while showing
         */
        sticky: PropTypes.Requireable<string | boolean>;
        /**
         * Determines the order of flipping, i.e. which placements to prefer if a certain placement cannot be used
         */
        flipBehavior: PropTypes.Requireable<any[]>;
        /**
         * Show tooltip when page is loaded
         */
        showOnInit: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        followCursor: boolean;
        placement: string;
        trigger: string;
        duration: number[];
        hideOnClick: boolean;
        animation: string;
        delay: number[];
        sticky: boolean;
        flipBehavior: string[];
        showOnInit: boolean;
    };
    static nonConfigurableTippyProps: {
        animation: string;
        arrow: boolean;
        inertia: boolean;
        theme: string;
    };
    static contextType: React.Context<import("@jutro/locale").Translator>;
    constructor(props: PropTypes.InferProps<{
        /**
         * Used to identify the component. referenced to find it in the document tree
         */
        id: PropTypes.Validator<string>;
        /**
         * Determines if follows the user's mouse cursor
         */
        followCursor: PropTypes.Requireable<boolean>;
        /**
         * Positions of the tooltip relative to its reference element
         */
        placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
        /**
         *  The events (each separated by a space) which cause tooltip to show
         */
        trigger: PropTypes.Requireable<string>;
        /**
         *  Duration of the CSS transition animation in ms
         */
        duration: PropTypes.Requireable<number | any[]>;
        /**
         *  Determines if the tooltip should hide if a mousedown event was fired outside of it
         */
        hideOnClick: PropTypes.Requireable<string | boolean>;
        /**
         * The type of transition animation
         */
        animation: PropTypes.Requireable<string>;
        /**
         * Delay in ms once a trigger event is fired before a tooltip shows or hides
         */
        delay: PropTypes.Requireable<number | any[]>;
        /**
         * Ensures the tooltip stays stuck to its reference element if it moves around or changes size while showing
         */
        sticky: PropTypes.Requireable<string | boolean>;
        /**
         * Determines the order of flipping, i.e. which placements to prefer if a certain placement cannot be used
         */
        flipBehavior: PropTypes.Requireable<any[]>;
        /**
         * Show tooltip when page is loaded
         */
        showOnInit: PropTypes.Requireable<boolean>;
    }> | Readonly<PropTypes.InferProps<{
        /**
         * Used to identify the component. referenced to find it in the document tree
         */
        id: PropTypes.Validator<string>;
        /**
         * Determines if follows the user's mouse cursor
         */
        followCursor: PropTypes.Requireable<boolean>;
        /**
         * Positions of the tooltip relative to its reference element
         */
        placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
        /**
         *  The events (each separated by a space) which cause tooltip to show
         */
        trigger: PropTypes.Requireable<string>;
        /**
         *  Duration of the CSS transition animation in ms
         */
        duration: PropTypes.Requireable<number | any[]>;
        /**
         *  Determines if the tooltip should hide if a mousedown event was fired outside of it
         */
        hideOnClick: PropTypes.Requireable<string | boolean>;
        /**
         * The type of transition animation
         */
        animation: PropTypes.Requireable<string>;
        /**
         * Delay in ms once a trigger event is fired before a tooltip shows or hides
         */
        delay: PropTypes.Requireable<number | any[]>;
        /**
         * Ensures the tooltip stays stuck to its reference element if it moves around or changes size while showing
         */
        sticky: PropTypes.Requireable<string | boolean>;
        /**
         * Determines the order of flipping, i.e. which placements to prefer if a certain placement cannot be used
         */
        flipBehavior: PropTypes.Requireable<any[]>;
        /**
         * Show tooltip when page is loaded
         */
        showOnInit: PropTypes.Requireable<boolean>;
    }>>);
    constructor(props: PropTypes.InferProps<{
        /**
         * Used to identify the component. referenced to find it in the document tree
         */
        id: PropTypes.Validator<string>;
        /**
         * Determines if follows the user's mouse cursor
         */
        followCursor: PropTypes.Requireable<boolean>;
        /**
         * Positions of the tooltip relative to its reference element
         */
        placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
        /**
         *  The events (each separated by a space) which cause tooltip to show
         */
        trigger: PropTypes.Requireable<string>;
        /**
         *  Duration of the CSS transition animation in ms
         */
        duration: PropTypes.Requireable<number | any[]>;
        /**
         *  Determines if the tooltip should hide if a mousedown event was fired outside of it
         */
        hideOnClick: PropTypes.Requireable<string | boolean>;
        /**
         * The type of transition animation
         */
        animation: PropTypes.Requireable<string>;
        /**
         * Delay in ms once a trigger event is fired before a tooltip shows or hides
         */
        delay: PropTypes.Requireable<number | any[]>;
        /**
         * Ensures the tooltip stays stuck to its reference element if it moves around or changes size while showing
         */
        sticky: PropTypes.Requireable<string | boolean>;
        /**
         * Determines the order of flipping, i.e. which placements to prefer if a certain placement cannot be used
         */
        flipBehavior: PropTypes.Requireable<any[]>;
        /**
         * Show tooltip when page is loaded
         */
        showOnInit: PropTypes.Requireable<boolean>;
    }>, context: any);
    get translator(): any;
    onMount: (instance: any) => void;
    onHide: (instance: any) => void;
    /**
     * Renders Tooltip
     * @returns {React.ReactElement}
     */
    renderTooltip: () => React.ReactElement;
}
/**
 * Adds a tooltip to the parent component.
 */
export type TooltipPropTypes = typeof Tooltip.propTypes;
import PropTypes from "prop-types";
import React from "react";
