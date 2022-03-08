/**
 * Displays an address from a data object in read-only mode.
 *
 * @typedef {typeof AddressDisplay.propTypes} AddressDisplayPropTypes
 * @extends PureComponent<PropTypes.InferProps<AddressDisplayPropTypes>>
 *
 * @metadataType element
 */
export class AddressDisplay extends React.PureComponent<PropTypes.InferProps<{
    /**
     * The address to display
     */
    address: PropTypes.Validator<object>;
    /**
     * The array of address fields to display, for example ['addressLine1', 'addressLine2',
     * 'addressLine3', 'city', 'state', 'postalCode']
     */
    fields: PropTypes.Requireable<(string | null | undefined)[]>;
    /**
     * CSS class name for this component
     */
    className: PropTypes.Requireable<string>;
}>, any, any> {
    /**
     * @typedef {object} AddressDisplay.propTypes
     * @prop {object} address - The address to display
     * @prop {Array<string>} fields - The array of address fields to display
     */
    static propTypes: {
        /**
         * The address to display
         */
        address: PropTypes.Validator<object>;
        /**
         * The array of address fields to display, for example ['addressLine1', 'addressLine2',
         * 'addressLine3', 'city', 'state', 'postalCode']
         */
        fields: PropTypes.Requireable<(string | null | undefined)[]>;
        /**
         * CSS class name for this component
         */
        className: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        fields: string[];
    };
    constructor(props: PropTypes.InferProps<{
        /**
         * The address to display
         */
        address: PropTypes.Validator<object>;
        /**
         * The array of address fields to display, for example ['addressLine1', 'addressLine2',
         * 'addressLine3', 'city', 'state', 'postalCode']
         */
        fields: PropTypes.Requireable<(string | null | undefined)[]>;
        /**
         * CSS class name for this component
         */
        className: PropTypes.Requireable<string>;
    }> | Readonly<PropTypes.InferProps<{
        /**
         * The address to display
         */
        address: PropTypes.Validator<object>;
        /**
         * The array of address fields to display, for example ['addressLine1', 'addressLine2',
         * 'addressLine3', 'city', 'state', 'postalCode']
         */
        fields: PropTypes.Requireable<(string | null | undefined)[]>;
        /**
         * CSS class name for this component
         */
        className: PropTypes.Requireable<string>;
    }>>);
    constructor(props: PropTypes.InferProps<{
        /**
         * The address to display
         */
        address: PropTypes.Validator<object>;
        /**
         * The array of address fields to display, for example ['addressLine1', 'addressLine2',
         * 'addressLine3', 'city', 'state', 'postalCode']
         */
        fields: PropTypes.Requireable<(string | null | undefined)[]>;
        /**
         * CSS class name for this component
         */
        className: PropTypes.Requireable<string>;
    }>, context: any);
    /**
     * Renders the list of fields.
     *
     * @returns {Array<React.ReactElement>} - The list of fields
     */
    renderFields(): Array<React.ReactElement>;
}
/**
 * Displays an address from a data object in read-only mode.
 */
export type AddressDisplayPropTypes = typeof AddressDisplay.propTypes;
import PropTypes from "prop-types";
import React from "react";
