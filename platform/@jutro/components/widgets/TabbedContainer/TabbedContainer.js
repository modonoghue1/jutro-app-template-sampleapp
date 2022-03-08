import React from"react";import PropTypes from"prop-types";import{uniqueInnerId}from"@jutro/platform";import{Tab}from"../tab/Tab";import{TabSet}from"../tab/TabSet";const tabShape=PropTypes.shape({...Tab.propTypes}),tabbedContainerPropTypes={id:PropTypes.string.isRequired,className:PropTypes.string,tabs:PropTypes.arrayOf(tabShape).isRequired,defaultActiveTabId:PropTypes.string.isRequired};export const TabbedContainer=({id:id,className:className,tabs:tabs,defaultActiveTabId:defaultActiveTabId})=>{const tabSetId=uniqueInnerId(id,"tabSetId").tabSetId;return React.createElement("div",{id:id,className:className},React.createElement(TabSet,{id:`${tabSetId}_tabSet`,defaultActiveTab:defaultActiveTabId},tabs.map((tab=>React.createElement(Tab,{id:tab.id,key:tab.id,heading:tab.heading},tab.content)))))};TabbedContainer.propTypes=tabbedContainerPropTypes,TabbedContainer.__docgenInfo={description:"TabbedContainer\n@type {React.FC<PropTypes.InferProps<typeof tabbedContainerPropTypes>>}",methods:[],displayName:"TabbedContainer",props:{id:{type:{name:"string"},required:!0,description:"Used to uniquely identify the tabbed container component"},className:{type:{name:"string"},required:!1,description:"Additional class names for the component"},tabs:{type:{name:"arrayOf",value:{name:"custom",raw:"tabShape"}},required:!0,description:"Array of objects describing how the tabs within the tabbed container/tabset will be rendered"},defaultActiveTabId:{type:{name:"string"},required:!0,description:"Prop to pass into the TabSet for determining the tab that is active by default"}}},TabbedContainer.__docgenInfo={componentName:"TabbedContainer",packageName:"@jutro/components",description:"TabbedContainer",displayName:"TabbedContainer",methods:[],actualName:"TabbedContainer",props:{id:{type:{name:"string"},required:!0,description:"Used to uniquely identify the tabbed container component"},className:{type:{name:"string"},required:!1,description:"Additional class names for the component"},tabs:{type:{name:"arrayOf",value:{name:"custom",raw:"tabShape"}},required:!0,description:"Array of objects describing how the tabs within the tabbed container/tabset will be rendered"},defaultActiveTabId:{type:{name:"string"},required:!0,description:"Prop to pass into the TabSet for determining the tab that is active by default"}}};