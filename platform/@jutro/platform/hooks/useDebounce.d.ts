/**
 * Return a debounced value will reflect the latest value for the specified time period
 *
 * @param value the value to debounce
 * @param delay period of time to wait before updating state
 * @returns debounced value
 */
export declare const useDebounce: <T>(value: T, delay: number) => T;
