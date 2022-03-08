import React, { WeakValidationMap } from 'react';
import PropTypes from 'prop-types';
import { AvailableValuesCodeNameObject } from '@jutro/prop-types';
import { TypeaheadMultiSelectField } from '../TypeaheadMultiSelectField/TypeaheadMultiSelectField';
declare type TypeaheadMultiSelectFieldWithOmittedProps = Omit<PropTypes.InferProps<typeof TypeaheadMultiSelectField.propTypes>, 'singleValue' | 'noOptionsMessage' | 'allowNew' | 'dataType'>;
export declare type TimeZoneFieldPropTypes = TypeaheadMultiSelectFieldWithOmittedProps & {
    availableValues?: AvailableValuesCodeNameObject[];
};
export declare const timeZoneFieldPropTypes: WeakValidationMap<TimeZoneFieldPropTypes>;
export declare const TimeZoneField: React.FC<TimeZoneFieldPropTypes>;
export {};
