import _extends from"@babel/runtime-corejs3/helpers/extends";import React from"react";import PropTypes from"prop-types";import cx from"classnames";import{Button}from"@jutro/components";import{intlMessageShape}from"@jutro/prop-types";import{DropdownMenu}from"./DropdownMenu";import styles from"./DropdownMenuButton.module.css";export const DropdownMenuButton=({id:id,buttonText:buttonText,isOpen:isOpenProp,dropUp:dropUp,alignRight:alignRight,menuClassName:menuClassName,children:children,...buttonProps})=>{const menuProps={isOpen:isOpenProp,dropUp:dropUp,alignRight:alignRight,menuClassName:menuClassName},classes=cx({[styles.fullWidth]:buttonProps&&buttonProps.fullWidth});return React.createElement(DropdownMenu,_extends({id:id,className:classes},menuProps,{renderTrigger:({id:buttonId,menuId:menuId,isOpen:isOpen,...other},toggleMenu)=>React.createElement(Button,_extends({id:buttonId},other,buttonProps,{onClick:()=>toggleMenu(!isOpen),"aria-controls":menuId,"aria-haspopup":"true"}),buttonText)}),children)};DropdownMenuButton.propTypes={id:PropTypes.string.isRequired,buttonText:PropTypes.oneOfType([PropTypes.node,intlMessageShape]),isOpen:PropTypes.bool,dropUp:PropTypes.bool,alignRight:PropTypes.bool,menuClassName:PropTypes.string,children:PropTypes.node},DropdownMenuButton.__docgenInfo={description:"DropdownMenuButton\n\n@type {React.FC<DropdownMenuButtonProps>}\n\n @metadataType action",methods:[],displayName:"DropdownMenuButton",props:{id:{type:{name:"string"},required:!0,description:"Used to identify menu component."},buttonText:{type:{name:"union",value:[{name:"node"},{name:"custom",raw:"intlMessageShape"}]},required:!1,description:"Content to be rendered as the 'children' for the 'Button' component."},isOpen:{type:{name:"bool"},required:!1,description:"The prop that indicates if the menu is currently visible."},dropUp:{type:{name:"bool"},required:!1,description:"If `true`, the menu appears above the trigger component."},alignRight:{type:{name:"bool"},required:!1,description:"If `true`, menu items are aligned to the right edge of the menu."},menuClassName:{type:{name:"string"},required:!1,description:"Override class for the inner menu of the dropdown menu"},children:{type:{name:"node"},required:!1,description:"The component children wrapped by the dropdown menu button component."}}},DropdownMenuButton.__docgenInfo={componentName:"DropdownMenuButton",packageName:"@jutro/router",description:"DropdownMenuButton",displayName:"DropdownMenuButton",methods:[],actualName:"DropdownMenuButton",metadataType:"action",props:{id:{type:{name:"string"},required:!0,description:"Used to identify menu component."},buttonText:{type:{name:"union",value:[{name:"node"},{name:"union",value:[{name:"string"},{name:"shape",value:{id:{name:"string",required:!1},defaultMessage:{name:"string",required:!1},args:{name:"shape",value:{},required:!1}}}]}]},required:!1,description:"Content to be rendered as the 'children' for the 'Button' component."},isOpen:{type:{name:"bool"},required:!1,description:"The prop that indicates if the menu is currently visible."},dropUp:{type:{name:"bool"},required:!1,description:"If `true`, the menu appears above the trigger component."},alignRight:{type:{name:"bool"},required:!1,description:"If `true`, menu items are aligned to the right edge of the menu."},menuClassName:{type:{name:"string"},required:!1,description:"Override class for the inner menu of the dropdown menu"},children:{type:{name:"node"},required:!1,description:"The component children wrapped by the dropdown menu button component."}}};