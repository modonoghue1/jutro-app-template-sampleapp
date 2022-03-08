import type { BreakpointConsumerProps, BreakpointConsumerPropsWithoutDeviceProps } from './breakpoint.utils';
import { DeviceType } from '../types';
export declare type BreakpointUtils<T, P extends BreakpointConsumerPropsWithoutDeviceProps<T>> = {
    breakpointProps: P;
    applyBreakpoint: (componentProps: T) => P;
    breakpoint: DeviceType;
};
interface UseBreakpoint {
    <T>(props: BreakpointConsumerProps<T>): BreakpointUtils<T, BreakpointConsumerPropsWithoutDeviceProps<T>>;
}
/**
 * Applies breakpoint to component
 */
export declare const useBreakpoint: UseBreakpoint;
export {};
