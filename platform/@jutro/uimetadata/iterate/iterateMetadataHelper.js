import{isIntlShape}from"@jutro/locale";import get from"lodash/get";import set from"lodash/set";import isArray from"lodash/isArray";import isObject from"lodash/isObject";import cloneDeep from"lodash/cloneDeep";import isNil from"lodash/isNil";import{_ITEM_DATA_,_ITEM_INDEX_,_ITEM_PATH_,VARIABLE_FORMAT_REGEX}from"../common/templates";function formatString(content,repeatItem,repeatItemIndex,repeatItemPath){const isIntl=isIntlShape(content),str=isIntl?content.defaultMessage:content;if(!str||!str.includes("{")||!repeatItem)return content;const formatted=str.match(VARIABLE_FORMAT_REGEX).reduce(((formattedString,variable)=>{const key=variable.substr(1,variable.length-2);let value;switch(key){case _ITEM_PATH_:value=repeatItemPath;break;case _ITEM_INDEX_:value=repeatItemIndex;break;default:value=get(repeatItem,key,"")}return formattedString===variable?value:formattedString.replace(variable,value)}),str);return isIntl?{...content,id:content.id,defaultMessage:formatted,args:{[_ITEM_PATH_]:repeatItemPath,[_ITEM_INDEX_]:repeatItemIndex,...repeatItem}}:formatted}function resolveContent(template,repeatPath,repeatItem,repeatIndex,variableProps){const id=template.id,templateContent=template.content,componentProps=template.componentProps,templateOverrides={componentProps:{}},repeatItemPath=repeatPath?`${repeatPath}[${repeatIndex}]`:repeatIndex;isArray(variableProps)&&variableProps.forEach((variableProp=>{switch(variableProp){case"content":if(!templateContent)break;templateOverrides.content=isArray(templateContent)?templateContent.map((nestedTemplate=>resolveContent(nestedTemplate,repeatPath,repeatItem,repeatIndex,variableProps))):formatString(templateContent,repeatItem,repeatIndex,repeatItemPath);break;case"data":componentProps&&componentProps.data&&(templateOverrides.componentProps.data=componentProps.data===`{${_ITEM_DATA_}}`?repeatItem:formatString(componentProps.data,repeatItem,repeatIndex,repeatItemPath));break;default:{const variableValue=get(componentProps,variableProp);if(function(variableProp,componentProps,templateOverrides){const firstDotIndex=variableProp.indexOf(".");if(-1!==firstDotIndex){const firstProp=variableProp.substr(0,firstDotIndex),firstValue=get(componentProps,firstProp);isObject(firstValue)&&void 0===templateOverrides.componentProps[firstProp]&&set(templateOverrides.componentProps,firstProp,cloneDeep(firstValue))}}(variableProp,componentProps,templateOverrides),void 0!==variableValue){const resolvedValue=formatString(variableValue,repeatItem,repeatIndex,repeatItemPath);isNil(resolvedValue)||""===resolvedValue?set(templateOverrides.componentProps,variableProp,void 0):set(templateOverrides.componentProps,variableProp,resolvedValue)}break}}}));const repeatIndexId=`${id}${repeatIndex}`;return{...template,...templateOverrides,componentProps:{...componentProps,...templateOverrides.componentProps},key:repeatIndexId,id:repeatIndexId}}export function iterateMetadata({contentAfter:contentAfter,contentBefore:contentBefore,contentEmpty:contentEmpty,contentRepeat:contentRepeat,contentRepeatAfter:contentRepeatAfter,contentRepeatBefore:contentRepeatBefore,repeatData:repeatData,repeatPath:repeatPath}){let resolvedContent,repeatDataLength;if(isArray(repeatData)&&repeatData.length>0){const template=contentRepeat.content,variableProps=contentRepeat.variableProps;repeatDataLength=repeatData.length,resolvedContent=repeatData.map(((repeatItem,repeatIndex)=>resolveContent(template,repeatPath,repeatItem,repeatIndex,variableProps)))}else resolvedContent=contentEmpty||[];return(contentBefore||contentAfter||contentRepeatBefore||contentRepeatAfter)&&(resolvedContent=[...contentBefore||[],...repeatDataLength&&contentRepeatBefore?contentRepeatBefore:[],...resolvedContent,...repeatDataLength&&contentRepeatAfter?contentRepeatAfter:[],...contentAfter||[]]),resolvedContent}