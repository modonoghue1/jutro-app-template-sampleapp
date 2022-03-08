/**
 * Component for displaying tabular data
 *
 * @type {React.FC<PropTypes.InferProps<typeof dataTablePropTypes>>}
 *
 * @metadataType container
 */
export const DataTable: React.FC<PropTypes.InferProps<typeof dataTablePropTypes>>;
export type ColumnConfig = {};
import React from "react";
import PropTypes from "prop-types";
declare namespace dataTablePropTypes {
    export const id: PropTypes.Validator<string>;
    export const showSearch: PropTypes.Requireable<boolean>;
    export const showPagination: PropTypes.Requireable<boolean>;
    export { dataTableConfigShape as config };
    export { dataTableConfigShape as defaultConfig };
    export const onConfigChange: PropTypes.Requireable<(...args: any[]) => any>;
    export const pageSizeOptions: PropTypes.Requireable<(number | null | undefined)[]>;
    export const data: PropTypes.Requireable<(object | null | undefined)[]>;
    export const onFilter: PropTypes.Requireable<(...args: any[]) => any>;
    export const onColumnFilter: PropTypes.Requireable<(...args: any[]) => any>;
    export { intlMessageShape as filterPlaceholder };
    export const children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    export const expandable: PropTypes.Requireable<boolean>;
    export const multipleRowsExpandable: PropTypes.Requireable<boolean>;
    export const renderExpanderContent: PropTypes.Requireable<(...args: any[]) => any>;
    export const headerMultiline: PropTypes.Requireable<boolean>;
    export const onRowClick: PropTypes.Requireable<(...args: any[]) => any>;
    export const expandOnRowClick: PropTypes.Requireable<boolean>;
    export const selectOnRowClick: PropTypes.Requireable<boolean>;
    export const selectionType: PropTypes.Requireable<string>;
    export const selectedRows: PropTypes.Requireable<(string | number | null | undefined)[]>;
    export const selectionActions: PropTypes.Requireable<(PropTypes.InferProps<{
        icon: PropTypes.Validator<string>;
        label: PropTypes.Validator<string>;
        callback: PropTypes.Validator<(...args: any[]) => any>;
    }> | null | undefined)[]>;
    export const onSelectionChange: PropTypes.Requireable<(...args: any[]) => any>;
    export const columnsConfigurable: PropTypes.Requireable<boolean>;
    export { intlMessageShape as loadingText };
    export { intlMessageShape as noDataText };
    export const localSorting: PropTypes.Requireable<boolean>;
    export const phone: PropTypes.Requireable<object>;
    export const phoneWide: PropTypes.Requireable<object>;
    export const tablet: PropTypes.Requireable<object>;
    export const onSaveRow: PropTypes.Requireable<(...args: any[]) => any>;
    export const onEditCancel: PropTypes.Requireable<(...args: any[]) => any>;
    export const onEditStart: PropTypes.Requireable<(...args: any[]) => any>;
    export const path: PropTypes.Requireable<string>;
    export const onFetchData: PropTypes.Requireable<(...args: any[]) => any>;
    export const onGetRowId: PropTypes.Requireable<(...args: any[]) => any>;
    export const rowIdPath: PropTypes.Requireable<string>;
    export { intlMessageShape as tableLabel };
    export const numberOfRows: PropTypes.Requireable<number>;
}
declare const dataTableConfigShape: PropTypes.Requireable<PropTypes.InferProps<{
    /**
     * Row id of currently edited row
     */
    editedRow: PropTypes.Requireable<number>;
    /**
     * Columns configuration. Use to change order and hide columns (e.g. [{id: 'columnId', enabled: false}])
     */
    columns: PropTypes.Requireable<(PropTypes.InferProps<{
        /**
         * Column id
         */
        id: PropTypes.Validator<string>;
        /**
         * Show columns when true
         */
        enabled: PropTypes.Validator<boolean>;
    }> | null | undefined)[]>;
    /**
     * Search value
     */
    filterValue: PropTypes.Requireable<string>;
    /**
     * Current page index
     */
    page: PropTypes.Requireable<number>;
    /**
     * Number of items per single page
     */
    pageSize: PropTypes.Requireable<number>;
    /**
     * Array of objects containing the sort column id and whether or not it's a descending sort (e.g. [{id: 'foo', desc: false}]
     */
    sorted: PropTypes.Requireable<(PropTypes.InferProps<{
        /**
         * Column id
         */
        id: PropTypes.Validator<string>;
        /**
         * Sort descending when true
         */
        desc: PropTypes.Validator<boolean>;
    }> | null | undefined)[]>;
}>>;
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
