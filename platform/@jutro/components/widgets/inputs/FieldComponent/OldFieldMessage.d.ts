/**
 * Class renders messages for `FieldComponent`.
 * Validation messages are expected to be translated before they are passed.
 */
export class OldFieldMessage extends React.PureComponent<any, any, any> {
    static propTypes: {
        /**
         * Component unique identifier
         */
        id: PropTypes.Validator<string>;
        /**
         * Error message to display
         */
        errorMessage: PropTypes.Requireable<import("@jutro/prop-types").IntlMessageShape | ((...args: any[]) => any)>;
        /**
         * Success message to display
         */
        successMessage: PropTypes.Requireable<import("@jutro/prop-types").IntlMessageShape | ((...args: any[]) => any)>;
        /**
         * Theme to apply to component
         */
        theme: PropTypes.Requireable<object>;
        /**
         * The function used to translate strings
         */
        translator: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        theme: any;
    };
    constructor(props: any);
    constructor(props: any, context: any);
}
import React from "react";
import PropTypes from "prop-types";
