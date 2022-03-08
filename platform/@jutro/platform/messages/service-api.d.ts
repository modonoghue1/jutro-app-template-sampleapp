/**
 * Gets the message service (an implementation of MessageInterface).
 * @returns {object} - The message service
 * @throws {Error} - If unable to resolve a message service
 */
export function getMessageService(): object;
/**
 * Returns a message for the given key, either from the messageProps or messages file.
 * @param {string} messageKey - The message key
 * @param {Record<string, any> | null} [messageProps] - Component messageProps object
 * @param {Record<string, any>} [messages] - Default messages object
 * @returns {string} message for the key
 */
export function getMessageProp(messageKey: string, messageProps?: Record<string, any> | null | undefined, messages?: Record<string, any> | undefined): string;
/**
 * Contract for a service that provides locale-sensitive application messages.
 * @type {Contract}
 */
export const MessageInterface: any;
