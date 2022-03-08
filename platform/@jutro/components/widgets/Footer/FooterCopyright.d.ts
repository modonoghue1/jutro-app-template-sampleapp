/**
 * The `FooterCopyright` component is designed as a simple component presenting copyright inside the `Footer` container.
 *
 * @type {React.FC<PropTypes.InferProps<typeof footerCopyrightPropTypes>>}
 *
 * @metadataType element
 */
export const FooterCopyright: React.FC<PropTypes.InferProps<typeof footerCopyrightPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace footerCopyrightPropTypes {
    const className: PropTypes.Requireable<string>;
    const messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * Location aware text of copyright
         */
        copyrightMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
}
export {};
