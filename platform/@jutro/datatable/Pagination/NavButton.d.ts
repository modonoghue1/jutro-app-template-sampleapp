export function NavButton({ onClick, children, className, icon, iconPosition, }: {
    onClick: any;
    children: any;
    className: any;
    icon: any;
    iconPosition: any;
}): JSX.Element;
export namespace NavButton {
    namespace propTypes {
        const className: PropTypes.Requireable<string>;
        const icon: PropTypes.Requireable<string>;
        const iconPosition: PropTypes.Requireable<string>;
        const onClick: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
