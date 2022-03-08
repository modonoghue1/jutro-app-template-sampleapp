export default JsonForm;
/**
 * JsonForm
 * @deprecated
 * @param {PropTypes.InferProps<typeof JsonForm.propTypes>} props
 */
declare function JsonForm(props: PropTypes.InferProps<typeof JsonForm.propTypes>): JSX.Element;
declare namespace JsonForm {
    const displayName: string;
    namespace propTypes {
        const callbackMap: PropTypes.Requireable<object>;
        const className: PropTypes.Requireable<string>;
        const classNameMap: PropTypes.Requireable<object>;
        const componentMap: PropTypes.Requireable<object>;
        const parentPath: PropTypes.Requireable<string>;
        const data: PropTypes.Requireable<object>;
        const dataSchema: PropTypes.Validator<object>;
        const dataSchemaExtension: PropTypes.Requireable<(...args: any[]) => any>;
        const onDataChange: PropTypes.Requireable<(...args: any[]) => any>;
        const onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
        const overrideProps: PropTypes.Requireable<object>;
        const resolveComponent: PropTypes.Validator<any>;
        const resolveDataProps: PropTypes.Requireable<(...args: any[]) => any>;
        const resolveValidation: PropTypes.Requireable<(...args: any[]) => any>;
        const resolveValue: PropTypes.Requireable<(...args: any[]) => any>;
        const showErrors: PropTypes.Requireable<boolean>;
        const uiProps: PropTypes.Requireable<object>;
        const overrideDataProps: PropTypes.Requireable<object>;
        const ValidationService: PropTypes.Requireable<object>;
        const showOptional: PropTypes.Requireable<boolean>;
        const showRequired: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from "prop-types";
