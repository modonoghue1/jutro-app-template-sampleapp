/**
 * @typedef {object} FieldColumnProps
 * @prop {Record<string, any>} [model]
 * @prop {function | string} [basePath]
 * @prop {Record<string, any>} [uiMetadata]
 * @prop {Record<string, any>} [pageProps]
 * @prop {function | boolean} [readOnly]
 */
/**
 * @returns {null} - The FieldColumn component does not render anything
 *
 * @metadataType container
 */
export const FieldColumn: React.FC<import("../types/types").TableColumnProps & FieldColumnProps>;
export function DefaultCell({ row, rowId, innerProps }: {
    row: any;
    rowId: any;
    innerProps: any;
}): JSX.Element | null;
export type FieldColumnProps = {
    model?: Record<string, any> | undefined;
    basePath?: string | Function | undefined;
    uiMetadata?: Record<string, any> | undefined;
    pageProps?: Record<string, any> | undefined;
    readOnly?: boolean | Function | undefined;
};
import React from "react";
