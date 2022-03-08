/**
 * Renders an map element. It allows the user to pick a place in the map. Allows you to display address on the map and choose the format of the address.
 * @typedef {typeof MapAreaInternal.propTypes} MapAreaInternalPropTypes
 * @extends FieldComponent<PropTypes.InferProps<MapAreaInternalPropTypes>>
 *
 * @metadataType field
 */
export class MapAreaInternal extends FieldComponent<PropTypes.InferProps<{
    /**
     * Address to display on the map
     */
    value: PropTypes.Requireable<string | PropTypes.InferProps<{
        country: PropTypes.Requireable<string>;
        countryCode: PropTypes.Requireable<string>;
        postalCode: PropTypes.Requireable<string>;
        state: PropTypes.Requireable<string>;
        city: PropTypes.Requireable<string>;
        addressLine1: PropTypes.Requireable<string>;
        addressLine2: PropTypes.Requireable<string>;
        addressLine3: PropTypes.Requireable<string>;
    }>>;
    /**
     * Format of the value
     */
    dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape>;
    /**
     * Default address to display on the map
     */
    defaultValue: PropTypes.Requireable<string | PropTypes.InferProps<{
        country: PropTypes.Requireable<string>;
        countryCode: PropTypes.Requireable<string>;
        postalCode: PropTypes.Requireable<string>;
        state: PropTypes.Requireable<string>;
        city: PropTypes.Requireable<string>;
        addressLine1: PropTypes.Requireable<string>;
        addressLine2: PropTypes.Requireable<string>;
        addressLine3: PropTypes.Requireable<string>;
    }>>;
    /**
     * Styles to apply to the map component
     */
    mapStyles: PropTypes.Requireable<object>;
    /**
     * The key required by the Google Maps API
     * @deprecated
     */
    googleMapsApiKey: PropTypes.Validator<any>;
    /**
     * The key required by the Google Maps API
     */
    onGoogleMapsApiKey: PropTypes.Requireable<string | ((...args: any[]) => any)>;
    /**
     * Defines the order of address items
     */
    orderOfAddress: PropTypes.Requireable<(string | null | undefined)[]>;
    /**
     * Title attribute which will be added to the Google Maps iframe for the accessibility
     */
    title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    id: PropTypes.Validator<string>;
    label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>; /**
     * Defines the order of address items
     */
    secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    tooltip: PropTypes.Requireable<string | PropTypes.InferProps<{
        id: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<string>;
        placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
        text: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        link: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        renderContent: PropTypes.Requireable<(...args: any[]) => any>;
    }>>;
    placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    required: PropTypes.Requireable<boolean | any[]>;
    schemaRequired: PropTypes.Requireable<boolean>;
    readOnly: PropTypes.Requireable<boolean>;
    disabled: PropTypes.Requireable<boolean>;
    nullable: PropTypes.Requireable<boolean>;
    visible: PropTypes.Requireable<boolean>;
    autoTrim: PropTypes.Requireable<boolean>;
    onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
    onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
    onBlur: PropTypes.Requireable<(...args: any[]) => any>;
    onFocus: PropTypes.Requireable<(...args: any[]) => any>;
    model: PropTypes.Requireable<object>;
    path: PropTypes.Requireable<string>;
    showErrors: PropTypes.Requireable<boolean>;
    showRequired: PropTypes.Requireable<boolean>;
    showOptional: PropTypes.Requireable<boolean>;
    validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
    layout: PropTypes.Requireable<string>;
    hideLabel: PropTypes.Requireable<boolean>;
    className: PropTypes.Requireable<string>;
    contentContainerClassName: PropTypes.Requireable<string>;
    controlClassName: PropTypes.Requireable<string>;
    labelClassName: PropTypes.Requireable<string>;
    secondaryLabelClassName: PropTypes.Requireable<string>;
    labelContainerClassName: PropTypes.Requireable<string>;
    showValidationIcon: PropTypes.Requireable<boolean>;
    dataPath: PropTypes.Requireable<string>;
    validator: PropTypes.Requireable<PropTypes.InferProps<{
        pattern: PropTypes.Validator<string>;
        message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    requiredFieldValidationMessage: PropTypes.Requireable<string>;
    successMessage: PropTypes.Requireable<string>;
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    labelPosition: PropTypes.Requireable<string>;
    phone: PropTypes.Requireable<object>;
    phoneWide: PropTypes.Requireable<object>;
    tablet: PropTypes.Requireable<object>;
    inputType: PropTypes.Requireable<string>;
    testId: PropTypes.Requireable<string>;
    registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
    enableMultipleValidation: PropTypes.Requireable<boolean>;
}>> {
    static propTypes: {
        /**
         * Address to display on the map
         */
        value: PropTypes.Requireable<string | PropTypes.InferProps<{
            country: PropTypes.Requireable<string>;
            countryCode: PropTypes.Requireable<string>;
            postalCode: PropTypes.Requireable<string>;
            state: PropTypes.Requireable<string>;
            city: PropTypes.Requireable<string>;
            addressLine1: PropTypes.Requireable<string>;
            addressLine2: PropTypes.Requireable<string>;
            addressLine3: PropTypes.Requireable<string>;
        }>>;
        /**
         * Format of the value
         */
        dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape>;
        /**
         * Default address to display on the map
         */
        defaultValue: PropTypes.Requireable<string | PropTypes.InferProps<{
            country: PropTypes.Requireable<string>;
            countryCode: PropTypes.Requireable<string>;
            postalCode: PropTypes.Requireable<string>;
            state: PropTypes.Requireable<string>;
            city: PropTypes.Requireable<string>;
            addressLine1: PropTypes.Requireable<string>;
            addressLine2: PropTypes.Requireable<string>;
            addressLine3: PropTypes.Requireable<string>;
        }>>;
        /**
         * Styles to apply to the map component
         */
        mapStyles: PropTypes.Requireable<object>;
        /**
         * The key required by the Google Maps API
         * @deprecated
         */
        googleMapsApiKey: PropTypes.Validator<any>;
        /**
         * The key required by the Google Maps API
         */
        onGoogleMapsApiKey: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        /**
         * Defines the order of address items
         */
        orderOfAddress: PropTypes.Requireable<(string | null | undefined)[]>;
        /**
         * Title attribute which will be added to the Google Maps iframe for the accessibility
         */
        title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        id: PropTypes.Validator<string>;
        label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>; /**
         * Defines the order of address items
         */
        secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        tooltip: PropTypes.Requireable<string | PropTypes.InferProps<{
            id: PropTypes.Requireable<string>;
            icon: PropTypes.Requireable<string>;
            placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
            text: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            link: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            renderContent: PropTypes.Requireable<(...args: any[]) => any>;
        }>>;
        placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        required: PropTypes.Requireable<boolean | any[]>;
        schemaRequired: PropTypes.Requireable<boolean>;
        readOnly: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        nullable: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        autoTrim: PropTypes.Requireable<boolean>;
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        model: PropTypes.Requireable<object>;
        path: PropTypes.Requireable<string>;
        showErrors: PropTypes.Requireable<boolean>;
        showRequired: PropTypes.Requireable<boolean>;
        showOptional: PropTypes.Requireable<boolean>;
        validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
        layout: PropTypes.Requireable<string>;
        hideLabel: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        contentContainerClassName: PropTypes.Requireable<string>;
        controlClassName: PropTypes.Requireable<string>;
        labelClassName: PropTypes.Requireable<string>;
        secondaryLabelClassName: PropTypes.Requireable<string>;
        labelContainerClassName: PropTypes.Requireable<string>;
        showValidationIcon: PropTypes.Requireable<boolean>;
        dataPath: PropTypes.Requireable<string>;
        validator: PropTypes.Requireable<PropTypes.InferProps<{
            pattern: PropTypes.Validator<string>;
            message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        requiredFieldValidationMessage: PropTypes.Requireable<string>;
        successMessage: PropTypes.Requireable<string>;
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        labelPosition: PropTypes.Requireable<string>;
        phone: PropTypes.Requireable<object>;
        phoneWide: PropTypes.Requireable<object>;
        tablet: PropTypes.Requireable<object>;
        inputType: PropTypes.Requireable<string>;
        testId: PropTypes.Requireable<string>;
        registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
        enableMultipleValidation: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        mapStyles: {
            position: string;
            top: string;
            bottom: string;
            left: string;
            right: string;
            borderRadius: string;
        };
        dataType: string;
        defaultValue: string;
        orderOfAddress: string[];
        title: {
            id: string;
            defaultMessage: string;
        };
        onGoogleMapsApiKey: any;
        autoTrim: boolean;
        required: boolean;
        schemaRequired: boolean;
        readOnly: boolean;
        disabled: boolean;
        showErrors: boolean;
        hideLabel: boolean;
        showValidationIcon: boolean;
        dataPath: string;
        labelPosition: string;
    };
    static displayName: string;
    constructor(props: any);
    geocoder: any;
    /**
     * Helper function to convert address stored in an object to string in a good order.
     * @param {object} valObj object to convert
     * @returns {string} converted address
     */
    convertObjectValueIntoString: (valObj: object) => string;
    navigateToDefaultPosition: () => void;
    handleGeocodingResult: (results: any, status: any, isCurrentlyDecodingDefault: any, position: any) => void;
    /**
     * Function invoked on the map click. It invokes the geocoding based on the click coordinates.
     *
     * @param {object} mapProps
     * @param {object} map
     * @param {object} clickEvent props of the clickEvent f.eg. latitude and longitude
     */
    onMapClick: (mapProps: object, map: object, clickEvent: object) => void;
    /**
     * Render marker on the map
     *
     * @returns {React.ReactElement} JSX for the marker
     */
    renderMarker: () => React.ReactElement;
    /**
     * Render the map element
     *
     * @returns {React.ReactElement} JSX for the map
     */
    renderMap(): React.ReactElement;
    geocodeAddress: () => void;
    a11y: (map: any) => void;
    markerA11y: () => void;
}
/** @typedef {object} Address
 * @prop {string} [country]
 * @prop {string} [countryCode]
 * @prop {string} [postalCode]
 * @prop {string} [state]
 * @prop {string} [city]
 * @prop {string} [addressLine1]
 * @prop {string} [addressLine2]
 * @prop {string} [addressLine3]
 */
/** @typedef {object} MapAreaProps
 * @prop {string | Address} [value]
 * @prop {'object' | 'string'} [dataType]
 * @prop {string | Address} [defaultValue]
 * @prop {Record<string, any>} [mapStyles]
 * @prop {string | function(any): string} googleMapsApiKey
 * @prop {string | function(any): string} onGoogleMapsApiKey
 * @prop {Array<string>} [orderOfAddress]
 */
/**
 *  @type {React.ComponentType<import('../FieldComponent/FieldComponent').FieldComponentProps & MapAreaProps>}
 */
export const MapArea: React.ComponentType<import('../FieldComponent/FieldComponent').FieldComponentProps & MapAreaProps>;
/**
 * Renders an map element. It allows the user to pick a place in the map. Allows you to display address on the map and choose the format of the address.
 */
export type MapAreaInternalPropTypes = typeof MapAreaInternal.propTypes;
export type Address = {
    country?: string | undefined;
    countryCode?: string | undefined;
    postalCode?: string | undefined;
    state?: string | undefined;
    city?: string | undefined;
    addressLine1?: string | undefined;
    addressLine2?: string | undefined;
    addressLine3?: string | undefined;
};
export type MapAreaProps = {
    value?: string | Address | undefined;
    dataType?: "string" | "object" | undefined;
    defaultValue?: string | Address | undefined;
    mapStyles?: Record<string, any> | undefined;
    googleMapsApiKey: string | ((arg0: any) => string);
    onGoogleMapsApiKey: string | ((arg0: any) => string);
    orderOfAddress?: string[] | undefined;
};
import PropTypes from "prop-types";
import React from "react";
import { FieldComponent } from "../FieldComponent/FieldComponent";
