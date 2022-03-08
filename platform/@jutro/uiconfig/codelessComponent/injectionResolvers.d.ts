/**
 * Resolve id injector
 * if the variable placeholder matches appropriate placeholder
 */
export function injectId({ template, props, variable }: {
    template: any;
    props: any;
    variable: any;
}): ((path: any) => {
    path: any;
    value: string;
}) | undefined;
/**
 * Resolve data container injector (type === 'field' -> value prop; type === 'container' -> data prop)
 * if the variable placeholder matches one of the appropriate patterns
 */
export function injectData({ variable, dataContainer }: {
    variable: any;
    dataContainer: any;
}): ((path: any) => {
    path: any;
    value: any;
}) | undefined;
/**
 * Resolve component children injector
 * if the variable placeholder matches appropriate pattern
 */
export function injectChildren({ template, variable, props }: {
    template: any;
    variable: any;
    props: any;
}): ((path: any) => {
    path: any;
    value: any;
}) | undefined;
/**
 * Resolve value (can be anything) injector
 * if the variable placeholder is contained within a string template
 * and placeholder's name matches one of the instance's props
 */
export function injectValue({ template, props, variable, translator }: {
    template: any;
    props: any;
    variable: any;
    translator: any;
}): (path: any) => {
    path?: undefined;
    value?: undefined;
} | {
    path: any;
    value: any;
};
