export function Pagination({ id, page, numberOfRows, pageSize, onPageChange, pageSizeSelectedOption, pageSizeOptions, onSelectPageSizeChange, canNext, canPrevious, }: {
    id: any;
    page: any;
    numberOfRows: any;
    pageSize: any;
    onPageChange: any;
    pageSizeSelectedOption: any;
    pageSizeOptions: any;
    onSelectPageSizeChange: any;
    canNext: any;
    canPrevious: any;
}): JSX.Element;
export namespace Pagination {
    namespace propTypes {
        const id: PropTypes.Validator<string>;
        const canNext: PropTypes.Requireable<boolean>;
        const canPrevious: PropTypes.Requireable<boolean>;
        const pageSizeOptions: PropTypes.Validator<any[]>;
        const page: PropTypes.Requireable<number>;
        const numberOfRows: PropTypes.Validator<number>;
        const pageSize: PropTypes.Validator<number>;
        const onPageChange: PropTypes.Requireable<(...args: any[]) => any>;
        const pageSizeSelectedOption: PropTypes.Requireable<string | number>;
        const onSelectPageSizeChange: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
