import _extends from"@babel/runtime-corejs3/helpers/extends";import React from"react";import{components}from"react-select";export const GenericSelectControlSingleValue=({isDisabled:isDisabled,innerProps:innerProps,selectProps:selectProps,...rest})=>{const genericSelectStyles=selectProps.genericSelectStyles,customProps={"aria-disabled":isDisabled,...innerProps};return React.createElement(components.SingleValue,_extends({},rest,{className:genericSelectStyles.SingleValue,innerProps:customProps}))};GenericSelectControlSingleValue.__docgenInfo={description:"",methods:[],displayName:"GenericSelectControlSingleValue"},GenericSelectControlSingleValue.__docgenInfo={componentName:"GenericSelectControlSingleValue",packageName:"@jutro/components",description:"",displayName:"GenericSelectControlSingleValue",methods:[],actualName:"GenericSelectControlSingleValue"};