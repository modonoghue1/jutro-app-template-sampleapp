export function NavigationContent({ routes, contextSwitcher, nestedRoutesComponent, alignment, className, contextSwitcherClassName, navBarRef, }: {
    routes: any;
    contextSwitcher: any;
    nestedRoutesComponent: any;
    alignment: any;
    className: any;
    contextSwitcherClassName: any;
    navBarRef: any;
}): JSX.Element;
export namespace NavigationContent {
    namespace propTypes {
        export { routesShape as routes };
        export { contextSwitcherShape as contextSwitcher };
        export const alignment: PropTypes.Requireable<string>;
        export const className: PropTypes.Requireable<string>;
        export const navBarRef: PropTypes.Requireable<PropTypes.InferProps<{
            current: PropTypes.Requireable<Element>;
        }>>;
    }
}
import { routesShape } from "@jutro/prop-types";
import { contextSwitcherShape } from "@jutro/prop-types";
import PropTypes from "prop-types";
