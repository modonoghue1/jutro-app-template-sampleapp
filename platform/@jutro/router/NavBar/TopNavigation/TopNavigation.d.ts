export function TopNavigation(props: object): React.ReactElement;
export namespace TopNavigation {
    namespace propTypes {
        export const className: PropTypes.Requireable<string>;
        export const routes: PropTypes.Validator<PropTypes.InferProps<React.WeakValidationMap<import("@jutro/prop-types").Route>>[]>;
        export { contextSwitcherShape as contextSwitcher };
        export const wrap: PropTypes.Requireable<boolean>;
        export const navBarRef: PropTypes.Requireable<PropTypes.InferProps<{
            current: PropTypes.Requireable<Element>;
        }>>;
    }
    namespace defaultProps {
        const wrap_1: boolean;
        export { wrap_1 as wrap };
    }
}
import React from "react";
import PropTypes from "prop-types";
import { contextSwitcherShape } from "@jutro/prop-types";
