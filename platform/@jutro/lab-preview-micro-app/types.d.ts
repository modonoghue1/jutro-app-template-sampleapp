import { ElementType, lazy } from 'react';
import { History } from 'history';
import { MicroAppLocationState } from './MicroAppStarter';
export declare type SimpleObject = Record<string, unknown>;
export declare type LazyComponentFactory = Parameters<typeof lazy>[0];
export interface MicroAppWindow extends Window {
    [key: string]: unknown;
}
export declare const getWindowAsObject: () => MicroAppWindow;
export declare type LaunchPropOverridesProps = {
    routerBasename?: string;
    routerHistory?: History<unknown>;
    [_: string]: unknown;
};
export declare type RouterBindingProps = {
    shellHistory?: History<MicroAppLocationState>;
};
export declare type JutroProps = {
    launchPropOverrides?: LaunchPropOverridesProps;
    configOverrides?: SimpleObject;
    componentMapExtensions?: Record<string, ElementType | string>;
    routerBinding?: RouterBindingProps;
};
export declare type MicroAppPropsType = {
    jutro?: JutroProps;
    [_: string]: unknown;
};
export declare type SuccessfulLoadingType = {
    fileName: string;
    content: string;
};
export declare type FailedLoadingType = {
    fileName: string;
    error: Error;
};
export declare type FileLoadingType = SuccessfulLoadingType | FailedLoadingType;
export declare type LoadingPromiseType = Promise<FileLoadingType>;
export declare type MicroAppRendererType = (targetElementId: string, props: SimpleObject) => unknown;
export declare type MicroAppUnmounterType = (targetElementId: string) => void;
