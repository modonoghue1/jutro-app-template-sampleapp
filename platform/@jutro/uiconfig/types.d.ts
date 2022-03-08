import React from 'react';
export declare type MetadataComponentType = React.Component | string;
export declare type ComponentInfo = {
    component: MetadataComponentType;
    componentProps?: Record<string, unknown>;
};
export declare type ComponentMapType = Record<string, unknown>;
export declare type ResolveComponentType = (component: MetadataComponentType, datatype: string, componentMap: ComponentMapType) => ComponentInfo | undefined;
