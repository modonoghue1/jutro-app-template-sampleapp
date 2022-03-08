export const alignments: string[];
/**
 * PanelHeader
 * @type {React.FC<PropTypes.InferProps<typeof panelHeaderPropTypes>>}
 */
export const PanelHeader: React.FC<PropTypes.InferProps<typeof panelHeaderPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace panelHeaderPropTypes {
    export const id: PropTypes.Requireable<string>;
    export const className: PropTypes.Requireable<string>;
    export const alignment: PropTypes.Requireable<string>;
    export { intlMessageShape as title };
    export { intlMessageShape as subTitle };
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
