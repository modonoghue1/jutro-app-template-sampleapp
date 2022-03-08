export const currencyValueShape: PropTypes.Requireable<string | number | PropTypes.InferProps<{
    amount: PropTypes.Requireable<string | number>;
    currency: PropTypes.Requireable<string>;
}>>;
import PropTypes from "prop-types";
