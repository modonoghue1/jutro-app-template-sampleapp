/**
 * Handles the additions after the specific '@import' node
 * @param {Object} atRuleNode - postcss atRule node which is used as reference for the addition
 * @param {String} nodeImportName - import name of the node
 * @param {Array<object>} additions - array containing objects representing each import to be added.
 */
export function addAfter(atRuleNode: any, nodeImportName: string, additions: Array<object>): void;
/**
 * Handles the additions before the specific '@import' node
 * @param {Object} atRuleNode - postcss atRule node which is used as reference for the addition
 * @param {String} nodeImportName - import name of the node
 * @param {Array<object>} additions - array containing objects representing each import to be added.
 */
export function addBefore(atRuleNode: any, nodeImportName: string, additions: Array<object>): void;
/**
 * Creates a new '@import' rule with the given import
 * @param {String} importName - import param to be added to the rule
 */
export function createImportRule(importName: string): import("postcss").AtRule;
/**
 * Checks if there is any addition to be made before or aftere the current rule node.
 */
export function shouldAddImport(nodeImportName: any, additions: any): any;
/**
 * Checks if current atRuleNode import should be removed
 */
export function shouldRemoveImport(atRuleNode: any, nodeImportName: any, removals?: any[], additions?: any[]): boolean;
/**
 * Checks if current atRuleNode import should be replaced
 */
export function shouldReplaceImport(nodeImportName: any, replacements?: any[]): boolean;
/**
 * Replaces the specified '@import';
 */
export function replaceImport(atRuleNode: any, nodeImportName: any, replacements?: any[]): void;
