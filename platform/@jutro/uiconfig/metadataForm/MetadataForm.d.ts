export default MetadataForm;
/**
 * MetadataForm
 *
 * @param {PropTypes.InferProps<typeof MetadataForm.propTypes>} props
 */
declare function MetadataForm(props: PropTypes.InferProps<typeof MetadataForm.propTypes>): JSX.Element;
declare namespace MetadataForm {
    const displayName: string;
    namespace propTypes {
        const callbackMap: PropTypes.Requireable<{
            [x: string]: (...args: any[]) => any;
        }>;
        const classNameMap: PropTypes.Requireable<{
            [x: string]: string;
        }>;
        const componentMap: PropTypes.Requireable<{
            [x: string]: PropTypes.ReactComponentLike;
        }>;
        const data: PropTypes.Requireable<object>;
        const onDataChange: PropTypes.Requireable<(...args: any[]) => any>;
        const onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
        const overrideProps: PropTypes.Requireable<object>;
        const resolveValidation: PropTypes.Requireable<(...args: any[]) => any>;
        const resolveDataProps: PropTypes.Requireable<(...args: any[]) => any>;
        const resolveComponent: PropTypes.Validator<any>;
        const resolveValue: PropTypes.Requireable<(...args: any[]) => any>;
        const showErrors: PropTypes.Requireable<boolean>;
        const showOptional: PropTypes.Requireable<boolean>;
        const showRequired: PropTypes.Requireable<boolean>;
        const uiProps: PropTypes.Validator<object>;
    }
}
import PropTypes from "prop-types";
