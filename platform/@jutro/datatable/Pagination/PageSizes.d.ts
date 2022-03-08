export function PageSizes({ id, numberOfRows, onSelectPageSizeChange, pageSize, pageSizeOptions, pageSizeSelectedOption, }: {
    id: any;
    numberOfRows: any;
    onSelectPageSizeChange: any;
    pageSize: any;
    pageSizeOptions: any;
    pageSizeSelectedOption: any;
}): false | JSX.Element;
export namespace PageSizes {
    namespace propTypes {
        const id: PropTypes.Validator<string>;
        const pageSizeOptions: PropTypes.Validator<any[]>;
        const numberOfRows: PropTypes.Validator<number>;
        const pageSize: PropTypes.Validator<number>;
        const pageSizeSelectedOption: PropTypes.Requireable<string | number>;
        const onSelectPageSizeChange: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
