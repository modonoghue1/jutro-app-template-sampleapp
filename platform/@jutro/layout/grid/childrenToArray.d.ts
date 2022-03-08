/**
 * Convert React children to array (like React.Children.toArray)
 * but preserve undefined, boolean and null as null in the array
 */
export declare const childrenToArray: <C>(children: C | C[]) => Exclude<C, boolean | undefined>[];
declare type Child<C> = Exclude<C, boolean | undefined>;
export {};
