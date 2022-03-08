/// <reference types="react" />
import { TokenManager, JWTObject, SigninWithRedirectOptions } from '@okta/okta-auth-js';
import { AuthState } from './AuthStateProvider';
export interface AuthContextValue extends AuthState {
    authenticated: AuthState['isAuthenticated'];
    /**
     * Okta JS SKD TokenManager
     * See more https://github.com/okta/okta-auth-js#tokenmanager
     */
    tokenManager: TokenManager;
    /**
     * Return the current access token stored in auth state
     */
    getAccessToken: () => string | undefined;
    /**
     * Returns the current user id token stored in auth state
     */
    getIdToken: () => string | undefined;
    /**
     * Provides a functionality to allocate token for extra scopes.
     */
    allocateToken: (scopes: string[], newTokenKey: string) => Promise<string | undefined>;
    /**
     * Given an token, return the decoded token info
     */
    decodeToken: (token: string) => JWTObject;
    /**
     * Retrieve pre-decoded id token information
     */
    getDecodedIdToken: () => JWTObject | undefined;
    /**
     * Retrieve pre-decoded access token information
     */
    getDecodedAccessToken: () => JWTObject | undefined;
    /**
     * Log a user into the application
     */
    login: (fromUri?: string, additionalParams?: SigninWithRedirectOptions) => Promise<void>;
    /**
     * Log the current user out of the application
     * @returns logout promise
     */
    logout: (fromUri?: string) => Promise<void>;
}
export declare const AuthContext: import("react").Context<AuthContextValue>;
export declare const useAuth: () => AuthContextValue;
