export function GenericSelectControlDropdownIndicator({ icon, className, hasValue, selectProps: { genericSelectStyles, isClearable, isLoading }, }: {
    icon: any;
    className: any;
    hasValue: any;
    selectProps: {
        genericSelectStyles: any;
        isClearable: any;
        isLoading: any;
    };
}): JSX.Element | null;
export namespace GenericSelectControlDropdownIndicator {
    namespace propTypes {
        const icon: PropTypes.Requireable<string>;
        const className: PropTypes.Requireable<string>;
        const selectProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Current selected value
             */
            value: PropTypes.Requireable<any>;
            /**
             * Map with custom styles for generic select
             */
            customStyles: PropTypes.Requireable<object>;
            /**
             * Indicates whether generic select is clearable
             */
            isClearable: PropTypes.Requireable<boolean>;
            /**
             * Indicates whether generic select is in loading state
             */
            isLoading: PropTypes.Requireable<boolean>;
        }>>;
    }
    namespace defaultProps {
        const icon_1: string;
        export { icon_1 as icon };
    }
}
import PropTypes from "prop-types";
