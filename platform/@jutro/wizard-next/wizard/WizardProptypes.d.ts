export namespace metadataCallbackObjectShape {
    const callback: PropTypes.Requireable<string>;
    const callbackProps: PropTypes.Requireable<PropTypes.InferProps<{
        type: PropTypes.Requireable<string>;
        args: PropTypes.Requireable<any[]>;
        progress: PropTypes.Requireable<PropTypes.InferProps<{
            message: PropTypes.Requireable<string>;
        }>>;
        success: PropTypes.Requireable<PropTypes.InferProps<{
            path: PropTypes.Requireable<string>;
            message: PropTypes.Requireable<string>;
        }>>;
        failure: PropTypes.Requireable<PropTypes.InferProps<{
            path: PropTypes.Requireable<string>;
            message: PropTypes.Requireable<string>;
        }>>;
    }>>;
}
export const wizardCallbackProptype: PropTypes.Requireable<string | ((...args: any[]) => any) | PropTypes.InferProps<{
    callback: PropTypes.Requireable<string>;
    callbackProps: PropTypes.Requireable<PropTypes.InferProps<{
        type: PropTypes.Requireable<string>;
        args: PropTypes.Requireable<any[]>;
        progress: PropTypes.Requireable<PropTypes.InferProps<{
            message: PropTypes.Requireable<string>;
        }>>;
        success: PropTypes.Requireable<PropTypes.InferProps<{
            path: PropTypes.Requireable<string>;
            message: PropTypes.Requireable<string>;
        }>>;
        failure: PropTypes.Requireable<PropTypes.InferProps<{
            path: PropTypes.Requireable<string>;
            message: PropTypes.Requireable<string>;
        }>>;
    }>>;
}>>;
import PropTypes from "prop-types";
