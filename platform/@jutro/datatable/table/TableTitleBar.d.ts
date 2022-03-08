export function TableTitleBar(props: any): JSX.Element | null;
export namespace TableTitleBar {
    type propTypes = {
        /**
         * -  Title which is placed in title bar
         */
        title: string | Function;
        /**
         * - Render prop for customizing action in the title area
         */
        titleAction?: string | undefined;
        /**
         * - theme config that's supposed to be applied to the component
         */
        theme?: object;
        /**
         * - the title caption's id, for use with aria-describedby on the table
         */
        titleId: string;
    };
    namespace propTypes {
        const title: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        const titleAction: PropTypes.Requireable<(...args: any[]) => any>;
        const theme: PropTypes.Requireable<object>;
        const titleId: PropTypes.Requireable<string>;
        const position: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        export { defaultTitlePosition as titlePosition };
    }
    const metadataType: any;
}
import PropTypes from "prop-types";
declare const defaultTitlePosition: "left";
export {};
