/**
 * Renders a table. You can use it to display data from a model.
 *
 * @type {React.FC<PropTypes.InferProps<typeof tablePropTypes>>}
 *
 * @metadataType container
 * @deprecated
 */
export const Table: React.FC<PropTypes.InferProps<typeof tablePropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace tablePropTypes {
    export const title: PropTypes.Requireable<string | ((...args: any[]) => any)>;
    export const renderTitle: PropTypes.Requireable<(...args: any[]) => any>;
    export const className: PropTypes.Requireable<string>;
    export const children: PropTypes.Requireable<PropTypes.ReactNodeLike[]>;
    export const phone: PropTypes.Requireable<object>;
    export const phoneWide: PropTypes.Requireable<object>;
    export const tablet: PropTypes.Requireable<object>;
    export const renderTitleAction: PropTypes.Requireable<(...args: any[]) => any>;
    export const columnsProportion: PropTypes.Requireable<(number | null | undefined)[]>;
    export { intlMessageShape as placeholder };
    export const renderPhoneCardComponent: PropTypes.Requireable<(...args: any[]) => any>;
    export const titleId: PropTypes.Requireable<string>;
    export const titlePosition: PropTypes.Requireable<string>;
    export const data: PropTypes.Requireable<(PropTypes.InferProps<{
        /**
         * Optional string for generating keys for rows
         */
        id: PropTypes.Requireable<string>;
    }> | null | undefined)[]>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
