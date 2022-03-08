import { DeviceType, Breakpoints, BreakpointType } from '../types';
export declare type BreakpointConsumerProps<T> = T & Partial<Record<DeviceType, Partial<Nullable<T>>>>;
export declare type BreakpointConsumerPropsWithoutDeviceProps<T> = Omit<BreakpointConsumerProps<T>, BreakpointType>;
interface ExtendWithBreakpointValues {
    <T>(props: BreakpointConsumerProps<T>, breakpoint: DeviceType): BreakpointConsumerPropsWithoutDeviceProps<T>;
}
export declare const breakpointExtensions: Record<DeviceType, <T>(props: BreakpointConsumerProps<T>) => BreakpointConsumerProps<T>>;
export declare const extendWithBreakpointValues: ExtendWithBreakpointValues;
export declare const getBreakpointPxValue: (device: DeviceType, rootElement?: Element | undefined) => number | false;
export declare const getBreakpoints: (rootElement?: Element | undefined) => Breakpoints;
export declare const breakpoints: BreakpointType[];
export {};
