/**
 * @typedef {object} ActionItemProps
 * @prop {string} [icon] Optional icon name
 * @prop {Function} [onClick] Action for click event - ignored if `isEditTrigger` enabled
 * @prop {IntlMessageShape} [label] Label for action
 * @prop {boolean} [isEditTrigger] Determines if action triggers edit mode for row
 * @prop {boolean} [triggerOnRowClick] Determines if row click should trigger action
 * @prop {'icon' | 'link'} [singleActionType] If action is single - determines it should be displayed as icon or link
 * @prop {object} [tooltip] Tooltip props
 */
/**
 * ActionItem
 * @returns {null} - The ActionItem component does not render anything
 *
 * @metadataType action
 */
export const ActionItem: React.FC<ActionItemProps>;
export type ActionItemProps = {
    /**
     * Optional icon name
     */
    icon?: string | undefined;
    /**
     * Action for click event - ignored if `isEditTrigger` enabled
     */
    onClick?: Function | undefined;
    /**
     * Label for action
     */
    label?: IntlMessageShape | undefined;
    /**
     * Determines if action triggers edit mode for row
     */
    isEditTrigger?: boolean | undefined;
    /**
     * Determines if row click should trigger action
     */
    triggerOnRowClick?: boolean | undefined;
    /**
     * If action is single - determines it should be displayed as icon or link
     */
    singleActionType?: "link" | "icon" | undefined;
    /**
     * Tooltip props
     */
    tooltip?: object;
};
import React from "react";
import { IntlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
