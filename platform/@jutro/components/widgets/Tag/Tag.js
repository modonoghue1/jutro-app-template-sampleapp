import React,{useMemo,useContext}from"react";import cx from"classnames";import PropTypes from"prop-types";import{TranslatorContext}from"@jutro/locale";import{intlMessageShape}from"@jutro/prop-types";import{IconButton}from"../IconButton/IconButton";import styles from"./Tag.module.css";import{messages}from"./Tag.messages";const tagPropTypes={id:PropTypes.string,onClick:PropTypes.func,icon:PropTypes.string,renderIcon:PropTypes.func,label:intlMessageShape,disabled:PropTypes.bool,className:PropTypes.string,labelClassName:PropTypes.string,iconWrapperClassName:PropTypes.string,iconClassName:PropTypes.string};export const Tag=({onClick:onClick,renderIcon:renderIcon,label:label,disabled:disabled,icon:icon,className:className,labelClassName:labelClassName,iconWrapperClassName:iconWrapperClassName,iconClassName:iconClassName,id:id})=>{const translator=useContext(TranslatorContext),classes=cx(styles.tag,{[styles.disabled]:disabled},className),labelClasses=cx(styles.label,labelClassName),iconWrapperClasses=cx(styles.deleteButtonWrapper,{[styles.empty]:!onClick},iconWrapperClassName),iconClasses=cx(styles.deleteButton,iconClassName),deleteIcon=useMemo((()=>{if(!onClick)return;const iconButton=React.createElement(IconButton,{disabled:disabled,className:iconClasses,icon:icon,onKeyDown:onClick,onMouseDown:onClick,ariaLabel:messages.closeTagLabel});return renderIcon?renderIcon(iconButton):iconButton}),[disabled,icon,iconClasses,onClick,renderIcon]);return React.createElement("span",{id:id,className:classes,"aria-disabled":disabled},React.createElement("span",{className:labelClasses},translator(label)),React.createElement("span",{className:iconWrapperClasses},deleteIcon))};Tag.propTypes=tagPropTypes,Tag.defaultProps={icon:"gw-close"},Tag.__docgenInfo={description:"Tag\n@type {React.FC<PropTypes.InferProps<typeof tagPropTypes>>}\n\n@metadataType element",methods:[],displayName:"Tag",props:{icon:{defaultValue:{value:"'gw-close'",computed:!1},type:{name:"string"},required:!1,description:"Icon name to render inside icon button"},id:{type:{name:"string"},required:!1,description:"The id for this Tag"},onClick:{type:{name:"func"},required:!1,description:"Callback for icon button click, If not provided button isn't rendered"},renderIcon:{type:{name:"func"},required:!1,description:"Render prop for adding custom wrapper for icon button"},label:{type:{name:"custom",raw:"intlMessageShape"},required:!1,description:"Displayed tag label"},disabled:{type:{name:"bool"},required:!1,description:"Renders tag as disabled"},className:{type:{name:"string"},required:!1,description:"Custom class name for tag"},labelClassName:{type:{name:"string"},required:!1,description:"Custom class name for label"},iconWrapperClassName:{type:{name:"string"},required:!1,description:"Custom class name for icon wrapper"},iconClassName:{type:{name:"string"},required:!1,description:"Custom class name for icon"}}},Tag.__docgenInfo={componentName:"Tag",packageName:"@jutro/components",description:"Tag",displayName:"Tag",methods:[],actualName:"Tag",metadataType:"element",props:{id:{type:{name:"string"},required:!1,description:"The id for this Tag"},onClick:{type:{name:"func"},required:!1,description:"Callback for icon button click, If not provided button isn't rendered"},icon:{type:{name:"string"},required:!1,description:"Icon name to render inside icon button",defaultValue:{value:"'gw-close'",computed:!1}},renderIcon:{type:{name:"func"},required:!1,description:"Render prop for adding custom wrapper for icon button"},label:{type:{name:"union",value:[{name:"string"},{name:"shape",value:{id:{name:"string",required:!1},defaultMessage:{name:"string",required:!1},args:{name:"shape",value:{},required:!1}}}]},required:!1,description:"Displayed tag label"},disabled:{type:{name:"bool"},required:!1,description:"Renders tag as disabled"},className:{type:{name:"string"},required:!1,description:"Custom class name for tag"},labelClassName:{type:{name:"string"},required:!1,description:"Custom class name for label"},iconWrapperClassName:{type:{name:"string"},required:!1,description:"Custom class name for icon wrapper"},iconClassName:{type:{name:"string"},required:!1,description:"Custom class name for icon"}}};