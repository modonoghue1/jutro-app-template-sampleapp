/**
 * Create a HOC wrapper around a component that passes in context with
 * an optional mapping from context to props
 *
 * @param {Record<string, any>} config - configuration for wrapped context HOC
 * @returns {React.ComponentType} wrapped component
 * @example
 * export default createContextConsumerHOC({
 *     component: Card,
 *     context: AccordionContext,
 *     displayName: 'AccordionCardTest',
 *     mapContextToProps: (existingProps, context) => {
 *         const {id} = existingProps;
 *         const {isAccordionOpen, toggleAccordionOpen} = context;
 *         return {
 *             isOpen: isAccordionOpen(id),
 *             onToggleOpen: toggleAccordionOpen
 *         };
 *     }
 * });
 */
export default function createContextConsumerHOC(config: Record<string, any>): React.ComponentType;
import React from "react";
