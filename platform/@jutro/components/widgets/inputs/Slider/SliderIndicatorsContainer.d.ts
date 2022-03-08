export function SliderIndicatorsContainer({ min, max, containerClassName, indicatorClassName, children, }: {
    min: any;
    max: any;
    containerClassName: any;
    indicatorClassName: any;
    children: any;
}): JSX.Element;
export namespace SliderIndicatorsContainer {
    namespace propTypes {
        const min: PropTypes.Validator<number>;
        const max: PropTypes.Validator<number>;
        const value: PropTypes.Validator<unknown>;
        const range: PropTypes.Requireable<boolean>;
        const containerClassName: PropTypes.Requireable<string>;
        const indicatorClassName: PropTypes.Requireable<string>;
    }
}
import PropTypes from "prop-types";
