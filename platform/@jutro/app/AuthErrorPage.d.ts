import React from 'react';
declare type AuthError = {
    name: string;
    message: string;
    errorCode: string;
};
declare type AuthErrorPageProps = {
    error: AuthError;
};
export declare const AuthErrorPage: React.FC<AuthErrorPageProps>;
export {};
