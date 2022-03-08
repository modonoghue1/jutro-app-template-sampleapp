/**
 * The `Accordion` component is used to surround a set of `Card` components so that the user can open or close them.
 *
 * @typedef {typeof Accordion.propTypes} AccordionPropTypes
 * @extends Component<PropTypes.InferProps<AccordionPropTypes>>
 *
 * @metadataType container
 */
export class Accordion extends React.Component<PropTypes.InferProps<{
    /**
     * Used to identify accordion
     */
    id: PropTypes.Requireable<string>;
    /**
     * An array containing the expanded accordion ids
     */
    accordionStates: PropTypes.Requireable<any[]>;
    /**
     * Changes the font weight of the accordion header, set to `true` by default (bold)
     */
    boldFont: PropTypes.Requireable<boolean>;
    /**
     * CSS class name for this component
     */
    className: PropTypes.Requireable<string>;
    /**
     * The children elements to render inside this component
     */
    children: PropTypes.Requireable<React.ReactElement<Record<string, unknown>, React.ComponentType<Record<string, unknown>>> | React.ReactElement<Record<string, unknown>, React.ComponentType<Record<string, unknown>>>[]>;
    /**
     * Optional flag indicating whether other accordions should be collapsed when this one is expanded
     */
    closeOthers: PropTypes.Requireable<boolean>;
    /**
     * The optional id of the accordion to be opened by default
     */
    defaultOpenedId: PropTypes.Requireable<string>;
    /**
     * Property to make accordion disabled
     */
    disabled: PropTypes.Requireable<boolean>;
    /**
     * Shows the accordion borders when true, set to `true` by default
     */
    showFrame: PropTypes.Requireable<boolean>;
    /**
     * A callback function for querying the list of expanded accordions
     */
    onUpdateAccordionStates: PropTypes.Requireable<(...args: any[]) => any>;
}>, any, any> {
    static propTypes: {
        /**
         * Used to identify accordion
         */
        id: PropTypes.Requireable<string>;
        /**
         * An array containing the expanded accordion ids
         */
        accordionStates: PropTypes.Requireable<any[]>;
        /**
         * Changes the font weight of the accordion header, set to `true` by default (bold)
         */
        boldFont: PropTypes.Requireable<boolean>;
        /**
         * CSS class name for this component
         */
        className: PropTypes.Requireable<string>;
        /**
         * The children elements to render inside this component
         */
        children: PropTypes.Requireable<React.ReactElement<Record<string, unknown>, React.ComponentType<Record<string, unknown>>> | React.ReactElement<Record<string, unknown>, React.ComponentType<Record<string, unknown>>>[]>;
        /**
         * Optional flag indicating whether other accordions should be collapsed when this one is expanded
         */
        closeOthers: PropTypes.Requireable<boolean>;
        /**
         * The optional id of the accordion to be opened by default
         */
        defaultOpenedId: PropTypes.Requireable<string>;
        /**
         * Property to make accordion disabled
         */
        disabled: PropTypes.Requireable<boolean>;
        /**
         * Shows the accordion borders when true, set to `true` by default
         */
        showFrame: PropTypes.Requireable<boolean>;
        /**
         * A callback function for querying the list of expanded accordions
         */
        onUpdateAccordionStates: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        closeOthers: boolean;
        onUpdateAccordionStates: (...args: any[]) => void;
        showFrame: boolean;
        boldFont: boolean;
        disabled: boolean;
    };
    /**
     * Sets up the state for the `Accordions` to stores the list of `openedAccordions`.  Initially it is either an
     * empty array or an array with the `defaultOpenedId` prop inside.
     *
     * @param {object} props - The initial set of props provided when the component is created
     */
    constructor(props: object);
    /**
     * Returns whether or not the `Accordion` with the given id is expanded by looking to see if that id is in the
     * list of `openedAccordions`.
     *
     * @param {string} accordionId - The id of the `Accordion` whose expanded state is desired
     * @returns {boolean} - True if the `Accordion` is expanded, false otherwise
     */
    isAccordionOpen: (accordionId: string) => boolean;
    /**
     * Toggles the expand state of the `Accordion` with the given id.  First, look up to see if the `openedAccordions`
     * list contains the `accordionId`.  If it does, then remove it otherwise add it to the list, either at the end
     * when `closeOthers` is `false` or at the first position when `closeOthers` is `true`.
     *
     * @param {string} accordionId - The id of the `Accordion` being toggled
     */
    toggleAccordionOpen: (accordionId: string) => void;
}
/**
 * The `Accordion` component is used to surround a set of `Card` components so that the user can open or close them.
 */
export type AccordionPropTypes = typeof Accordion.propTypes;
import PropTypes from "prop-types";
import React from "react";
