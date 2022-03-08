/**
 * Resolves PropType definition, based on a given key.
 * Given key might be corresponding either to a standard prop-type primitive type,
 * one of standard Jutro shapes (e.g. intlMessageShape), or completely custom one
 * available within optionally provided map.
 *
 * @param {string} type - appropriate name corresponding to a desired prop-type definition
 * @param {[]} [propTypesMap] - optional map holding key-value mappings for custom prop-types definitions
 *
 * @returns {function} - PropType definition to be associated with React component
 */
export function resolvePropType(type: string, propTypesMap?: [] | undefined): Function;
export const JUTRO_PROP_TYPES_SHAPES: {
    [k: string]: string | typeof JutroPropTypes.getDisplayName | (<T>(propType: PropTypes.Validator<T>) => PropTypes.Requireable<T>) | {
        childOfComponentType: <P extends Record<string, unknown>, T_1 extends import("react").ComponentType<P>>(componentType: T_1) => PropTypes.Requireable<import("react").ReactElement<P, T_1> | import("react").ReactElement<P, T_1>[]>;
        oneOfChildOfComponentTypes: (componentTypes: any) => (props: any, propName: any, componentName: any) => void;
        altTextDefinedWithImage: () => (props: any, propName: any) => Error | undefined;
        all: (...propTypes: any[]) => PropTypes.Requireable<unknown>;
        enabledOn: (propType: any, anotherProp: any, anotherPropValue: any) => PropTypes.Requireable<unknown>;
        withLength: <T_2>(expectedLengthExpression: (props: {
            [key: string]: unknown;
        }) => number) => PropTypes.Requireable<T_2[]>;
        elementsWithId: PropTypes.Requireable<(boolean | import("react").ReactElement<{
            id: string;
        }, string | import("react").JSXElementConstructor<any>> | null | undefined) | (boolean | import("react").ReactElement<{
            id: string;
        }, string | import("react").JSXElementConstructor<any>> | null | undefined)[]>;
    } | import("react").WeakValidationMap<JutroPropTypes.IntlMessageObject> | import("react").Requireable<JutroPropTypes.IntlMessageShape> | import("react").Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape> | import("react").Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShapeWithNumber> | import("react").Requireable<JutroPropTypes.DataTypeShapeWithDateTime> | import("react").WeakValidationMap<import("@jutro/prop-types/src/availableValuePropTypes").AvailableValuesIdDisplayNameObject> | import("react").WeakValidationMap<JutroPropTypes.AvailableValuesCodeNameObject> | import("react").Requireable<JutroPropTypes.AvailableValueObjectShape> | import("react").Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType> | import("react").WeakValidationMap<JutroPropTypes.RouterLocation> | import("react").WeakValidationMap<JutroPropTypes.IntlRouterLocation> | import("react").Requireable<JutroPropTypes.ToShape> | import("react").Requireable<JutroPropTypes.IntlToShape> | ((to: JutroPropTypes.IntlToShape | undefined) => to is JutroPropTypes.IntlRouterLocation) | import("react").WeakValidationMap<JutroPropTypes.NavLinkPropTypes> | import("react").WeakValidationMap<JutroPropTypes.Route> | PropTypes.Validator<PropTypes.InferProps<import("react").WeakValidationMap<JutroPropTypes.Route>>> | PropTypes.Requireable<PropTypes.InferProps<import("react").WeakValidationMap<JutroPropTypes.Route>>[]> | import("react").Requireable<JutroPropTypes.Separator> | import("react").Requireable<JutroPropTypes.AppSwitcherApp> | import("react").Requireable<JutroPropTypes.AppSwitcherGroup> | import("react").Requireable<JutroPropTypes.AppSwitcherItems> | import("react").WeakValidationMap<JutroPropTypes.ContextPropTypes> | PropTypes.Requireable<PropTypes.InferProps<import("react").WeakValidationMap<JutroPropTypes.ContextPropTypes>>> | import("react").WeakValidationMap<JutroPropTypes.ContextSwitcherPropTypes> | import("react").Requireable<JutroPropTypes.ContextSwitcherPropTypes> | import("react").WeakValidationMap<JutroPropTypes.SideContentShape> | PropTypes.Requireable<PropTypes.InferProps<import("react").WeakValidationMap<JutroPropTypes.SideContentShape>>> | import("react").WeakValidationMap<JutroPropTypes.DropdownMenuLinkPropTypes> | import("react").WeakValidationMap<JutroPropTypes.DateObjectValueShape> | import("react").Requireable<JutroPropTypes.DateValueShape> | import("react").Requireable<JutroPropTypes.DateRangeValueShape> | import("react").WeakValidationMap<JutroPropTypes.DateTimeZoneValueShape> | import("react").Requireable<JutroPropTypes.DateTimeZoneValueShape> | PropTypes.Requireable<object> | import("react").WeakValidationMap<JutroPropTypes.LinkPropTypes> | import("react").Requireable<JutroPropTypes.LinkPropTypes> | readonly ["top", "top-start", "top-end", "right", "right-start", "right-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "auto", "auto-start", "auto-end"] | {
        text: import("react").Requireable<JutroPropTypes.IntlMessageShape>;
        title: import("react").Requireable<JutroPropTypes.IntlMessageShape>;
        link: import("react").Requireable<JutroPropTypes.IntlMessageShape>;
        href: import("react").Requireable<JutroPropTypes.IntlMessageShape>;
        renderContent: PropTypes.Requireable<(...args: any[]) => any>;
    } | PropTypes.Requireable<PropTypes.InferProps<{
        placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
        text: import("react").Requireable<JutroPropTypes.IntlMessageShape>;
        title: import("react").Requireable<JutroPropTypes.IntlMessageShape>;
        link: import("react").Requireable<JutroPropTypes.IntlMessageShape>;
        href: import("react").Requireable<JutroPropTypes.IntlMessageShape>;
        renderContent: PropTypes.Requireable<(...args: any[]) => any>;
    }>> | PropTypes.Requireable<PropTypes.InferProps<{
        id: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<string>;
        placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
        text: import("react").Requireable<JutroPropTypes.IntlMessageShape>;
        title: import("react").Requireable<JutroPropTypes.IntlMessageShape>;
        link: import("react").Requireable<JutroPropTypes.IntlMessageShape>;
        href: import("react").Requireable<JutroPropTypes.IntlMessageShape>;
        renderContent: PropTypes.Requireable<(...args: any[]) => any>;
    }>> | import("react").WeakValidationMap<JutroPropTypes.ThemeConfigType> | PropTypes.Requireable<PropTypes.InferProps<import("react").WeakValidationMap<JutroPropTypes.ThemeConfigType>>> | import("react").WeakValidationMap<JutroPropTypes.ApplicationHeaderPropTypes> | {
        weekday?: "short" | "long" | "narrow" | undefined;
        year?: "numeric" | "2-digit" | undefined;
        month?: "short" | "long" | "narrow" | "numeric" | "2-digit" | undefined;
        day?: "numeric" | "2-digit" | undefined;
        hour?: "numeric" | "2-digit" | undefined;
        minute?: "numeric" | "2-digit" | undefined;
    } | {
        vshort: {
            weekday?: "short" | "long" | "narrow" | undefined;
            year?: "numeric" | "2-digit" | undefined;
            month?: "short" | "long" | "narrow" | "numeric" | "2-digit" | undefined;
            day?: "numeric" | "2-digit" | undefined;
            hour?: "numeric" | "2-digit" | undefined;
            minute?: "numeric" | "2-digit" | undefined;
        };
        short: {
            weekday?: "short" | "long" | "narrow" | undefined;
            year?: "numeric" | "2-digit" | undefined;
            month?: "short" | "long" | "narrow" | "numeric" | "2-digit" | undefined;
            day?: "numeric" | "2-digit" | undefined;
            hour?: "numeric" | "2-digit" | undefined;
            minute?: "numeric" | "2-digit" | undefined;
        };
        long: {
            weekday?: "short" | "long" | "narrow" | undefined;
            year?: "numeric" | "2-digit" | undefined;
            month?: "short" | "long" | "narrow" | "numeric" | "2-digit" | undefined;
            day?: "numeric" | "2-digit" | undefined;
            hour?: "numeric" | "2-digit" | undefined;
            minute?: "numeric" | "2-digit" | undefined;
        };
        abbreviated: {
            weekday?: "short" | "long" | "narrow" | undefined;
            year?: "numeric" | "2-digit" | undefined;
            month?: "short" | "long" | "narrow" | "numeric" | "2-digit" | undefined;
            day?: "numeric" | "2-digit" | undefined;
            hour?: "numeric" | "2-digit" | undefined;
            minute?: "numeric" | "2-digit" | undefined;
        };
        full: {
            weekday?: "short" | "long" | "narrow" | undefined;
            year?: "numeric" | "2-digit" | undefined;
            month?: "short" | "long" | "narrow" | "numeric" | "2-digit" | undefined;
            day?: "numeric" | "2-digit" | undefined;
            hour?: "numeric" | "2-digit" | undefined;
            minute?: "numeric" | "2-digit" | undefined;
        };
    } | JutroPropTypes.DateFormats[] | PropTypes.Requireable<JutroPropTypes.DateFormats> | typeof JutroPropTypes.deprecated | PropTypes.Requireable<string | number | PropTypes.InferProps<{
        amount: PropTypes.Requireable<string | number>;
        currency: PropTypes.Requireable<string>;
    }>> | ((allowedItems: string[], deprecatedItems: string[], version: string) => PropTypes.Requireable<any>) | ((Component: any, transformMap?: any) => any) | typeof JutroPropTypes.transformDeprecatedProps | typeof JutroPropTypes.deprecateAll | typeof JutroPropTypes.resetDeprecatedWarnings;
};
import * as JutroPropTypes from "@jutro/prop-types";
import PropTypes from "prop-types";
