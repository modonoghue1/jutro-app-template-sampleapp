export namespace inlineLoaderPropTypes {
    export const className: PropTypes.Requireable<string>;
    export const loading: PropTypes.Requireable<boolean | Promise<unknown> | (Promise<unknown> | null | undefined)[]>;
    export const loadingIcon: PropTypes.Requireable<string>;
    export { intlMessageShape as loadingMessage };
    export const successIcon: PropTypes.Requireable<string>;
    export { intlMessageShape as successMessage };
}
/**
 * InlineLoader
 * @type {React.FC<PropTypes.InferProps<typeof inlineLoaderPropTypes>>}
 *
 * @metadataType element
 */
export const InlineLoader: React.FC<PropTypes.InferProps<typeof inlineLoaderPropTypes>>;
import PropTypes from "prop-types";
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import React from "react";
