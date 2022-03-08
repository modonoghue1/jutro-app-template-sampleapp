/**
 * Creates auth options using a bearer token to pass into HttpRequestBuilder.
 *
 * @example
 * HttpRequestBuilder().addHandler(authTokenHandler).build()
 */
export declare const authTokenHandler: {
    onAuth: () => Promise<{
        headers: {
            Authorization: string;
            'GW-Tenant': string;
            'GW-User': string;
        };
    }>;
};
