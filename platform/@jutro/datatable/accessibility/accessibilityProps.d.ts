export function getA11yTrGroupProps(): {
    role: string;
};
export function getA11yTrProps(): {
    role: string;
};
export function getA11yTableProps(tableLabel: any): {
    role: string;
    'aria-label': any;
};
export function getA11yTheadThPropsSortableHeader(tableId: any, sorted: any, focused: any, setFocused: any): (state: any, columnId: any, type: any) => {
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
export function getA11yTheadThPropsHeader(tableId: any, focused: any, setFocused: any): (state: any, columnId: any, type: any) => {
    id: string;
    tabIndex: number;
    onFocus: () => void;
    onKeyDown: (e: any) => void;
    role: string;
    'data-row': number;
    'data-col': any;
    'data-parent': any;
};
export function getA11yTdProps(tableId: any, focused: any, setFocused: any): (state: any, rowInfo: any, columnId: any, shouldBeFocusable: any) => {
    role: string;
    tabIndex: number;
    'data-row': any;
    'data-col': any;
    'data-parent': any;
    onFocus: () => void;
    onKeyDown: (e: any) => void;
    'aria-labelledby': string;
};
