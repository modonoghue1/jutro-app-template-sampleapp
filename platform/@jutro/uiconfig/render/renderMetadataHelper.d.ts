/**
 * Returns new props object with resolved callbacks
 *
 * @param {object} props - props object
 * @param {object} callbackMap - object with callback mappings
 * @returns {Object.<string, Function | undefined>}
 */
export function resolveCallbackProps(props: object, callbackMap: object): {
    [x: string]: Function | undefined;
};
/**
 * Returns new props object with resolved classNames
 *
 * @param {object} props - props object
 * @param {object} classNameMap - object with class names mappings
 * @returns {object}
 */
export function resolveClassNamesProps(props: object, classNameMap: object): object;
/**
 * check a route object for any props which have className and resolve
 *
 * @param {object} route - prop which could have nested className
 * @param {object} callbackMap - object with callback mappings
 * @param {object} classNameMap - object with class names mappings
 * @returns
 */
export function resolveNestedPropClassNames(prop: any, callbackMap: object, classNameMap: object): any;
/**
 * Returns new props object with resolved classNames and callbacks
 *
 * @param {object} props - props object
 * @param {object} callbackMap - object with callback mappings
 * @param {object} classNameMap - object with class names mappings
 * @returns {object}
 */
export function resolveProps(props: object, callbackMap: object, classNameMap: object): object;
/**
 * Resolve className using className map.
 *
 * @param {string} id - id of item
 * @param {string} className - class name to resolve
 * @param {object} classNameMap - map for resolving class name
 * @returns {string} resolved class name if mapped; otherwise unmodified class name
 */
export function resolveClassName(id: string, className: string, classNameMap: object): string;
/**
 * Resolve classNames using className map.
 *
 * @param {string} classNames - class names to resolve
 * @param {object} classNameMap - map for resolving class name
 * @returns {string} resolved class name if mapped; otherwise unmodified class name
 */
export function resolveClassNames(id: any, classNames: string, classNameMap: object, resolver?: typeof resolveClassName): string;
/**
 * Resolve callback string to function using callback map.
 *
 * @param {string} id - id of item
 * @param {string} callbackName - name of callback to resolve
 * @param {object} callbackMap - map for resolving callback name
 * @returns {Function} resolved callback function
 */
export function resolveCallback(id: string, callbackName: string, callbackMap: object): Function;
/**
 * Resolve component or data type string to real component using component map.
 * Note: the Jutro component map will be used if a component cannot be resolved
 * with the componentMap parameter
 * Note: 'type' and 'metadataPath' are sent to resolveComponent functions passed in with resolvers
 *
 * @typedef {object} ComponentInfo
 * @prop {React.Component | string} component
 * @prop {Object.<string>} [componentProps]
 *
 * @param {string|React.Component} component - name of component to resolve
 * @param {string} datatype - datatype to resolve
 * @param {object} componentMap - map for resolving component/datatype
 * @returns {ComponentInfo | undefined} resolved component class
 */
export function resolveComponent(component: string | React.Component, datatype: string, componentMap: object): ComponentInfo | undefined;
/**
 * Prepares component metadata for rendering/validation/etc.
 * Combines metadata and overrides and resolves component, class names, callbacks, etc
 * If the component contains 'content', the nested components are also resolved.
 *
 * @param {object|null} metadata - component metadata
 * @param {object} overrideProps - override props by all, type or id
 * @param {object} resolvers - a collection of resolve functions and maps
 * @param {object} rootMetadata - root metadata for resolving references
 * @param {string} metadataPath - path to metadata node
 * @returns {object|null} fully resolved component metadata
 */
export function prepareComponentFromMetadata(metadata: object | null, overrideProps: object, resolvers: object, rootMetadata: object, metadataPath: string): object | null;
/**
 * Prepares content metadata for rendering/validation/etc.
 * Combines metadata and overrides and resolves component, class names, callbacks, etc
 * If the component contains 'content', the nested components are also resolved.
 *
 * @param {object|Array} contentMetadata - content metadata or an array of metadata
 * @param {object} overrideProps - override props by all, type or id
 * @param {object} resolvers - a collection of resolve functions and maps
 * @param {object} rootMetadata - root metadata for resolving references
 * @param {string} metadataPath - path to metadata node
 * @returns {object} fully resolved content metadata
 */
export function prepareContentFromMetadata(contentMetadata: object | any[], overrideProps: object, resolvers: object, rootMetadata: object, metadataPath?: string): object;
/**
 * Renders a single component from metadata
 * Invoked with resolved metadata returned from 'prepareComponent()'
 *
 * @param {object|null} metadata - resolved metadata for a single component
 * @param {boolean} [showHidden=false] - show hidden content in results
 * @returns {React.Element|null} - React component instance
 */
export function renderComponentFromMetadata(metadata: object | null, showHidden?: boolean | undefined): any | null;
/**
 * Renders an array of components from metadata
 * Invoked with resolved metadata returned from 'prepareContent()'
 *
 * @param {Array<any>} contentMetadata - array of resolved metadata
 * @param {object} contentLayout - layout to be applied to content
 * @param {boolean} [showHidden=false] - show hidden content in results
 * @returns {React.Element} - React component instance
 */
export function renderContent(contentMetadata: Array<any>, contentLayout: object, showHidden?: boolean | undefined): any;
/**
 * Renders a layout around the provided content
 * Invoked with resolved metadata returned from 'prepareContent()'
 *
 * @param {React.Element} content - React content to render in layout
 * @param {object} contentLayout - layout to be applied to content
 * @returns {React.Element} - React component instance
 */
export function renderLayout(content: any, contentLayout: object): any;
/**
 * Renders content metadata
 *
 * @param {object|Array} contentMetadata - content metadata or an array of metadata
 * @param {object} [overrideProps] - override props by all, type or id
 * @param {object} resolvers - a collection of resolve functions and maps
 * @param {boolean} [showHidden=false] - show hidden content in results
 * @returns {React.Element} React component instances
 */
export function renderContentFromMetadataInternal(contentMetadata: object | any[], overrideProps?: object, resolvers: object, showHidden?: boolean | undefined): any;
/**
 * Renders content metadata
 *
 * @param {object|Array} contentMetadata - content metadata or an array of metadata
 * @param {object} [overrideProps] - override props by all, type or id
 * @param {object} resolvers - a collection of resolve functions and maps
 * @param {boolean} [showHidden=false] - show hidden content in results
 * @returns {React.Element} React component instances
 */
export function renderContentFromMetadata(contentMetadata: object | any[], overrideProps?: object, resolvers: object, showHidden?: boolean | undefined): any;
/**
 * Check if metadata is valid
 *
 * @param {object} metadata
 * @param {Function} [onValidationFailure]
 */
export function validateMetadata(metadata: object, onValidationFailure?: Function | undefined): void;
/**
 * Find item in metadata that match a filter function.
 * This function will recurse into nested content.
 * Assumes that the component metadata has already been resolved.
 *
 * @param {object} metadata - component metadata
 * @param {Function} filterFn - predicate function
 * @param {boolean} [skipHidden=true] - skip hidden content in results
 * @param {Array<any>} list - initial list to populate
 * @returns {Array<any>} flat array of matching metadata
 */
export function findComponentFromMetadata(metadata: object, filterFn: Function, skipHidden?: boolean | undefined, list?: Array<any>): Array<any>;
/**
 * Find items in metadata that match a filter function.
 * This function will navigate the nested hierarchy and return a flat array
 * of the matches. It should not be used for rendering. Works great for validation.
 * Assumes that the content metadata has already been resolved.
 *
 * @param {object|Array} contentMetadata - content metadata or an array of metadata
 * @param {Function} filterFn - predicate function
 * @param {boolean} [skipHidden=true] - skip hidden content in results
 * @param {Array<any>} [list] - initial list to populate
 * @returns {Array<any>} flat array of matching metadata
 */
export function findContentFromMetadata(contentMetadata: object | any[], filterFn: Function, skipHidden?: boolean | undefined, list?: any[] | undefined): Array<any>;
/**
 * Resolve content
 * @param {object} metadata
 * @param {object} param1
 */
export function resolveContent(metadata: object, { resolveContent: contentResolver, resolveContentOptions }?: object): any;
/**
 * Finds component props by ID in nested content recursively
 *
 * @param {object} [meta] Metadata object
 * @param {string} id ID of the component
 *
 * @returns {object|null} component props or false if no props or component found
 */
export function findComponentPropsById(meta?: object, id: string): object | null;
export function prepareCallbacksInComponentProps({ resolvers, id, componentProps, }: object): object;
export function isComponentUnresolved(Component: any): boolean;
/**
 * Resolve component or data type string to real component using component map.
 * Note: the Jutro component map will be used if a component cannot be resolved
 * with the componentMap parameter
 * Note: 'type' and 'metadataPath' are sent to resolveComponent functions passed in with resolvers
 */
export type ComponentInfo = {
    component: React.Component | string;
    componentProps?: any;
};
import React from "react";
