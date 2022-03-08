export function getNotifications(routes: any): any;
export function NavBarAccordionInternal({ to: toProp, header, icon, disabled, className, routes, location: loc, notifications, }: object): React.ReactElement;
export namespace NavBarAccordionInternal {
    namespace propTypes {
        export const className: PropTypes.Requireable<string>;
        export const header: PropTypes.Validator<IntlMessageShape>;
        export const to: PropTypes.Validator<IntlMessageShape>;
        export const icon: PropTypes.Requireable<string>;
        export const disabled: PropTypes.Requireable<boolean>;
        export const activeClassName: PropTypes.Requireable<string>;
        export const exact: PropTypes.Requireable<boolean>;
        export { routesShape as routes };
    }
    const displayName: string;
}
/** @type {React.ComponentType<NavBarAccordionProps>} */
export const NavBarAccordion: React.ComponentType<NavBarAccordionProps>;
export type NavBarAccordionProps = {
    /**
     * Additional class names for component.
     */
    className?: string | undefined;
    /**
     * Link header.
     */
    header: any;
    /**
     * Internal path to the application.
     */
    to: IntlMessageShape;
    /**
     * Icon to render to the left of the header
     */
    icon?: string | undefined;
    /**
     * Flag to make item disabled
     */
    disabled?: boolean | undefined;
    /**
     * Additional class names for  active component.
     */
    activeClassName?: string | undefined;
    /**
     * When true, will only match if the path matches the location.pathname exactly
     */
    exact?: boolean | undefined;
    /**
     * Sub navigation items metadata
     */
    routes?: Record<string, any> | undefined;
};
import React from "react";
import PropTypes from "prop-types";
import { IntlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import { routesShape } from "@jutro/prop-types";
