/**
 * Dynamic style sheet class.
 * This class can be used to manage a dynamic stylesheet injected into the DOM.
 * Note: This is not a React class. The consumer is responsible for calling mount/unmount appropriately.
 */
export class DynamicStyleSheet {
    /**
     * Mount a dynamic style sheet. This will add it from the DOM.
     *
     * @param {string} name
     */
    mount(name?: string): void;
    name: string | undefined;
    styleTag: any;
    /**
     * Unmount a dynamic style sheet. This will remove it from the DOM.
     */
    unmount(): void;
    /**
     * Create a <style> tag in document <head>
     *
     * @param {string} name - name of style tag
     * @returns {object} style tag created
     */
    createStyleTag(name: string): object;
    /**
     * Remove a <style> tag from document <head>
     *
     * @param {object} styleTag - style tag to remove
     */
    removeStyleTag(styleTag: object): void;
    /**
     * Get the stylesheet associated with the style tag
     *
     * @returns {object} stylesheet associated with style tag
     */
    getStyleSheet(): object;
    /**
     * Find the index of a rule in the stylesheet
     *
     * @param {string} selector - css rule selector (eg. 'body', '.classname')
     * @returns {number} index of found rule; -1 if not found
     */
    findRuleIndex(selector: string): number;
    /**
     * Add a single rule to a stylesheet. If a rule already exists for the selector,
     * it will be replaced.
     *
     * @param {string} selector - css rule selector (eg. 'body', '.classname')
     * @param {object} properties - properties to define for rule
     */
    addRule(selector: string, properties: object): void;
    /**
     * Apply an array of rules to the stylesheet
     *
     * @param {Array<{selector: string, properties: object}>} styleRules - array of style rules to apply
     */
    applyRules(styleRules: Array<{
        selector: string;
        properties: object;
    }>): void;
}
