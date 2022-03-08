export function TableColumn(): null;
export namespace TableColumn {
    namespace propTypes {
        const id: PropTypes.Requireable<string>;
        const header: PropTypes.Requireable<string | object>;
        const renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
        const headerClassName: PropTypes.Requireable<string>;
        const cell: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        const renderCell: PropTypes.Requireable<(...args: any[]) => any>;
        const cellClassName: PropTypes.Requireable<string>;
        const visible: PropTypes.Requireable<boolean>;
        const phone: PropTypes.Requireable<object>;
        const phoneWide: PropTypes.Requireable<object>;
        const tablet: PropTypes.Requireable<object>;
        const textAlign: PropTypes.Requireable<string>;
        const width: PropTypes.Requireable<number>;
        const columnProportion: PropTypes.Requireable<number>;
        const sortable: PropTypes.Requireable<boolean>;
        const renderEditCell: PropTypes.Requireable<(...args: any[]) => any>;
        const editCellClass: PropTypes.Requireable<string>;
        const columnClassName: PropTypes.Requireable<string>;
        const onFilter: PropTypes.Requireable<(...args: any[]) => any>;
        const path: PropTypes.Requireable<string>;
        const onSort: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const columnProportion_1: number;
        export { columnProportion_1 as columnProportion };
    }
    const displayName: string;
    function renderHeader(props: any, translator: Function): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    function renderCell(row: any, index: number, props: any, translator: Function): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    const metadataType: any;
}
import PropTypes from "prop-types";
import React from "react";
