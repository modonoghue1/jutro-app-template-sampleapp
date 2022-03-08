/**
 * Alerts the user with a message and title
 * Note: this method is temporary and should be replaced with an overrideable default
 * so that each app can decide how best to present this information to the user (eg. native alert,
 * custom alert, toast, etc)
 *
 * @param {string} message
 * @param {string} title
 * @param {Function} callback
 * @param {object} modalContext
 */
export function showAlert(message: string, title: string, callback?: Function, modalContext?: object): void;
