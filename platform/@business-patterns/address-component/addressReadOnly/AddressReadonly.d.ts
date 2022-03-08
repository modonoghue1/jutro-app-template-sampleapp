export function AddressReadonly({ id, label, format, address }: {
    id: any;
    label: any;
    format?: string | undefined;
    address: any;
}): JSX.Element;
export namespace AddressReadonly {
    namespace propTypes {
        export const address: PropTypes.Validator<(string | PropTypes.InferProps<{
            name: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
        export const format: PropTypes.Requireable<string>;
        export { intlMessageShape as label };
        export const id: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
import { intlMessageShape } from "@jutro/prop-types/intlMessageShape";
