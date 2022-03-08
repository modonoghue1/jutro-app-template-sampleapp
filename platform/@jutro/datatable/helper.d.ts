export function createTextFilter(filterValue: string): (text: string) => boolean;
export function defaultColumnFilter(filterValue: string, { path }: {
    path: string;
}): (item: any) => boolean;
