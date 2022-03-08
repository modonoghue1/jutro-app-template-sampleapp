import { Options } from './common';
/**
 * Shallow merge defaults with overrides but also shallow
 * merge their headers property
 */
export declare function fastOptionsMerge(defaults?: Options, overrides?: Options): Options;
