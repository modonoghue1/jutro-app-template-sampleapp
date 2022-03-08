export function collapse(payload: any): {
    type: string;
    payload: any;
};
export function toggle(rowId: any, viewIndex: any, allowMultiple: any): {
    type: string;
    payload: {
        rowId: any;
        viewIndex: any;
        allowMultiple: any;
    };
};
export function collapseAll(): {
    type: string;
};
