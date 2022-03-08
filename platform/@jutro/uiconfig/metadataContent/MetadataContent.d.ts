import React from 'react';
import { IntlMessageShape, ResolveFormValidationType } from '@jutro/prop-types';
import { ComponentMapType, ResolveComponentType } from '../types';
declare type MetadataContentProps = {
    /**
     * content metadata or an array of metadata
     */
    uiProps: Record<string, unknown> | unknown[];
    /**
     * override props by all, type or id
     */
    overrideProps?: Record<string, unknown>;
    /**
     * Resolve validation from json schema
     */
    resolveValidation?: (id: string, path: string, value?: unknown) => IntlMessageShape[];
    /**
     * Resolve form validation from json schema
     */
    resolveFormValidation?: ResolveFormValidationType;
    /**
     * Resolve data props from json schema
     */
    resolveDataProps?: (id: string, path: string) => Record<string, unknown>;
    /**
     * Resolve component from string and/or datatype
     */
    resolveComponent?: ResolveComponentType;
    /**
     * Resolve value from data using path
     */
    resolveValue?: (id: string, path: string) => unknown;
    /**
     * Resolve callback string to callback function
     */
    resolveComponentMap?: ComponentMapType;
    /**
     * Resolve class names to css module names
     */
    resolveClassNameMap?: Record<string, unknown>;
    /**
     * Resolve callback string to callback function
     */
    resolveCallbackMap?: Record<string, unknown>;
    /**
     * show hidden content in results
     */
    showHidden?: boolean;
};
export declare const MetadataContent: React.FC<MetadataContentProps>;
export {};
