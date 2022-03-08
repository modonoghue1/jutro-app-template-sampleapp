export function AddressComponent({ value, onValueChange, onValidationChange, countriesData, defaultCountry, readOnly, readOnlyFormat, readOnlyLabel, showCountrySelection, id, path, showErrors, alwaysShowMaskPostalCode, }: {
    value: any;
    onValueChange: any;
    onValidationChange: any;
    countriesData: any;
    defaultCountry: any;
    readOnly: any;
    readOnlyFormat: any;
    readOnlyLabel: any;
    showCountrySelection?: string | undefined;
    id: any;
    path: any;
    showErrors: any;
    alwaysShowMaskPostalCode: any;
}): JSX.Element;
export namespace AddressComponent {
    namespace propTypes {
        export const value: PropTypes.Requireable<object>;
        export const onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        export const onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
        export const countriesData: PropTypes.Requireable<object>;
        export const defaultCountry: PropTypes.Requireable<string>;
        export const readOnly: PropTypes.Requireable<boolean>;
        export const readOnlyFormat: PropTypes.Requireable<string>;
        export { intlMessageShape as readOnlyLabel };
        export const showCountrySelection: PropTypes.Requireable<string>;
        export const id: PropTypes.Validator<string>;
        export const path: PropTypes.Requireable<string>;
        export const showErrors: PropTypes.Requireable<boolean>;
        export const alwaysShowMaskPostalCode: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from "prop-types";
import { intlMessageShape } from "@jutro/prop-types/intlMessageShape";
