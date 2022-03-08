export function Layout({ id, children, className, layout }: {
    id: any;
    children: any;
    className: any;
    layout: any;
}): JSX.Element;
export namespace Layout {
    namespace propTypes {
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const className: PropTypes.Requireable<string>;
        const layout: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Optional props to override default layout
             */
            desktop: PropTypes.Requireable<PropTypes.InferProps<{
                /**
                 * Used to identify the component
                 */
                id: PropTypes.Requireable<string>;
                /**
                 * repeat columns: 'auto-fit' or 'auto-fill' or number
                 */
                repeat: PropTypes.Requireable<string | number>;
                /**
                 * gap between rows and columns: 'none', 'small', 'medium', 'large'
                 */
                gap: PropTypes.Requireable<string>;
                /**
                 * define explicit columns
                 */
                columns: PropTypes.Requireable<any[]>;
                colSpan: PropTypes.Requireable<string | number>;
                colStart: PropTypes.Requireable<string | number>;
            }>>;
            /**
             * Optional props to override layout on tablet
             */
            tablet: PropTypes.Requireable<PropTypes.InferProps<{
                /**
                 * Used to identify the component
                 */
                id: PropTypes.Requireable<string>;
                /**
                 * repeat columns: 'auto-fit' or 'auto-fill' or number
                 */
                repeat: PropTypes.Requireable<string | number>;
                /**
                 * gap between rows and columns: 'none', 'small', 'medium', 'large'
                 */
                gap: PropTypes.Requireable<string>;
                /**
                 * define explicit columns
                 */
                columns: PropTypes.Requireable<any[]>;
                colSpan: PropTypes.Requireable<string | number>;
                colStart: PropTypes.Requireable<string | number>;
            }>>;
            /**
             * Optional props to override layout on phoneWide
             */
            phoneWide: PropTypes.Requireable<PropTypes.InferProps<{
                /**
                 * Used to identify the component
                 */
                id: PropTypes.Requireable<string>;
                /**
                 * repeat columns: 'auto-fit' or 'auto-fill' or number
                 */
                repeat: PropTypes.Requireable<string | number>;
                /**
                 * gap between rows and columns: 'none', 'small', 'medium', 'large'
                 */
                gap: PropTypes.Requireable<string>;
                /**
                 * define explicit columns
                 */
                columns: PropTypes.Requireable<any[]>;
                colSpan: PropTypes.Requireable<string | number>;
                colStart: PropTypes.Requireable<string | number>;
            }>>;
            /**
             * Optional props to override layout on phone
             */
            phone: PropTypes.Requireable<PropTypes.InferProps<{
                /**
                 * Used to identify the component
                 */
                id: PropTypes.Requireable<string>;
                /**
                 * repeat columns: 'auto-fit' or 'auto-fill' or number
                 */
                repeat: PropTypes.Requireable<string | number>;
                /**
                 * gap between rows and columns: 'none', 'small', 'medium', 'large'
                 */
                gap: PropTypes.Requireable<string>;
                /**
                 * define explicit columns
                 */
                columns: PropTypes.Requireable<any[]>;
                colSpan: PropTypes.Requireable<string | number>;
                colStart: PropTypes.Requireable<string | number>;
            }>>;
        }>>;
    }
}
export const layoutShape: PropTypes.Requireable<PropTypes.InferProps<{
    /**
     * Used to identify the component
     */
    id: PropTypes.Requireable<string>;
    /**
     * repeat columns: 'auto-fit' or 'auto-fill' or number
     */
    repeat: PropTypes.Requireable<string | number>;
    /**
     * gap between rows and columns: 'none', 'small', 'medium', 'large'
     */
    gap: PropTypes.Requireable<string>;
    /**
     * define explicit columns
     */
    columns: PropTypes.Requireable<any[]>;
    colSpan: PropTypes.Requireable<string | number>;
    colStart: PropTypes.Requireable<string | number>;
}>>;
import PropTypes from "prop-types";
