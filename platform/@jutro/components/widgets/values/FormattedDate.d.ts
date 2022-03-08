/**
 * Imperative API for formatting date using current locale
 *
 * @param {import('react-intl').Intl} intl - instance of the imperative formatting API access object
 * @param {PropTypes.InferProps<FormattedDate.propTypes>} props - FormattedDate props
 * @param {Date} [date] - Date value override to be used instead of the one provided with props
 * @returns {string} - Formatted date string
 */
export function formatDate(intl: any, props: PropTypes.InferProps<React.WeakValidationMap<PropTypes.InferProps<{
    /**
     * The date to display
     */
    date: PropTypes.Requireable<Date>;
    /**
     * Value to display in the format of string|number|object
     */
    value: React.Requireable<import("@jutro/prop-types").DateValueShape>;
    /**
     * The string to display if 'date' is undefined/null
     */
    placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * The date format: 'vshort', 'short', 'long', 'abbreviated', 'full'
     */
    format: PropTypes.Requireable<import("@jutro/prop-types").DateFormats>;
    /**
     * If true, displays the time with the date
     */
    showTime: PropTypes.Requireable<boolean>;
    /**
     * If true, displays only time
     */
    onlyTime: PropTypes.Requireable<boolean>;
}>> | undefined>, date?: Date | undefined): string;
export namespace formattedDatePropTypes {
    export const date: PropTypes.Requireable<Date>;
    export { dateValueShape as value };
    export { intlMessageShape as placeholder };
    export { dateFormatShape as format };
    export const showTime: PropTypes.Requireable<boolean>;
    export const onlyTime: PropTypes.Requireable<boolean>;
}
/**
 * The `FormattedDate` component is used to render `Date` values
 * localized and in specific preset formats, e.g. short or long.
 *
 * @type {React.FC<PropTypes.InferProps<typeof formattedDatePropTypes>>}
 *
 * @metadataType element
 */
export const FormattedDate: React.FC<PropTypes.InferProps<typeof formattedDatePropTypes>>;
import PropTypes from "prop-types";
import React from "react";
import { dateValueShape } from "@jutro/prop-types/src/dateValueShape";
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import { dateFormatShape } from "@jutro/prop-types/src/DateFormats";
