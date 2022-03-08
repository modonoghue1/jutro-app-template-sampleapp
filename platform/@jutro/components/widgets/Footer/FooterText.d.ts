/**
 * The `FooterText` component is designed as a simple component presenting text inside the `Footer` container.
 *
 * @type {React.FC<PropTypes.InferProps<typeof footerTextPropTypes>>}
 *
 * @metadataType element
 */
export const FooterText: React.FC<PropTypes.InferProps<typeof footerTextPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace footerTextPropTypes {
    export const className: PropTypes.Requireable<string>;
    export { intlMessageShape as text };
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
