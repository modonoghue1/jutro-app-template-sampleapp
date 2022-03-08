export class SliderHandle extends React.Component<any, any, any> {
    static propTypes: {
        id: PropTypes.Requireable<string>;
        /**
         * Minimum available slider value
         */
        min: PropTypes.Validator<number>;
        /**
         * Maximum available slider value
         */
        max: PropTypes.Validator<number>;
        /**
         * Current slider value (to create fully controlled component)
         */
        value: PropTypes.Validator<number>;
        /**
         * Step between consecutive values
         */
        step: PropTypes.Requireable<number>;
        /**
         * If true, this field is disabled
         */
        disabled: PropTypes.Requireable<boolean>;
        /**
         * Additional style to apply to the component
         */
        className: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the component's tooltip
         */
        tooltipClassName: PropTypes.Requireable<string>;
        /**
         * Id of the element that labels the slider handle component.
         */
        labelId: PropTypes.Requireable<string>;
        /**
         * Data attribute that specifies the data-testid used in testing. If not provided data attribute set to id.
         */
        testId: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        disabled: boolean;
        step: number;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    setHandle: (handle: any) => void;
    handle: any;
    handleMouseDown: () => void;
    clickFocus(): void;
    focus(): void;
}
import React from "react";
import PropTypes from "prop-types";
