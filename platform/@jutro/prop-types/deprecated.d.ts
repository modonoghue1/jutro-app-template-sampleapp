/**
 * deprecated component property
 * @param {Function} validator
 * @param {string} [droppedTargetVersion="@next"] - version when property will be removed
 * @param {string} [additionalInfo=""] - additional message for deprecated property
 * @param {string} [ignoredValue=undefined] - possibly ignored value, e.g. the one used internally as a default
 *
 * @returns {PropTypes.Validator} propType
 */
export function deprecated(validator: Function, droppedTargetVersion?: string | undefined, additionalInfo?: string | undefined, ...ignoredValues: any[]): PropTypes.Validator<any>;
/**
 * deprecate all properties
 * @param {object} validators Object of prop validaors
 * @param {string} [droppedTargetVersion="@next"] - version when property will be removed
 * @param {string} [additionalInfo=""] - additional message for deprecated property
 * @param {string} [ignoredValue=undefined] - possibly ignored value, e.g. the one used internally as a default
 *
 * @returns {object} Object of deprecated prop validators
 */
export function deprecateAll(validators: object, droppedTargetVersion?: string | undefined, additionalInfo?: string | undefined, ...ignoredValues: any[]): object;
/**
 * Reset warning messages for specific component
 *
 * @param {string} [component]
 */
export function resetDeprecatedWarnings(component?: string | undefined): void;
/**
 * Take the props passed to a component and transform any deprecated props to their new counterparts
 * @param {object} props the props that were passed to the component instance
 * @param {object} docgenInfo the docgen info for the component
 * @returns {object} transformed props
 */
export function transformDeprecatedProps(props: object, docgenInfo: object, transformMap?: {}): object;
export const JUTRO_WARNING_PREFIX: "JUTRO DEPRECATION WARNING";
export function oneOfWithDeprecations(allowedItems: string[], deprecatedItems: string[], version: string): PropTypes.Requireable<any>;
export function withTransformedProps(Component: any, transformMap?: object): any;
import PropTypes from "prop-types";
