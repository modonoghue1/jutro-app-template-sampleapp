/**
 * Render the button with action defined on onclick listener
 *
 * @param {object} actionProps - The action properties provided by application
 * @param {object} row - Current row to be rendered from the data table
 * @param {number | string} rowId - The id of the current row
 * @param {Function} onEditStart - is called when clicked on action item with `isEditTrigger` prop enabled
 * @returns {React.ReactElement}
 */
export function renderOneAction(actionProps: object, row: object, rowId: number | string, onEditStart: Function, translator?: (str: any) => any): React.ReactElement;
/**
 * Render the button with action defined on onclick listener
 *
 * @param {object} actionProps - The action properties provided by application
 * @param {object} row - Current row to be rendered from the data table
 * @param {number | string} rowId - The id of the current row
 * @param {number} key - Unique key for the component
 * @param {Function} onEditStart - is called when clicked on action item with `isEditTrigger` prop enabled
 * @returns {React.ReactElement}
 */
export function renderActionButton({ icon, onClick, className, isEditTrigger, isOpen, label, ariaLabel, disabled, tooltip, }: object, row: object, rowId: number | string, key: number | undefined, onEditStart: Function, translator?: (str: any) => any): React.ReactElement;
/**
 * Render ellipsis with dropdown menu of actions
 *
 * @param {object} actionsProps - The action's children properties provided by application
 * @param {object} row - Current row to be rendered from the data table
 * @param {number | string} rowId - The id of the current row
 * @param {Function} onEditStart - is called when clicked on action item with `isEditTrigger` prop enabled
 * @returns {React.ReactElement}
 */
export function renderActionMenu(actionsProps: object, row: object, rowId: number | string, onEditStart: Function, hideIconsInDropdown: any, translator?: (str: any) => any): React.ReactElement;
/**
 * ActionColumn
 * @returns {null} - The ActionColumn component does not render anything
 *
 * @metadataType container
 */
export const ActionColumn: React.FC<import("../types/types").TableColumnProps & {
    hideIconsInDropdown: boolean;
    tooltip: false | object;
}>;
import React from "react";
