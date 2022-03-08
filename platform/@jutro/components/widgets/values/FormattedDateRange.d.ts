/**
 * Imperative API for formatting date ranges using current locale
 *
 * @param {import('react-intl').Intl} intl - instance of the imperative formatting API access object
 * @param {PropTypes.InferProps<FormattedDateRange.propTypes>} props - FormattedDateRange props
 * @param {{startDate?: Date, endDate?: Date, separator?: string }} [dateRangeObject] - Date range value override to be used instead of the one provided with props
 * @returns {string} - Formatted date range string
 */
export function formatDateRange(intl: any, props: PropTypes.InferProps<React.WeakValidationMap<PropTypes.InferProps<{
    /**
     * The start date to display
     */
    startDate: PropTypes.Requireable<Date>;
    /**
     * The end date to display
     */
    endDate: PropTypes.Requireable<Date>;
    /**
     * Start value to display in the format of string|number|object
     */
    startValue: React.Requireable<import("@jutro/prop-types").DateValueShape>;
    /**
     * End value to display in the format of string|number|object
     */
    endValue: React.Requireable<import("@jutro/prop-types").DateValueShape>;
    /**
     * The string to display if start or end 'date' is undefined/null
     */
    placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * The date format: 'short' or 'long'
     */
    format: PropTypes.Requireable<import("@jutro/prop-types").DateFormats>;
    /**
     * The range separator (between start and end date)
     */
    separator: PropTypes.Requireable<string>;
    /**
     * If true, displays the time with the date
     */
    showTime: PropTypes.Requireable<boolean>;
}>> | undefined>, dateRangeObject?: {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    separator?: string | undefined;
} | undefined): string;
/**
 * The `FormattedDateRange` component is used to render `Date` values
 * localized and in specific preset formats
 *
 * @type {React.FC<PropTypes.InferProps<typeof formattedDateRangePropTypes>>}
 *
 * @metadataType element
 */
export const FormattedDateRange: React.FC<PropTypes.InferProps<typeof formattedDateRangePropTypes>>;
import PropTypes from "prop-types";
import React from "react";
declare namespace formattedDateRangePropTypes {
    export const startDate: PropTypes.Requireable<Date>;
    export const endDate: PropTypes.Requireable<Date>;
    export { dateValueShape as startValue };
    export { dateValueShape as endValue };
    export { intlMessageShape as placeholder };
    export { dateFormatShape as format };
    export const separator: PropTypes.Requireable<string>;
    export const showTime: PropTypes.Requireable<boolean>;
}
import { dateValueShape } from "@jutro/prop-types/src/dateValueShape";
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import { dateFormatShape } from "@jutro/prop-types/src/DateFormats";
export {};
