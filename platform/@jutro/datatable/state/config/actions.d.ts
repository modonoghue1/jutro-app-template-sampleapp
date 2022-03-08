export function setFilterValue(filterValue: any, resetPage?: boolean): {
    type: string;
    filterValue: any;
    resetPage: boolean;
};
export function setPage(page: any): {
    type: string;
    page: any;
};
export function setPageSize(pageSize: any, resetPage?: boolean): {
    type: string;
    pageSize: any;
    resetPage: boolean;
};
export function setSorted(sorted: any, resetPage?: boolean): {
    type: string;
    sorted: any;
    resetPage: boolean;
};
export function setColumns(columns: any): {
    type: string;
    columns: any;
};
export function setEditedRow(rowId: any): {
    type: string;
    rowId: any;
};
