import React,{useContext}from"react";import{TranslatorContext}from"@jutro/locale";import PropTypes from"prop-types";const liveRegionPropTypes={liveType:PropTypes.oneOf(["polite","off","assertive"]),context:PropTypes.string,contextClass:PropTypes.string,children:PropTypes.node};export const LiveRegion=({liveType:liveType,children:children,contextClass:contextClass,context:context})=>{const translator=useContext(TranslatorContext);return React.createElement("div",{style:{display:"inline-flex"},"aria-live":liveType,"aria-atomic":"true"},context&&React.createElement("span",{className:contextClass},translator(context)),children)};LiveRegion.propTypes=liveRegionPropTypes,LiveRegion.defaultProps={liveType:"polite"},LiveRegion.__docgenInfo={description:"Helper to make the content use Live Region. Used to alert the users using assistive technologies about the dynamic content\nthat gets updated automatically.\n\n@type {React.FC<PropTypes.InferProps<typeof liveRegionPropTypes>>}",methods:[],displayName:"LiveRegion",props:{liveType:{defaultValue:{value:"'polite'",computed:!1},type:{name:"enum",value:[{value:"'polite'",computed:!1},{value:"'off'",computed:!1},{value:"'assertive'",computed:!1}]},required:!1,description:"Used to tell the assistive technologies when to announce the user about the updates to dynamic content.\nread https://bitsofco.de/using-aria-live/ for more info."},context:{type:{name:"string"},required:!1,description:'Used to give some context when assistive technlogies such as voice over, reading the dynamic content to the users.\nE.g. Unread Emails 9. Here "Unread Emails" is the context and the number 9 is the dynamic content that gets updated\non the badge.'},contextClass:{type:{name:"string"},required:!1,description:"Used to style the context. E.g. if we dont want the context to be visible to the user but want to be there for the\nassistive technologies to read, we can style it to be 1 px content."},children:{type:{name:"node"},required:!1,description:"Component that contains the dyamic content."}}},LiveRegion.__docgenInfo={componentName:"LiveRegion",packageName:"@jutro/components",description:"Helper to make the content use Live Region. Used to alert the users using assistive technologies about the dynamic content\nthat gets updated automatically.",displayName:"LiveRegion",methods:[],actualName:"LiveRegion",props:{liveType:{type:{name:"enum",value:[{value:"'polite'",computed:!1},{value:"'off'",computed:!1},{value:"'assertive'",computed:!1}]},required:!1,description:"Used to tell the assistive technologies when to announce the user about the updates to dynamic content.\nread https://bitsofco.de/using-aria-live/ for more info.",defaultValue:{value:"'polite'",computed:!1}},context:{type:{name:"string"},required:!1,description:'Used to give some context when assistive technlogies such as voice over, reading the dynamic content to the users.\nE.g. Unread Emails 9. Here "Unread Emails" is the context and the number 9 is the dynamic content that gets updated\non the badge.'},contextClass:{type:{name:"string"},required:!1,description:"Used to style the context. E.g. if we dont want the context to be visible to the user but want to be there for the\nassistive technologies to read, we can style it to be 1 px content."},children:{type:{name:"node"},required:!1,description:"Component that contains the dyamic content."}}};