import { SimpleObject } from './types';
/**
 * Please see https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import on why we cannot dynamically
 * derive these from a list (package names must be explicit in import and require for static analysis).
 *
 * Please see https://github.com/webpack/webpack/issues/5360 on why we cannot use dynamic imports
 * (it was impossible to `.catch` errors for missing packages, even though the docs say we should be able to catch).
 */
export declare const getSharedLibs: () => SimpleObject;
