import React from"react";import PropTypes from"prop-types";import{intlMessageShape}from"@jutro/prop-types";import{HelpElement}from"./HelpElement";const helpParagraphPropTypes={className:PropTypes.string,content:PropTypes.oneOfType([PropTypes.node,intlMessageShape])};export const HelpParagraph=({content:content,className:className})=>React.createElement(HelpElement,{className:className,tag:"p",content:content});HelpParagraph.propTypes=helpParagraphPropTypes,HelpParagraph.__docgenInfo={description:"The `HelpParagraph` component is designed as a simple component presenting text inside the Help dropdown on Application Header.\n\n@type {function({text: *, className: *}): *}\n\n@metadataType element",methods:[],displayName:"HelpParagraph",props:{className:{type:{name:"string"},required:!1,description:"Additional class names for component."},content:{type:{name:"union",value:[{name:"node"},{name:"custom",raw:"intlMessageShape"}]},required:!1,description:"Content to render"}}},HelpParagraph.__docgenInfo={componentName:"HelpParagraph",packageName:"@jutro/components",description:"The `HelpParagraph` component is designed as a simple component presenting text inside the Help dropdown on Application Header.",displayName:"HelpParagraph",methods:[],actualName:"HelpParagraph",metadataType:"element",props:{className:{type:{name:"string"},required:!1,description:"Additional class names for component."},content:{type:{name:"union",value:[{name:"node"},{name:"union",value:[{name:"string"},{name:"shape",value:{id:{name:"string",required:!1},defaultMessage:{name:"string",required:!1},args:{name:"shape",value:{},required:!1}}}]}]},required:!1,description:"Content to render"}}};