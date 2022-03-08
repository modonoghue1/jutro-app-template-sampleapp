/**
 * IntlElement
 * @type {React.FC<PropTypes.InferProps<typeof intlElementPropTypes>>}
 *
 * @metadataType element
 */
export const IntlElement: React.FC<PropTypes.InferProps<typeof intlElementPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace intlElementPropTypes {
    export const id: PropTypes.Validator<string>;
    export const tag: PropTypes.Validator<string>;
    export { intlMessageShape as children };
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
