/**
 * ColumnsConfigModal
 * @param {object} param0
 */
export function ColumnsConfigModal({ isOpen, onResolve, onReject, parentSelector, initialColumns, }: object): JSX.Element;
export namespace ColumnsConfigModal {
    namespace propTypes {
        const isOpen: PropTypes.Requireable<boolean>;
        const onResolve: PropTypes.Requireable<(...args: any[]) => any>;
        const onReject: PropTypes.Requireable<(...args: any[]) => any>;
        const parentSelector: PropTypes.Requireable<(...args: any[]) => any>;
        const initialColumns: PropTypes.Requireable<(PropTypes.InferProps<{
            /**
             * Used to identify the component
             */
            id: PropTypes.Validator<string>;
            /**
             * Label text to be displayed beside the checkbox
             */
            header: PropTypes.Requireable<string>;
            /**
             * If true, the checkbox marked as checked
             */
            enabled: PropTypes.Requireable<boolean>;
        }> | null | undefined)[]>;
    }
}
import PropTypes from "prop-types";
