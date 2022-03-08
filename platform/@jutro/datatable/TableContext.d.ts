export const TableContext: import("react").Context<{
    styles: {
        [className: string]: string;
    };
    columns: {
        configurable: boolean;
        config: never[];
        setConfig: (...args: any[]) => void;
    };
}>;
export function useTableContext(): {
    styles: {
        [className: string]: string;
    };
    columns: {
        configurable: boolean;
        config: never[];
        setConfig: (...args: any[]) => void;
    };
};
