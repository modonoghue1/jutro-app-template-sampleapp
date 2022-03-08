export function dataFilter(data: object[], filters: object, options?: FilterOptions | undefined): object[];
/**
 * dataFilter options
 */
export type FilterOptions = {
    /**
     * filters key name to be used as search filter.
     * Default to FilterBar DEFAULT_SEARCH_KEY
     */
    searchKey?: string | undefined;
    /**
     * Object of functions to be applied on data before search. E.g.
     * {
     * myDataKey: (value) => {
     * // do whatever you want with the data before search
     * // e.g. transform date - 04/06/1257 -> June 4, 1257
     * // should return string
     * return value;
     * }
     * }
     */
    formatters?: object;
};
