import React from 'react';
import { LocationListener, History } from 'history';
export declare const MicroAppRouterBinding: React.FC<MicroAppRouterBindingType>;
export declare const useShellAppRouterListener: (listener: LocationListener<MicroAppLocationState>, shellHistory: History<MicroAppLocationState>) => void;
export declare const useMicroAppRouterListener: (listener: LocationListener<MicroAppLocationState>, shellHistory: History<MicroAppLocationState>, microAppHistory: History<MicroAppLocationState>) => void;
export declare type MicroAppLocationState = {
    externalRouting: boolean;
};
export declare type MicroAppRouterBindingType = {
    shellHistory: History<MicroAppLocationState>;
    routerBasename?: string;
};
