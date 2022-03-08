import{Children,Component,Fragment,isValidElement}from"react";import{error}from"@jutro/logger";import isNil from"lodash/isNil";import{getDisplayName}from"./getDisplayName";function childIsOfType(child,componentType){const childDisplayName=getDisplayName(child.type),componentTypeDisplayName=getDisplayName(componentType);if(child.type===componentType||childDisplayName===componentTypeDisplayName)return!0;if("string"!=typeof child.type&&Object.prototype.isPrototypeOf.call(Component,child.type)){let prototype=Object.getPrototypeOf(child.type);for(;prototype!==Component;){if(prototype===componentType)return!0;prototype=Object.getPrototypeOf(prototype)}}return!1}export const wrapWithIsRequired=propType=>{const wrappedPropType=propType.bind(null);return wrappedPropType.isRequired=(props,propName,componentName,...rest)=>{const value=props[propName];return isNil(value)?new Error(`Failed value type: The value \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${value}\`.`):propType(props,propName,componentName,...rest)},wrappedPropType};export const ComponentPropTypes={childOfComponentType:function(componentType){const componentDisplayName=getDisplayName(componentType);return wrapWithIsRequired(((props,propName,componentName,location,propFullName)=>{const componentNameSafe=componentName||"<<anonymous>>",propFullNameSafe=propFullName||propName;let children=props[propName];return"object"==typeof children&&childIsOfType(children,Fragment)&&(children=children.props[propName]),Children.toArray(children).every((child=>childIsOfType(child,componentType)))?null:new Error(`Invalid ${location} \`${propFullNameSafe}\` supplied to \`${componentNameSafe}\`. ${componentNameSafe} accepts only ${componentDisplayName} components as children.`)}))},oneOfChildOfComponentTypes:function(componentTypes){if(!Array.isArray(componentTypes))throw new TypeError(`Expected an array for the 'componentTypes' parameter, got ${typeof componentTypes} instead`);const displayNames=componentTypes.map((componentType=>getDisplayName(componentType)));return function(props,propName,componentName){const prop=props[propName];Children.forEach(prop,(child=>{if(!child)return;componentTypes.findIndex((componentType=>childIsOfType(child,componentType)))<0&&error(`${componentName} child is a '${getDisplayName(child.type)}', but should be one of: ${displayNames}.`)}))}},altTextDefinedWithImage:function(){return function(props,propName){if(props.image&&!props.title&&!props[propName])return new Error("imageAltText or title must be defined with image")}},all:(...propTypes)=>wrapWithIsRequired(((...args)=>propTypes.reduce(((propTypeError,propType)=>propTypeError||propType(...args)),null))),enabledOn:(propType,anotherProp,anotherPropValue)=>wrapWithIsRequired(((props,...rest)=>props[anotherProp]===anotherPropValue?propType(props,...rest):null)),withLength:expectedLengthExpression=>wrapWithIsRequired(((props,propName,componentName)=>{const value=props[propName];if(isNil(value))return null;if(void 0===value.length)return new Error(`Invalid prop '${propName}' with no length field supplied to '${componentName}', expected value with length field`);const length=value.length,expectedLength="number"==typeof expectedLengthExpression?expectedLengthExpression:expectedLengthExpression(props);return length===expectedLength?null:new Error(`Invalid prop '${propName}' with length '${length}' supplied to '${componentName}', expected value with length '${expectedLength}'`)})),elementsWithId:wrapWithIsRequired(((props,propName,componentName,location,propFullName)=>{const prop=props[propName],componentNameSafe=componentName||"<<anonymous>>",propFullNameSafe=propFullName||propName;return Children.toArray(prop).every((child=>isValidElement(child)&&child.props.id))?null:new Error(`Invalid ${location} \`${propFullNameSafe}\` supplied to \`${componentNameSafe}\`. Provide an array/children of React elements with \`id\` prop on each.`)}))};