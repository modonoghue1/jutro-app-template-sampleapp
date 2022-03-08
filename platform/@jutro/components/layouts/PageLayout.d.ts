export function PageLayout({ children, className, layout }: {
    children: any;
    className: any;
    layout: any;
}): JSX.Element;
export namespace PageLayout {
    namespace propTypes {
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const className: PropTypes.Requireable<string>;
        const layout: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Optional props to override default layout
             */
            desktop: PropTypes.Requireable<PropTypes.InferProps<{
                id: PropTypes.Requireable<string>;
                repeat: PropTypes.Requireable<string | number>;
                gap: PropTypes.Requireable<string>;
                columns: PropTypes.Requireable<any[]>;
                colSpan: PropTypes.Requireable<string | number>;
                colStart: PropTypes.Requireable<string | number>;
            }>>;
            /**
             * Optional props to override layout on tablet
             */
            tablet: PropTypes.Requireable<PropTypes.InferProps<{
                id: PropTypes.Requireable<string>;
                repeat: PropTypes.Requireable<string | number>;
                gap: PropTypes.Requireable<string>;
                columns: PropTypes.Requireable<any[]>;
                colSpan: PropTypes.Requireable<string | number>;
                colStart: PropTypes.Requireable<string | number>;
            }>>;
            /**
             * Optional props to override layout on phone
             */
            phone: PropTypes.Requireable<PropTypes.InferProps<{
                id: PropTypes.Requireable<string>;
                repeat: PropTypes.Requireable<string | number>;
                gap: PropTypes.Requireable<string>;
                columns: PropTypes.Requireable<any[]>;
                colSpan: PropTypes.Requireable<string | number>;
                colStart: PropTypes.Requireable<string | number>;
            }>>;
        }>>;
    }
}
import PropTypes from "prop-types";
