export const PORTRAIT_LAYOUT: "portrait";
export const LANDSCAPE_LAYOUT: "landscape";
export const LAYOUT_PROP_TYPE: PropTypes.Requireable<string>;
/**
 * Renders a radio button displayed as a card.
 * @typedef {typeof RadioButtonCard.propTypes} RadioButtonCardPropTypes
 * @extends Component<PropTypes.InferProps<RadioButtonCardPropTypes>>
 */
export class RadioButtonCard extends React.Component<PropTypes.InferProps<{
    /**
     * Radio button code.
     */
    code: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Name displayed below the radio button.
     */
    name: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Secondary label displayed below the name.
     */
    secondaryLabel: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Money amount
     */
    moneyAmount: PropTypes.Requireable<number>;
    /**
     * TabIndex of the Radio Button
     */
    tabIndex: PropTypes.Requireable<number>;
    /**
     * Currency code
     */
    currency: PropTypes.Requireable<string>;
    /**
     * Cards layout
     */
    layout: PropTypes.Requireable<string>;
}>, any, any> {
    static propTypes: {
        /**
         * Radio button code.
         */
        code: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Name displayed below the radio button.
         */
        name: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Secondary label displayed below the name.
         */
        secondaryLabel: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Money amount
         */
        moneyAmount: PropTypes.Requireable<number>;
        /**
         * TabIndex of the Radio Button
         */
        tabIndex: PropTypes.Requireable<number>;
        /**
         * Currency code
         */
        currency: PropTypes.Requireable<string>;
        /**
         * Cards layout
         */
        layout: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        layout: string;
    };
    constructor(props: any);
    radioRef: React.RefObject<any>;
    handleClick: () => void;
    handleKeyPress: (event: KeyboardEvent) => void;
    handleBlur: () => void;
    setActive(active: any): void;
    activateCard: (e: any) => void;
    deactivateCard: (e: any) => void;
}
/**
 * Renders a radio button displayed as a card.
 */
export type RadioButtonCardPropTypes = typeof RadioButtonCard.propTypes;
import PropTypes from "prop-types";
import React from "react";
