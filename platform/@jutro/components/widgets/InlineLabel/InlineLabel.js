import _extends from"@babel/runtime-corejs3/helpers/extends";import React,{memo}from"react";import PropTypes from"prop-types";import{sanitizeProps}from"@jutro/platform";const wrapperStyle={display:"inline-flex",alignItems:"center",justifyContent:"center"},inlineLabelPropTypes={icon:PropTypes.node,iconPosition:PropTypes.string,tag:PropTypes.oneOfType([PropTypes.string,PropTypes.elementType]),children:PropTypes.node.isRequired},InlineLabelInternal=React.forwardRef((({icon:icon,iconPosition:iconPosition,children:children,tag:tag,dangerouslySetInnerHTML:dangerouslySetInnerHTML,...rest},ref)=>{const isRightIcon="right"===iconPosition,isLeftIcon=!isRightIcon,safeRest=sanitizeProps(rest),Tag=tag||"span";return React.createElement(Tag,_extends({ref:ref,style:wrapperStyle},safeRest),isLeftIcon&&icon,children,isRightIcon&&icon)}));InlineLabelInternal.propTypes=inlineLabelPropTypes,InlineLabelInternal.defaultProps={tag:"span",iconPosition:"left"},InlineLabelInternal.displayName="InlineLabel";export const InlineLabel=memo(InlineLabelInternal);InlineLabelInternal.__docgenInfo={description:"",methods:[],displayName:"InlineLabel",props:{tag:{defaultValue:{value:"'span'",computed:!1},type:{name:"union",value:[{name:"string"},{name:"elementType"}]},required:!1,description:"Tag used to wrap the label"},iconPosition:{defaultValue:{value:"'left'",computed:!1},type:{name:"string"},required:!1,description:"Flag indicating which side should the optional icon take"},icon:{type:{name:"node"},required:!1,description:"Icon that's supposed to be attached"},children:{type:{name:"node"},required:!0,description:"Content to render"}}},InlineLabel.__docgenInfo={componentName:"InlineLabel",packageName:"@jutro/components",description:"",displayName:"InlineLabel",methods:[],actualName:"InlineLabel",props:{icon:{type:{name:"node"},required:!1,description:"Icon that's supposed to be attached"},iconPosition:{type:{name:"string"},required:!1,description:"Flag indicating which side should the optional icon take",defaultValue:{value:"'left'",computed:!1}},tag:{type:{name:"union",value:[{name:"string"},{name:"elementType"}]},required:!1,description:"Tag used to wrap the label",defaultValue:{value:"'span'",computed:!1}},children:{type:{name:"node"},required:!0,description:"Content to render"}}};