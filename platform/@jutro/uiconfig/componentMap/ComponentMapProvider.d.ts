import React from 'react';
import { ComponentMapType, ResolveComponentType } from '../types';
export declare type ComponentMapContextType = ResolveComponentType;
export declare const ComponentMapContext: React.Context<ResolveComponentType>;
export declare const extendResolver: (componentMapExtensions: ComponentMapType, resolveComponent: ResolveComponentType) => ResolveComponentType;
export declare type ComponentMapProviderPropTypes = {
    componentMapExtensions?: ComponentMapType | null;
    resolveComponent?: ResolveComponentType;
};
export declare const ComponentMapProvider: React.FC<ComponentMapProviderPropTypes>;
