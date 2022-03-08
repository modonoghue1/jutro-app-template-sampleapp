/**
 * Shallow render a component that uses a context.consumer
 * and return the results
 *
 * @param {React.ReactNode} node - Node to shallow render
 * @param {Record<string, any>|Array<Record<string, any>>} newContext - new context to pass into the component, accepts array of contexts for cases where ContextConsumer is used
 * @param {Record<string, any>} oldContext - old context to pass into the component
 * @returns {ShallowWrapper} shallow rendered component
 */
export function shallowContextConsumer(node: React.ReactNode, newContext: Record<string, any> | Array<Record<string, any>>, oldContext: Record<string, any>): any;
import React from "react";
