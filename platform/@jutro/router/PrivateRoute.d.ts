export function PrivateRoute({ component, render, children, redirect, isAuthenticated, ...other }: {
    [x: string]: any;
    component: any;
    render: any;
    children: any;
    redirect: any;
    isAuthenticated: any;
}): JSX.Element;
export namespace PrivateRoute {
    namespace propTypes {
        const component: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const render: PropTypes.Requireable<(...args: any[]) => any>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const redirect: PropTypes.Requireable<string>;
        const isAuthenticated: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from "prop-types";
