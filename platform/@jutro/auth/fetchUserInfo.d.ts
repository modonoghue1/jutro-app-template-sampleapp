import { AccessToken, UserClaims } from '@okta/okta-auth-js';
/**
 * Helper function to get okta user info without ID token in storage
 */
export declare const fetchUserInfo: (accessToken: AccessToken) => Promise<UserClaims>;
