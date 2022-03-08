/**
 * Render the button with action defined on onclick listener
 * @param {object} props - Radio Button props
 * @param {object} option - Option for the current row
 * @param {string} value - Value for the current row
 * @param {Function} onValueChange - Callback for value change
 * @param {object} otherProps - Other props to pass to radio button
 * @returns {React.ReactElement}
 */
export function renderRadioButton(props: object): React.ReactElement;
/**
 * @typedef {object} RadioColumnProps
 * @prop {Function} [option] The option to be displayed in cell
 */
/**
 * @returns {null} - The RadioColumn component does not render anything
 *
 * @metadataType container
 */
export const RadioColumn: React.FC<import("../types/types").TableColumnProps & RadioColumnProps>;
export type RadioColumnProps = {
    /**
     * The option to be displayed in cell
     */
    option?: Function | undefined;
};
import React from "react";
