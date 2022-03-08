export function BurgerMenuLink({ id, hideSeparator, separatorClassName, className, ...props }: object): React.ReactElement;
export namespace BurgerMenuLink {
    const propTypes: {
        /**
         * Component unique identifier
         */
        id: PropTypes.Validator<string>;
        /**
         * Do not render separator if true
         */
        hideSeparator: PropTypes.Requireable<boolean>;
        /**
         * Optional css class to the burger sidebar item separator
         */
        separatorClassName: PropTypes.Requireable<string>;
        /**
         * The item's content.
         */
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Internal link.
         */
        to?: React.Validator<import("@jutro/prop-types").IntlToShape | null | undefined> | undefined;
        /**
         * External link.
         */
        href?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        /**
         * The class name of the link.
         */
        className?: React.Validator<string | null | undefined> | undefined;
        /**
         * If `true`, this link is disabled
         */
        disabled?: React.Validator<boolean | null | undefined> | undefined;
        /**
         * On link click event handler
         */
        onClick?: React.Validator<Function | null | undefined> | undefined;
    };
    namespace defaultProps {
        const tag: string;
    }
}
import React from "react";
import PropTypes from "prop-types";
