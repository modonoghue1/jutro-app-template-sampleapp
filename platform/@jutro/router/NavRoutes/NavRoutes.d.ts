export function NavRoutes({ routes, resolveComponentMap, resolveComponent: resolveComponentCallback, }: {
    routes: any;
    resolveComponentMap: any;
    resolveComponent: any;
}): JSX.Element;
export namespace NavRoutes {
    namespace propTypes {
        const routes: PropTypes.Validator<(object | null | undefined)[]>;
        const resolveComponentMap: PropTypes.Validator<object>;
        const resolveComponent: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        export { resolveComponentFromMap as resolveComponent };
    }
}
import PropTypes from "prop-types";
import { resolveComponentFromMap } from "../resolveComponentFromMap";
