export namespace formattedPhoneNumberPropTypes {
    export const value: PropTypes.Requireable<string | PropTypes.InferProps<{
        countryCode: PropTypes.Requireable<PropTypes.InferProps<{
            code: PropTypes.Requireable<string>;
        }>>;
        phoneNumber: PropTypes.Requireable<string>;
    }>>;
    export const showCountryCodeForReadOnly: PropTypes.Requireable<boolean>;
    export { phoneDataTypeShape as dataType };
    export const defaultCountry: PropTypes.Requireable<string>;
}
/**
 * The `FormattedPhoneNumber` component is used to render international phone number value.
 *
 * @type {React.FC<PropTypes.InferProps<typeof formattedPhoneNumberPropTypes>>}
 *
 * @metadataType element
 */
export const FormattedPhoneNumber: React.FC<PropTypes.InferProps<typeof formattedPhoneNumberPropTypes>>;
import PropTypes from "prop-types";
declare const phoneDataTypeShape: PropTypes.Requireable<string>;
import React from "react";
export {};
