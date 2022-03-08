import React from 'react';
import { LoginCallbackProps } from './LoginCallback';
export declare const OPENID_SCOPE = "openid";
export declare const DEFAULT_EXPIRE_EARLY_SECONDS = 30;
export declare const AUTO_RENEW = true;
export declare const DEFAULT_STORAGE = "localStorage";
export declare type AuthProviderProps = {
    /**
     * A component to be rendered
     */
    authErrorComponent: LoginCallbackProps['errorComponent'];
};
/**
 * A HOC that wraps children components in Okta Security. This will initialize the
 * okta configuration and set up a callback route to handle the login redirect.
 * Wrapping will only happen if authentication is enabled, otherwise the original
 * component will be returned, unwrapped.
 */
export declare const AuthProvider: React.FC<AuthProviderProps>;
