/**
 * Decode JWT payload from token
 *
 * @param {string} token JWT token
 * @returns {object} JTW payload
 */
export declare const decodeJWTTokenPayload: (token: string) => Record<string, string>;
