import React from 'react';
import { AuthState as AuthStateOkta, OktaAuth, UserClaims, OktaAuthOptions } from '@okta/okta-auth-js';
export declare type AuthStateProviderProps = OktaAuthOptions & {
    /**
     * Pre configured OktaAuth instance
     */
    oktaAuth?: OktaAuth;
};
export declare type AuthState = {
    isAuthenticated: boolean;
    isPending: boolean;
    accessToken: Nullable<string>;
    idToken: Nullable<string>;
    userInfo: Nullable<UserClaims>;
    error?: AuthStateOkta['error'];
};
export interface AuthStateContextValue {
    authState: AuthState;
    oktaAuth: OktaAuth;
}
export declare const AuthStateContext: React.Context<AuthStateContextValue>;
export declare const useAuthState: () => AuthStateContextValue;
export declare const transformAuthState: OktaAuthOptions['transformAuthState'];
/**
 * Initiate Okta's OktaAuth and store auth state
 * Similar to okta-react's Secure component
 */
export declare const AuthStateProvider: React.FC<AuthStateProviderProps>;
