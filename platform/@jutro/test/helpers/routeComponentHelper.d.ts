/**
 * Shallow render a component that needs a router parent
 * and return the results
 *
 * @param {React.ReactNode} node - Node to shallow render
 * @param {Record<string, any>} context - context to pass into the component
 * @param {EnzymeSelector} [selector] - optional selector of child to return; if not provided, the first child is returned
 * @param {Array<string>} [initialEntries] - optional array of initial history for the MemoryRouter
 * @param {number} [initialIndex=0] - optional index into the initialEntries
 * @returns {ShallowWrapper} shallow rendered component
 */
export function shallowRouteComponent(node: React.ReactNode, context: Record<string, any>, selector?: any, initialEntries?: string[] | undefined, initialIndex?: number | undefined): any;
/**
 * Mount a component that needs a router parent
 * and return the results
 *
 * @param {React.ReactElement} node - node to mount
 * @param {Record<string, any>} context - context to pass into the component
 * @param {EnzymeSelector} [selector] - optional selector of child to return; if not provided, the first child is returned
 * @param {Array<string>} [initialEntries] - optional array of initial history for the MemoryRouter
 * @param {number} [initialIndex=0] - optional index into the initialEntries
 * @returns {ReactWrapper} mounted component
 */
export function mountRouteComponent(node: React.ReactElement, context: Record<string, any>, selector?: any, initialEntries?: string[] | undefined, initialIndex?: number | undefined): any;
import React from "react";
