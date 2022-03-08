export function BurgerMenu({ className, burgerContent, separatorClassName, buttonClassName, }: {
    className: any;
    burgerContent: any;
    separatorClassName: any;
    buttonClassName: any;
}): React.ReactElement;
export namespace BurgerMenu {
    namespace propTypes {
        const className: PropTypes.Requireable<string>;
        const burgerContent: PropTypes.Requireable<PropTypes.ReactNodeLike[]>;
        const separatorClassName: PropTypes.Requireable<string>;
        const buttonClassName: PropTypes.Requireable<string>;
    }
}
import React from "react";
import PropTypes from "prop-types";
