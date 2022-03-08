export function PaginationSelect({ availableValues, displayValue, id, isOpen, onValueChange, value, }: {
    availableValues: any;
    displayValue: any;
    id: any;
    isOpen: any;
    onValueChange: any;
    value: any;
}): JSX.Element;
export namespace PaginationSelect {
    namespace propTypes {
        const id: PropTypes.Requireable<string>;
        const availableValues: PropTypes.Validator<any[]>;
        const onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        const isOpen: PropTypes.Requireable<boolean>;
        const displayValue: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const isOpen_1: boolean;
        export { isOpen_1 as isOpen };
    }
}
import PropTypes from "prop-types";
