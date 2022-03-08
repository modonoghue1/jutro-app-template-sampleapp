/**
 * Route which requires authentication
 * Inspired by Octa's SecureRoute
 * https://github.com/okta/okta-oidc-js/blob/master/packages/okta-react/src/SecureRoute.js
 * https://github.com/okta/okta-oidc-js/blob/8fe896a383fc5e02999d63068175e72bec538115/packages/okta-react/src/SecureRoute.js
 *
 * @type {React.FC<PropTypes.InferProps<typeof secureRoutePropTypes>>}
 */
export const SecureRoute: React.FC<PropTypes.InferProps<typeof secureRoutePropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare const secureRoutePropTypes: any;
export {};
