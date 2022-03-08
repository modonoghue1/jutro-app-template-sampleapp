export function PageNumbers({ id, numberOfRows, pageSize, onPageChange, page, canPrevious, canNext, }: {
    id: any;
    numberOfRows: any;
    pageSize: any;
    onPageChange: any;
    page: any;
    canPrevious: any;
    canNext: any;
}): false | JSX.Element;
export namespace PageNumbers {
    namespace defaultProps {
        const page: number;
    }
    namespace propTypes {
        export const id: PropTypes.Validator<string>;
        export const canNext: PropTypes.Requireable<boolean>;
        export const canPrevious: PropTypes.Requireable<boolean>;
        const page_1: PropTypes.Requireable<number>;
        export { page_1 as page };
        export const numberOfRows: PropTypes.Validator<number>;
        export const pageSize: PropTypes.Validator<number>;
        export const onPageChange: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
