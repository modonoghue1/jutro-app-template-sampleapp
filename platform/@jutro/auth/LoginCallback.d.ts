import React from 'react';
declare type OktaErrorProps = {
    error: Error;
};
export declare type LoginCallbackProps = {
    errorComponent: React.ComponentType<OktaErrorProps>;
};
export declare const LoginCallback: React.FC<LoginCallbackProps>;
export {};
