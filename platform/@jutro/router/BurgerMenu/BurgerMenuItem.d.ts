export function BurgerMenuItem({ id, hideSeparator, separatorClassName, className, tag: Tag, isContainerOnly, dangerouslySetInnerHTML, ...props }: object): React.ReactElement;
export namespace BurgerMenuItem {
    namespace propTypes {
        const id: PropTypes.Validator<string>;
        const hideSeparator: PropTypes.Requireable<boolean>;
        const isContainerOnly: PropTypes.Requireable<boolean>;
        const separatorClassName: PropTypes.Requireable<string>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }
    namespace defaultProps {
        export const tag: string;
        const isContainerOnly_1: boolean;
        export { isContainerOnly_1 as isContainerOnly };
    }
}
import React from "react";
import PropTypes from "prop-types";
