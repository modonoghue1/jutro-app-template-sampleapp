export function SideNavigation({ className, routes, contextSwitcher, collapsible: collapsibleProp, collapsed, expandOverContent, }: object): React.ReactElement;
export namespace SideNavigation {
    namespace propTypes {
        export const className: PropTypes.Requireable<string>;
        export const routes: PropTypes.Validator<PropTypes.InferProps<React.WeakValidationMap<import("@jutro/prop-types").Route>>[]>;
        export { contextSwitcherShape as contextSwitcher };
        export const collapsible: PropTypes.Requireable<boolean>;
        export const collapsed: PropTypes.Requireable<boolean>;
        export const expandOverContent: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const collapsible_1: boolean;
        export { collapsible_1 as collapsible };
        const collapsed_1: boolean;
        export { collapsed_1 as collapsed };
    }
}
import React from "react";
import PropTypes from "prop-types";
import { contextSwitcherShape } from "@jutro/prop-types";
