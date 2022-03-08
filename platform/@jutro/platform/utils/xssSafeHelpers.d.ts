/**
 * Checks if URL is safe
 *
 * @param {string|undefined} url
 * @returns {boolean}
 */
export function isSafeUrl(url: string | undefined): boolean;
/**
 * Sanitizes url (removes unsafe things)
 *
 * @param {string | undefined} url
 * @returns {string | undefined} sanitized url
 */
export function sanitizeUrl(url: string | undefined, allowNoLeadingSlash?: boolean): string | undefined;
/**
 * Sanitizes url of NavLink `to` prop
 *
 * @param {string|import('@jutro/prop-types').ToShape | undefined} to
 * @returns {string|import('@jutro/prop-types').ToShape | undefined} sanitized url
 */
export function sanitizeRouterTo(to: string | import('@jutro/prop-types').ToShape | undefined): string | import('@jutro/prop-types').ToShape | undefined;
/**
 * Sanitizes props object
 *
 * @template {import('lodash').Dictionary} T
 * @param {T} props
 */
export function sanitizeProps<T extends import("lodash").Dictionary<any>>(props: T): { [P in keyof T]: T[keyof T]; };
/**
 * Removes dangerous props
 *
 * @template {import('lodash').Dictionary} T
 * @param {T} props
 */
export function removeDangerousProps<T extends import("lodash").Dictionary<any>>(props: T): Pick<T, Exclude<keyof T, "dangerouslySetInnerHTML">>;
