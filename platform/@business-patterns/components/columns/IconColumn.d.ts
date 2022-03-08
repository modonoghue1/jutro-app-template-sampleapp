export function IconColumn(): JSX.Element;
export namespace IconColumn {
    function defaultCell(row: any, rowId: any, { id, path, visible, iconOnly, iconMap }: {
        id: any;
        path: any;
        visible: any;
        iconOnly: any;
        iconMap: any;
    }): any;
    const displayName: string;
    const defaultProps: {
        iconMap: {};
        renderCell: (row: any, rowId: any, { id, path, visible, iconOnly, iconMap }: {
            id: any;
            path: any;
            visible: any;
            iconOnly: any;
            iconMap: any;
        }) => any;
        id?: string | undefined;
        header?: string | Function | undefined;
        headerClassName?: string | undefined;
        cell?: string | Function | undefined;
        cellClassName?: string | undefined;
        visible?: boolean | undefined;
        phone?: Record<string, any> | undefined;
        phoneWide?: Record<string, any> | undefined;
        tablet?: Record<string, any> | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | undefined;
        columnProportion?: number | undefined;
        sortable?: boolean | undefined;
        editCell?: Function | undefined;
        editCellClass?: string | undefined;
        columnClassName?: string | undefined;
        filter?: Function | undefined;
        path?: string | undefined;
        wrapActions?: "always" | "never" | {
            maxItems: number;
        } | {
            allWhen: number;
        } | undefined;
        fieldDatatype?: string | undefined;
    };
}
