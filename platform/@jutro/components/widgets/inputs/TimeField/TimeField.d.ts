import React from 'react';
import PropTypes from 'prop-types';
import { FieldComponent } from '../FieldComponent/FieldComponent';
import { fieldIconPropTypes } from '../FieldComponent/FieldIcon';
import { Time } from './types';
declare type TypeFormat = '12h' | '24h';
declare type FieldPropTypes = PropTypes.InferProps<typeof FieldComponent.propTypes>;
declare type FieldIconPropTypes = PropTypes.InferProps<typeof fieldIconPropTypes>;
export declare type TimeFieldPropTypes = FieldPropTypes & FieldIconPropTypes & {
    /**
     * Time to display
     */
    value?: Time;
    /**
     * Min time
     */
    min?: Time | boolean;
    /**
     * Max time
     */
    max?: Time | boolean;
    /**
     * Time intervals for input preselected values
     */
    timeIntervals?: number;
    /**
     * Time format
     */
    timeFormat?: TypeFormat;
    isInitiallyOpen?: boolean;
};
export declare const TimeField: React.FC<TimeFieldPropTypes>;
export {};
