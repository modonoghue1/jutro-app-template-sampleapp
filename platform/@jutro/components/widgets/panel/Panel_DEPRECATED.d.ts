/**
 * A container for child components. You can set a title and subtitle through the props.
 *
 * This component is a typical wrapper for a form, but can have any content.
 *
 * @type {React.FC<PropTypes.InferProps<typeof panelPropTypes>>}
 *
 * @metadataType container
 * @deprecated
 */
export const Panel: React.FC<PropTypes.InferProps<typeof panelPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace panelPropTypes {
    export const id: PropTypes.Validator<string>;
    export const className: PropTypes.Requireable<string>;
    export const alignment: PropTypes.Requireable<string>;
    export const children: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    export { intlMessageShape as title };
    export { intlMessageShape as subTitle };
    export const renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
    export const headerClass: PropTypes.Requireable<string>;
    export const fluid: PropTypes.Requireable<boolean>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
