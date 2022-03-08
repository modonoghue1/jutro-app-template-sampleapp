/**
 * Converts columns data schema info into array of columns ui metadata
 *
 * @param {object} dataProps - Data props definition to generate columns from
 * @param {string} columnType - Type of the column to render
 * @returns {Array<any>} - Array of columns ui metadata
 */
export function generateColumnsFromSchema(dataProps: object, columnType: string): Array<any>;
/**
 * Installs dependencies for the newly scaffolded application
 *
 * @param {object} dataSchema - Data schema definition to generate props from
 * @param {object} onDataSchemaExtension - Data schema extension to generate validation props from
 * @param {object} tableData - Table data to generate props from
 * @returns {Array<any>} - Array of props definitions to apply while rendering
 */
export function useJsonSchema(dataSchema: object, onDataSchemaExtension: object, tableData: object): Array<any>;
export const columnConfigShape: PropTypes.Requireable<PropTypes.InferProps<PropTypes.ValidationMap<any>>>;
/**
 * DataTable variant allowing to integrate with schema, metadata and data
 *
 * @type {React.FC<PropTypes.InferProps<typeof jsonDataTablePropTypes>>}
 *
 * @metadataType container
 * @deprecated
 */
export const JsonDataTable: React.FC<PropTypes.InferProps<typeof jsonDataTablePropTypes>>;
import PropTypes from "prop-types";
import React from "react";
declare const jsonDataTablePropTypes: {
    /**
     * Resolve callback string to callback function
     */
    callbackMap: PropTypes.Requireable<object>;
    /**
     * Resolve component string to component
     */
    componentMap: PropTypes.Requireable<object>;
    /**
     * Data for this table
     */
    data: PropTypes.Requireable<object>;
    /**
     * Schema for this form; used for data props and validation
     */
    dataSchema: PropTypes.Validator<object>;
    /**
     * Function to process schema data types with custom attributes
     */
    onDataSchemaExtension: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Callback for row deletion
     */
    onDeleteRow: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Callback for saving the row edit
     */
    onSaveRow: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * optional
     * Override props by all, type or id.
     */
    overrideProps: PropTypes.Requireable<object>;
    /**
     * optional
     * Show errors for all invalid fields; true after user attempts to submit/perform an action
     */
    showErrors: PropTypes.Requireable<boolean>;
    /**
     * Array of ui configs for columns
     */
    uiColumns: PropTypes.Requireable<(PropTypes.InferProps<PropTypes.ValidationMap<any>> | null | undefined)[]>;
    /**
     * Indicate if the table should be editable or readOnly
     */
    readOnly: PropTypes.Requireable<boolean>;
    children?: React.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray> | undefined;
    id?: React.Validator<string> | undefined;
    path?: React.Validator<string | null | undefined> | undefined;
    phone?: React.Validator<object | null | undefined> | undefined;
    phoneWide?: React.Validator<object | null | undefined> | undefined;
    tablet?: React.Validator<object | null | undefined> | undefined;
    numberOfRows?: React.Validator<number | null | undefined> | undefined;
    pageSizeOptions?: React.Validator<(number | null | undefined)[] | null | undefined> | undefined;
    noDataText?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
    loadingText?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
    tableLabel?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
    filterPlaceholder?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
    selectionActions?: React.Validator<(PropTypes.InferProps<{
        icon: PropTypes.Validator<string>;
        label: PropTypes.Validator<string>;
        callback: PropTypes.Validator<(...args: any[]) => any>;
    }> | null | undefined)[] | null | undefined> | undefined;
    config?: React.Validator<PropTypes.InferProps<{
        editedRow: PropTypes.Requireable<number>;
        columns: PropTypes.Requireable<(PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            enabled: PropTypes.Validator<boolean>;
        }> | null | undefined)[]>;
        filterValue: PropTypes.Requireable<string>;
        page: PropTypes.Requireable<number>;
        pageSize: PropTypes.Requireable<number>;
        sorted: PropTypes.Requireable<(PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            desc: PropTypes.Validator<boolean>;
        }> | null | undefined)[]>;
    }> | null | undefined> | undefined;
    selectionType?: React.Validator<string | null | undefined> | undefined;
    onFilter?: React.Validator<((...args: any[]) => any) | null | undefined> | undefined;
    selectOnRowClick?: React.Validator<boolean | null | undefined> | undefined;
    onEditStart?: React.Validator<((...args: any[]) => any) | null | undefined> | undefined;
    showSearch?: React.Validator<boolean | null | undefined> | undefined;
    showPagination?: React.Validator<boolean | null | undefined> | undefined;
    defaultConfig?: React.Validator<PropTypes.InferProps<{
        editedRow: PropTypes.Requireable<number>;
        columns: PropTypes.Requireable<(PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            enabled: PropTypes.Validator<boolean>;
        }> | null | undefined)[]>;
        filterValue: PropTypes.Requireable<string>;
        page: PropTypes.Requireable<number>;
        pageSize: PropTypes.Requireable<number>;
        sorted: PropTypes.Requireable<(PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            desc: PropTypes.Validator<boolean>;
        }> | null | undefined)[]>;
    }> | null | undefined> | undefined;
    onConfigChange?: React.Validator<((...args: any[]) => any) | null | undefined> | undefined;
    onColumnFilter?: React.Validator<((...args: any[]) => any) | null | undefined> | undefined;
    expandable?: React.Validator<boolean | null | undefined> | undefined;
    multipleRowsExpandable?: React.Validator<boolean | null | undefined> | undefined;
    renderExpanderContent?: React.Validator<((...args: any[]) => any) | null | undefined> | undefined;
    headerMultiline?: React.Validator<boolean | null | undefined> | undefined;
    onRowClick?: React.Validator<((...args: any[]) => any) | null | undefined> | undefined;
    expandOnRowClick?: React.Validator<boolean | null | undefined> | undefined;
    selectedRows?: React.Validator<(string | number | null | undefined)[] | null | undefined> | undefined;
    onSelectionChange?: React.Validator<((...args: any[]) => any) | null | undefined> | undefined;
    columnsConfigurable?: React.Validator<boolean | null | undefined> | undefined;
    localSorting?: React.Validator<boolean | null | undefined> | undefined;
    onEditCancel?: React.Validator<((...args: any[]) => any) | null | undefined> | undefined;
    onFetchData?: React.Validator<((...args: any[]) => any) | null | undefined> | undefined;
    onGetRowId?: React.Validator<((...args: any[]) => any) | null | undefined> | undefined;
    rowIdPath?: React.Validator<string | null | undefined> | undefined;
};
export {};
