export class RadioButton extends React.Component<any, any, any> {
    static propTypes: {
        /**
         * Radio Button Options
         */
        option: PropTypes.Requireable<object>;
        /**
         * Is this field disabled?
         */
        disabled: PropTypes.Requireable<boolean>;
        /**
         * Value to determine is the button checked ot unchecked
         */
        value: PropTypes.Requireable<string>;
        /**
         * Is this field required?
         */
        required: PropTypes.Requireable<boolean>;
        /**
         * Id of the radio button
         */
        id: PropTypes.Requireable<string>;
        /**
         * Callback when the value is changed
         */
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * TabIndex of the Radio Button
         */
        tabIndex: PropTypes.Requireable<number>;
        /**
         * className passed to the top element of RadioButton
         */
        className: PropTypes.Requireable<string>;
        /**
         * Additional className passed to the label
         */
        labelClassName: PropTypes.Requireable<string>;
    };
    constructor(props: any, context: any);
    inputRef: React.RefObject<any>;
    controlUniqueId: string;
    handleValueChange: (evt: any) => void;
    handleKeyDown: (evt: any) => void;
    renderPrimaryText(translator: any): JSX.Element | null;
    renderSecondaryText(translator: any): JSX.Element | null;
    renderComponent: (translator: any) => JSX.Element;
}
import React from "react";
import PropTypes from "prop-types";
