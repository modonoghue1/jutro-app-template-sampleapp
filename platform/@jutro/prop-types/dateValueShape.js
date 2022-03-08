import PropTypes from"prop-types";export const dateObjectValueShape={year:PropTypes.number.isRequired,month:PropTypes.number.isRequired,day:PropTypes.number.isRequired,hour:PropTypes.number,minute:PropTypes.number};export const dateValueShape=PropTypes.oneOfType([PropTypes.number,PropTypes.string,PropTypes.instanceOf(Date),PropTypes.shape(dateObjectValueShape)]);const dateRangeProps={startDate:dateValueShape,endDate:dateValueShape};export const dateRangeValueShape=PropTypes.shape(dateRangeProps);export const dateTimeZoneValueProps={datetime:dateValueShape,timezone:PropTypes.string};export const dateTimeZoneValueShape=PropTypes.shape(dateTimeZoneValueProps);