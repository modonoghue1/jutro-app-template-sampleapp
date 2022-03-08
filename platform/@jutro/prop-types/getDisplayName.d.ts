/**
 * Helper function that returns a displayName for a component or class, which is either the actual .displayName or the
 * .name as a fallback (.constructor.name in the case of a class).
 *
 * @param component The component or class to get the display name for
 * @param fallback Overrides .constructor.name fallback
 */
export declare function getDisplayName(component?: any, fallback?: string): string | undefined;
