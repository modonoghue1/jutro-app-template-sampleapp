import React from"react";import PropTypes from"prop-types";import{intlMessageShape,IntlMessageShape,placementOptions}from"@jutro/prop-types";export const ActionItem=()=>React.createElement(React.Fragment,null);ActionItem.propTypes={icon:PropTypes.string,onClick:PropTypes.func,label:intlMessageShape,isEditTrigger:PropTypes.bool,triggerOnRowClick:PropTypes.bool,singleActionType:PropTypes.oneOf(["icon","link"]),tooltip:PropTypes.shape({content:intlMessageShape,placement:PropTypes.oneOf(placementOptions)})},ActionItem.displayName="ActionItem",ActionItem.__docgenInfo={description:"ActionItem\n@returns {null} - The ActionItem component does not render anything\n\n@metadataType action",methods:[],displayName:"ActionItem",props:{icon:{type:{name:"string"},required:!1,description:"Optional icon name"},onClick:{type:{name:"func"},required:!1,description:"Action for click event - ignored if `isEditTrigger` enabled"},label:{type:{name:"custom",raw:"intlMessageShape"},required:!1,description:"Label for action"},isEditTrigger:{type:{name:"bool"},required:!1,description:"Determines if action triggers edit mode for row"},triggerOnRowClick:{type:{name:"bool"},required:!1,description:"Determines if row click should trigger action"},singleActionType:{type:{name:"enum",value:[{value:"'icon'",computed:!1},{value:"'link'",computed:!1}]},required:!1,description:"If action is single - determines it should be displayed as icon or link"},tooltip:{type:{name:"shape",value:{content:{name:"custom",raw:"intlMessageShape",required:!1},placement:{name:"enum",computed:!0,value:"placementOptions",required:!1}}},required:!1,description:"Tooltip props"}}},ActionItem.__docgenInfo={componentName:"ActionItem",packageName:"@jutro/datatable",description:"ActionItem",displayName:"ActionItem",methods:[],actualName:"ActionItem",metadataType:"action",props:{icon:{type:{name:"string"},required:!1,description:"Optional icon name"},onClick:{type:{name:"func"},required:!1,description:"Action for click event - ignored if `isEditTrigger` enabled"},label:{type:{name:"union",value:[{name:"string"},{name:"shape",value:{id:{name:"string",required:!1},defaultMessage:{name:"string",required:!1},args:{name:"shape",value:{},required:!1}}}]},required:!1,description:"Label for action"},isEditTrigger:{type:{name:"bool"},required:!1,description:"Determines if action triggers edit mode for row"},triggerOnRowClick:{type:{name:"bool"},required:!1,description:"Determines if row click should trigger action"},singleActionType:{type:{name:"enum",value:[{value:"'icon'",computed:!1},{value:"'link'",computed:!1}]},required:!1,description:"If action is single - determines it should be displayed as icon or link"},tooltip:{type:{name:"shape",value:{content:{name:"union",required:!1,value:[{name:"string"},{name:"shape",value:{id:{name:"string",required:!1},defaultMessage:{name:"string",required:!1},args:{name:"shape",value:{},required:!1}}}]},placement:{name:"enum",computed:!0,value:"placementOptions",required:!1}}},required:!1,description:"Tooltip props"}}};