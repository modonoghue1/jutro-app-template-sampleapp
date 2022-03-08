/// <reference types="react" />
import PropTypes from 'prop-types';
/**
 * Helper PropTypes function which makes sure that all of the children are of the same type as `componentType`
 *
 * @param {object} componentType - The React component definition to ensure all children are a type of
 * @returns {PropTypeFunction} - The function that will ensure all children are of the given `componentType`
 */
declare function createChildComponentTypeChecker<P extends Record<string, unknown>, T extends React.ComponentType<P>>(componentType: T): PropTypes.Requireable<import("react").ReactElement<P, T> | import("react").ReactElement<P, T>[]>;
/**
 * Helper PropTypes function which makes sure that all of the children are one of the same types in given
 * `componentTypes` list.
 *
 * @param {Array<any>} componentTypes - The list of React component definitions to ensure all children are a type of
 * @returns {PropTypeFunction} - The function that will ensure all children are of the given `componentType`
 */
declare function createOneOfChildComponentTypeChecker(componentTypes: any): (props: any, propName: any, componentName: any) => void;
/**
 * Helper PropTypes function which makes sure that an altTagText is defined whenever image is used
 *
 * @returns {PropTypeFunction} - The function that throw an error if the image is defined but the alt text is not
 */
declare function createAltTextWithImageChecker(): (props: any, propName: any) => Error | undefined;
/**
 * Wraps propType to add .isRequired validation
 *
 * @param {PropTypeFunction} propType prop type function
 * @returns {PropTypeFunction} wrapped prop type function
 */
export declare const wrapWithIsRequired: <T>(propType: PropTypes.Validator<T>) => PropTypes.Requireable<T>;
declare type ReactElementWithId = React.ReactElement<{
    id: string;
}> | boolean | null | undefined;
/**
 * Bunch of custom, reusable PropTypes
 */
export declare const ComponentPropTypes: {
    childOfComponentType: typeof createChildComponentTypeChecker;
    oneOfChildOfComponentTypes: typeof createOneOfChildComponentTypeChecker;
    altTextDefinedWithImage: typeof createAltTextWithImageChecker;
    all: (...propTypes: any[]) => PropTypes.Requireable<unknown>;
    enabledOn: (propType: any, anotherProp: any, anotherPropValue: any) => PropTypes.Requireable<unknown>;
    withLength: <T>(expectedLengthExpression: (props: {
        [key: string]: unknown;
    }) => number) => PropTypes.Requireable<T[]>;
    elementsWithId: PropTypes.Requireable<ReactElementWithId | ReactElementWithId[]>;
};
export {};
