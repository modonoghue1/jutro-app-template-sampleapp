export function isContextActive(location: any, { path, exact, match }: {
    path: any;
    exact: any;
    match: any;
}): boolean;
export function ContextSwitcher({ className, values, defaultLabel, ...others }: object): JSX.Element;
export namespace ContextSwitcher {
    namespace propTypes {
        export const className: PropTypes.Requireable<string>;
        export { intlMessageShape as defaultLabel };
        export const values: PropTypes.Validator<(PropTypes.InferProps<React.WeakValidationMap<import("@jutro/prop-types").ContextPropTypes>> | null | undefined)[]>;
    }
}
import PropTypes from "prop-types";
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import React from "react";
