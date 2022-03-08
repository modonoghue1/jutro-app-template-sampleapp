/**
 * The `AccordionCard` component offers Card-like behavior inside an `Accordion`. It accepts
 * most of the same properties as Card (except 'isOpen' and 'onToggleOpen' which is managed
 * by the containing Accordion).
 *
 * @example
 * <Accordion>
 *     <AccordionCard id="card1">Card 1 Content</AccordionCard>
 *     <AccordionCard id="card2">Card 2 Content</AccordionCard>
 * </Accordion>
 *
 * @typedef {typeof AccordionCard.propTypes} AccordionCardPropTypes
 * @extends PureComponent<PropTypes.InferProps<AccordionCardPropTypes>>
 *
 * @metadataType container
 */
export class AccordionCard extends React.PureComponent<PropTypes.InferProps<{
    /**
     * Used to identify header.
     */
    id: PropTypes.Validator<string>;
    /**
     * Show chevron in header
     */
    chevron: PropTypes.Requireable<boolean>;
    /**
     * Position of chevron
     */
    chevronAlignment: PropTypes.Requireable<string>;
    /**
     * Additional styles for whole card
     */
    className: PropTypes.Requireable<string>;
    /**
     * Additional styles for Collapse
     */
    collapseClassName: PropTypes.Requireable<string>;
    /**
     * Additional styles for card body inside Collapse
     */
    cardBodyClassName: PropTypes.Requireable<string>;
    /**
     * Additional styles for card header
     */
    cardHeadingClassName: PropTypes.Requireable<string>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * Indicates if there is an error within the card contents
     */
    errorState: PropTypes.Requireable<boolean>;
    /**
     *  property to render title for header
     */
    title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Callback to render header to be displayed in the Accordion
     */
    renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Indicates if the card should be collapsible
     */
    isCollapsible: PropTypes.Requireable<boolean>;
}>, any, any> {
    static propTypes: {
        /**
         * Used to identify header.
         */
        id: PropTypes.Validator<string>;
        /**
         * Show chevron in header
         */
        chevron: PropTypes.Requireable<boolean>;
        /**
         * Position of chevron
         */
        chevronAlignment: PropTypes.Requireable<string>;
        /**
         * Additional styles for whole card
         */
        className: PropTypes.Requireable<string>;
        /**
         * Additional styles for Collapse
         */
        collapseClassName: PropTypes.Requireable<string>;
        /**
         * Additional styles for card body inside Collapse
         */
        cardBodyClassName: PropTypes.Requireable<string>;
        /**
         * Additional styles for card header
         */
        cardHeadingClassName: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Indicates if there is an error within the card contents
         */
        errorState: PropTypes.Requireable<boolean>;
        /**
         *  property to render title for header
         */
        title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Callback to render header to be displayed in the Accordion
         */
        renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Indicates if the card should be collapsible
         */
        isCollapsible: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        chevron: boolean;
        chevronAlignment: string;
        errorState: boolean;
        isCollapsible: boolean;
    };
    static contextType: React.Context<import("@jutro/locale").Translator>;
    constructor(props: PropTypes.InferProps<{
        /**
         * Used to identify header.
         */
        id: PropTypes.Validator<string>;
        /**
         * Show chevron in header
         */
        chevron: PropTypes.Requireable<boolean>;
        /**
         * Position of chevron
         */
        chevronAlignment: PropTypes.Requireable<string>;
        /**
         * Additional styles for whole card
         */
        className: PropTypes.Requireable<string>;
        /**
         * Additional styles for Collapse
         */
        collapseClassName: PropTypes.Requireable<string>;
        /**
         * Additional styles for card body inside Collapse
         */
        cardBodyClassName: PropTypes.Requireable<string>;
        /**
         * Additional styles for card header
         */
        cardHeadingClassName: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Indicates if there is an error within the card contents
         */
        errorState: PropTypes.Requireable<boolean>;
        /**
         *  property to render title for header
         */
        title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Callback to render header to be displayed in the Accordion
         */
        renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Indicates if the card should be collapsible
         */
        isCollapsible: PropTypes.Requireable<boolean>;
    }> | Readonly<PropTypes.InferProps<{
        /**
         * Used to identify header.
         */
        id: PropTypes.Validator<string>;
        /**
         * Show chevron in header
         */
        chevron: PropTypes.Requireable<boolean>;
        /**
         * Position of chevron
         */
        chevronAlignment: PropTypes.Requireable<string>;
        /**
         * Additional styles for whole card
         */
        className: PropTypes.Requireable<string>;
        /**
         * Additional styles for Collapse
         */
        collapseClassName: PropTypes.Requireable<string>;
        /**
         * Additional styles for card body inside Collapse
         */
        cardBodyClassName: PropTypes.Requireable<string>;
        /**
         * Additional styles for card header
         */
        cardHeadingClassName: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Indicates if there is an error within the card contents
         */
        errorState: PropTypes.Requireable<boolean>;
        /**
         *  property to render title for header
         */
        title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Callback to render header to be displayed in the Accordion
         */
        renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Indicates if the card should be collapsible
         */
        isCollapsible: PropTypes.Requireable<boolean>;
    }>>);
    constructor(props: PropTypes.InferProps<{
        /**
         * Used to identify header.
         */
        id: PropTypes.Validator<string>;
        /**
         * Show chevron in header
         */
        chevron: PropTypes.Requireable<boolean>;
        /**
         * Position of chevron
         */
        chevronAlignment: PropTypes.Requireable<string>;
        /**
         * Additional styles for whole card
         */
        className: PropTypes.Requireable<string>;
        /**
         * Additional styles for Collapse
         */
        collapseClassName: PropTypes.Requireable<string>;
        /**
         * Additional styles for card body inside Collapse
         */
        cardBodyClassName: PropTypes.Requireable<string>;
        /**
         * Additional styles for card header
         */
        cardHeadingClassName: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Indicates if there is an error within the card contents
         */
        errorState: PropTypes.Requireable<boolean>;
        /**
         *  property to render title for header
         */
        title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Callback to render header to be displayed in the Accordion
         */
        renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Indicates if the card should be collapsible
         */
        isCollapsible: PropTypes.Requireable<boolean>;
    }>, context: any);
    translator: any;
    toggleFunc: (onToggleOpen: any) => void;
    getHeadingAccessibilityProperties: (isOpen: any) => {
        'aria-controls': any;
        'aria-expanded': any;
    };
    getCardContentAccessibilityProperties: () => {
        'aria-live': string;
    };
    handleClick: (evt: any, toggleAccordionOpen: any) => void;
    handleFocus: () => void;
    handleBlur: () => void;
    renderBody(): ((string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray) & (boolean | React.ReactChild | React.ReactFragment | React.ReactPortal)) | null | undefined;
    renderAccordionCard: (context: any) => JSX.Element;
}
/**
 * The `AccordionCard` component offers Card-like behavior inside an `Accordion`. It accepts
 * most of the same properties as Card (except 'isOpen' and 'onToggleOpen' which is managed
 * by the containing Accordion).
 */
export type AccordionCardPropTypes = typeof AccordionCard.propTypes;
import PropTypes from "prop-types";
import React from "react";
