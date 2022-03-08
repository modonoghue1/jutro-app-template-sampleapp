import React from 'react';
import { ReactComponentLike } from 'prop-types';
import { MicroAppPropsType } from './types';
declare const microAppCache: Map<string, React.LazyExoticComponent<React.ComponentType<any>>>;
export declare const getMicroAppCache: () => typeof microAppCache;
declare type MicroAppOptionalProps = MicroAppPropsType & {
    loaderComponent?: ReactComponentLike;
    errorBoundaryComponent?: ReactComponentLike;
};
declare type DevProps = MicroAppOptionalProps & {
    remoteScope?: string;
};
declare type RegularProps = MicroAppOptionalProps & {
    remoteScope: string;
};
export declare type MicroAppProps = RegularProps & {
    devProps?: DevProps;
};
export declare const MicroApp: React.FC<MicroAppProps>;
export {};
