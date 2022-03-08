export function AddressForm({ value, onValueChange, countryData, uiProps, showErrors, readOnly, readOnlyFormat, readOnlyLabel, metadataFormKey, id, customLayoutTypes, onValidationChange, alwaysShowMaskPostalCode, }: {
    value: any;
    onValueChange: any;
    countryData: any;
    uiProps: any;
    showErrors: any;
    readOnly: any;
    readOnlyFormat: any;
    readOnlyLabel: any;
    metadataFormKey: any;
    id: any;
    customLayoutTypes: any;
    onValidationChange: any;
    alwaysShowMaskPostalCode?: boolean | undefined;
}): JSX.Element;
export namespace AddressForm {
    namespace propTypes {
        export const value: PropTypes.Requireable<object>;
        export const onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        export const onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
        export const countryData: PropTypes.Requireable<object>;
        export const uiProps: PropTypes.Requireable<object>;
        export const showErrors: PropTypes.Requireable<boolean>;
        export const readOnly: PropTypes.Requireable<boolean>;
        export const readOnlyFormat: PropTypes.Requireable<string>;
        export { intlMessageShape as readOnlyLabel };
        export const metadataFormKey: PropTypes.Requireable<string>;
        export const id: PropTypes.Validator<string>;
        export const customLayoutTypes: PropTypes.Requireable<{
            [x: string]: PropTypes.InferProps<{
                columns: PropTypes.Validator<string[]>;
                colspan: PropTypes.Validator<number>;
                affectedFieldsName: PropTypes.Validator<string[]>;
            }>;
        }>;
        export const alwaysShowMaskPostalCode: PropTypes.Requireable<boolean>;
    }
}
export const layoutTypesShape: PropTypes.Requireable<PropTypes.InferProps<{
    columns: PropTypes.Validator<string[]>;
    colspan: PropTypes.Validator<number>;
    affectedFieldsName: PropTypes.Validator<string[]>;
}>>;
import PropTypes from "prop-types";
import { intlMessageShape } from "@jutro/prop-types/intlMessageShape";
