import React,{useContext}from"react";import PropTypes from"prop-types";import{isIntlShape,TranslatorContext}from"@jutro/locale";import{intlMessageShape}from"@jutro/prop-types";const intlElementPropTypes={id:PropTypes.string.isRequired,tag:PropTypes.string.isRequired,children:intlMessageShape};export const IntlElement=({tag:Tag,children:children,dangerouslySetInnerHTML:dangerouslySetInnerHTML,...others})=>{const translator=useContext(TranslatorContext),content=isIntlShape(children)?translator(children):children;return React.createElement(Tag,others,content)};IntlElement.propTypes=intlElementPropTypes,IntlElement.__docgenInfo={description:"IntlElement\n@type {React.FC<PropTypes.InferProps<typeof intlElementPropTypes>>}\n\n@metadataType element",methods:[],displayName:"IntlElement",props:{id:{type:{name:"string"},required:!0,description:"A unique ID of this element"},tag:{type:{name:"string"},required:!0,description:"The html tag to use when rendering the translated message"},children:{type:{name:"custom",raw:"intlMessageShape"},required:!1,description:"The message that should be translated"}}},IntlElement.__docgenInfo={componentName:"IntlElement",packageName:"@jutro/components",description:"IntlElement",displayName:"IntlElement",methods:[],actualName:"IntlElement",metadataType:"element",props:{id:{type:{name:"string"},required:!0,description:"A unique ID of this element"},tag:{type:{name:"string"},required:!0,description:"The html tag to use when rendering the translated message"},children:{type:{name:"union",value:[{name:"string"},{name:"shape",value:{id:{name:"string",required:!1},defaultMessage:{name:"string",required:!1},args:{name:"shape",value:{},required:!1}}}]},required:!1,description:"The message that should be translated"}}};