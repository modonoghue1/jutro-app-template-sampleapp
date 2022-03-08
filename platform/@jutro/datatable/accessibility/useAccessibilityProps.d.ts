export function useAccessibilityProps({ selectionType, isExpandable, tableId, sorted, tableLabel, }: {
    selectionType: any;
    isExpandable: any;
    tableId: any;
    sorted: any;
    tableLabel: any;
}): {
    getA11yTrGroupProps: () => {
        role: string;
    };
    getA11yTrProps: () => {
        role: string;
    };
    getA11yTableProps: {
        role: string;
        'aria-label': any;
    };
    getA11yTheadThPropsSortableHeader: (state: any, columnId: any, type: any) => {
        id: string;
        tabIndex: number;
        onFocus: () => void;
        onKeyDown: (e: any) => void;
        role: string;
        'data-row': number;
        'data-col': any;
        'data-parent': any;
        'aria-sort': string;
    };
    getA11yTheadThPropsHeader: (state: any, columnId: any, type: any) => {
        id: string;
        tabIndex: number;
        onFocus: () => void;
        onKeyDown: (e: any) => void;
        role: string;
        'data-row': number;
        'data-col': any;
        'data-parent': any;
    };
    getA11yTdProps: (state: any, rowInfo: any, columnId: any, shouldBeFocusable: any) => {
        role: string;
        tabIndex: number;
        'data-row': any;
        'data-col': any;
        'data-parent': any;
        onFocus: () => void;
        onKeyDown: (e: any) => void;
        'aria-labelledby': string;
    };
};
