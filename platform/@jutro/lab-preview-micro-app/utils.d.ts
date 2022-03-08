import { MicroAppPropsType, SimpleObject } from './types';
export declare const formatPackageName: (remoteScope: string) => string;
export declare const buildRendererName: (remoteScope: string) => string;
export declare const buildUnmounterName: (remoteScope: string) => string;
export declare const buildRendererTargetId: (remoteScope: string) => string;
export declare const extractRemoteScope: (rendererTargetId: string) => string;
export declare const getNamespacedProps: (allProps: SimpleObject) => Required<MicroAppPropsType>;
export declare const applyDevProps: (props: SimpleObject) => SimpleObject;
