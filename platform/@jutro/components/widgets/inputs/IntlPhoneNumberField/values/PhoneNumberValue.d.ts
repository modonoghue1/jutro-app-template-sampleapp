/**
 * Renders a formatted international phone number using the `tag` property to wrap
 * the value.
 *
 * @type {React.FC<PropTypes.InferProps<typeof phoneValuePropTypes>>}
 *
 * @metadataType element
 */
export const PhoneNumberValue: React.FC<PropTypes.InferProps<typeof phoneValuePropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare const phoneValuePropTypes: {
    /**
     * Do not set this field directly - this is a placeholder for the rest od properties, same as you can pass to FormattedPhoneNumber component
     */
    _rest: PropTypes.Requireable<any>;
    value: PropTypes.Requireable<string | PropTypes.InferProps<{
        countryCode: PropTypes.Requireable<PropTypes.InferProps<{
            code: PropTypes.Requireable<string>;
        }>>;
        phoneNumber: PropTypes.Requireable<string>;
    }>>;
    showCountryCodeForReadOnly: PropTypes.Requireable<boolean>;
    dataType: PropTypes.Requireable<string>;
    defaultCountry: PropTypes.Requireable<string>;
    /**
     * Used to identify the component
     */
    id: PropTypes.Validator<string>;
    /**
     * CSS class name for this component
     */
    className: PropTypes.Requireable<string>;
    /**
     * Hint path to value
     */
    path: PropTypes.Requireable<string>;
    /**
     * The html tag to use when rendering the outermost element of this component
     */
    tag: PropTypes.Requireable<string>;
    /**
     *  Optional prefix message to be attached in front of the value
     */
    prefix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     *  Optional suffix message to be attached at the end the value
     */
    suffix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
};
export {};
