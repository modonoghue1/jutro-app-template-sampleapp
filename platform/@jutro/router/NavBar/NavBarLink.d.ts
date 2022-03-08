export function getIdFromPath(path: any): any;
export function NavBarLinkInternal({ header, to: toProp, href, exact, icon, disabled, className, activeClassName, alignment, notifications, }: Array<any>): React.ReactElement;
export namespace NavBarLinkInternal {
    namespace propTypes {
        export const className: PropTypes.Requireable<string>;
        export const header: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        export { intlMessageShape as to };
        export { intlMessageShape as href };
        export const icon: PropTypes.Requireable<string>;
        export const disabled: PropTypes.Requireable<boolean>;
        export const activeClassName: PropTypes.Requireable<string>;
        export const alignment: PropTypes.Requireable<string>;
        export const notifications: PropTypes.Requireable<number>;
    }
    const displayName: string;
}
/** @type {React.ComponentType<NavBarLinkProps>} */
export const NavBarLink: React.ComponentType<NavBarLinkProps>;
export type NavBarLinkProps = {
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
    to: string;
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
     * Flag to make the item active. Revisit when routing added
     */
    active?: boolean | undefined;
    /**
     * Navigation alignment
     */
    alignment?: "top" | "left" | undefined;
    /**
     * The value of the Badge
     */
    notifications?: number | undefined;
};
import React from "react";
import PropTypes from "prop-types";
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
