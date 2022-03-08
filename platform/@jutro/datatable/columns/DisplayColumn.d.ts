/**
 * @typedef {object} DisplayColumnProps
 * @prop {string} [fieldDatatype]
 * @prop {object} [valueProps]
 */
/**
 * @returns {null} - The DisplayColumn component does not render anything
 *
 * @metadataType container
 */
export const DisplayColumn: React.FC<import("../types/types").TableColumnProps & DisplayColumnProps>;
export type DisplayColumnProps = {
    fieldDatatype?: string | undefined;
    valueProps?: object;
};
import React from "react";
