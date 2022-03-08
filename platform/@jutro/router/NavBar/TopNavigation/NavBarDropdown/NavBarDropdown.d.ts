export function NavBarDropdownInternal(props: Array<any>): React.ReactElement;
export namespace NavBarDropdownInternal {
    namespace propTypes {
        const id: PropTypes.Requireable<string>;
        const className: PropTypes.Requireable<string>;
        const header: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        const icon: PropTypes.Requireable<string>;
        const disabled: PropTypes.Requireable<boolean>;
        const alignment: PropTypes.Requireable<string>;
    }
    const displayName: string;
}
/** @type {React.ComponentType<NavBarDropdownProps>} */
export const NavBarDropdown: React.ComponentType<NavBarDropdownProps>;
export type NavBarDropdownProps = {
    /**
     * Additional class names for component.
     */
    className?: string | undefined;
    /**
     * Link header.
     */
    header: any;
    /**
     * Icon to render to the left of the header
     */
    icon?: string | undefined;
    /**
     * Flag to make dropdown disabled
     */
    disabled?: boolean | undefined;
    /**
     * Flag to make the item active. Revisit when routing added
     */
    active?: boolean | undefined;
    /**
     * Navigation alignment
     */
    alignment?: "top" | "left" | undefined;
};
import React from "react";
import PropTypes from "prop-types";
