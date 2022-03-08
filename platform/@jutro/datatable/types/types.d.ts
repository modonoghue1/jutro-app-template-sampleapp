export type TableColumnProps = {
    /**
     * Identifier
     */
    id?: string | undefined;
    /**
     * String or callback(props) to render the column header in the table
     */
    header?: string | Function | undefined;
    /**
     * Classname for header <th>
     */
    headerClassName?: string | undefined;
    /**
     * String or callback(row, index, props) to render the column cell for a row in the table
     */
    cell?: string | Function | undefined;
    /**
     * Classname for cell <td>
     */
    cellClassName?: string | undefined;
    /**
     * Is this column shown in the table
     */
    visible?: boolean | undefined;
    /**
     * Include any TableColumn property for use at 'phone' breakpoint
     */
    phone?: Record<string, any> | undefined;
    /**
     * Include any TableColumn property for use at 'phoneWide' and 'phone' breakpoint
     */
    phoneWide?: Record<string, any> | undefined;
    /**
     * Include any TableColumn property for use at 'tablet', 'phoneWide' and 'phone' breakpoint
     */
    tablet?: Record<string, any> | undefined;
    /**
     * Text-align css property value (default 'center')
     */
    textAlign?: "right" | "left" | "center" | undefined;
    /**
     * The width of current column, when `undefined` columns will share the table accordingly to columns columnProportion prop
     */
    width?: number | undefined;
    /**
     * Proportion of the column. Doesn't work when width is defined
     */
    columnProportion?: number | undefined;
    /**
     * To specify if the column is sortable, when `undefined` the column is sortable
     */
    sortable?: boolean | undefined;
    /**
     * Callback(row, index, props) to render the column cell for a row in the table in the edit mode
     */
    editCell?: Function | undefined;
    /**
     * Custom classname for column cell in the edit mode
     */
    editCellClass?: string | undefined;
    /**
     * Classname for column
     */
    columnClassName?: string | undefined;
    /**
     * Column filter function
     */
    filter?: Function | undefined;
    /**
     * The full path of view model
     */
    path?: string | undefined;
    /**
     * Callback to render column cell
     */
    renderCell?: Function | undefined;
    /**
     * Behavior of wrapping actions in a dropdown in ActionColumn
     */
    wrapActions?: "always" | "never" | {
        maxItems: number;
    } | {
        allWhen: number;
    } | undefined;
};
