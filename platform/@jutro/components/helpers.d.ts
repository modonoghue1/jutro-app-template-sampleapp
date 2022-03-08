/**
 * trackMethod
 * @param {Function} callback
 * @param {string} topic
 * @param {any} payload
 * @returns {function(): void}
 */
export function trackMethod(callback: Function, topic: string, payload: any): () => void;
export function getFromArray<T>(array: T[], value: T, defaultValue?: T | undefined): T | undefined;
