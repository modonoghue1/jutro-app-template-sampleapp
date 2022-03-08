import React,{useCallback,useRef}from"react";import PropTypes from"prop-types";import cx from"classnames";import{useKeyActive}from"@jutro/platform";import styles from"./ClickableCard.module.css";import{getKeyPressHandler}from"../../accessibility/getKeyPressHandler";const clickableCardPropTypes={id:PropTypes.string,className:PropTypes.string,children:PropTypes.node,onClick:PropTypes.func,disabled:PropTypes.bool};export const ClickableCard=({id:id,className:className,children:children,onClick:onClick,disabled:disabled})=>{const ref=useRef(),isActiveKeyPressed=useKeyActive(ref),handleClick=useCallback((evt=>{evt.target===evt.currentTarget&&onClick&&onClick()}),[onClick]),handleKeyPress=useCallback(getKeyPressHandler(handleClick),[handleClick]),clickableCardClass=cx({[styles.activeKeypress]:isActiveKeyPressed,[styles.disabled]:disabled},styles.clickableCard,className);return React.createElement("button",{id:id,disabled:disabled,className:clickableCardClass,onClick:handleClick,onKeyPress:handleKeyPress,ref:ref},children)};ClickableCard.propTypes=clickableCardPropTypes,ClickableCard.defaultProps={disabled:!1},ClickableCard.__docgenInfo={description:"ClickableCard\n@type {React.FC<PropTypes.InferProps<typeof clickableCardPropTypes>>}\n\n@metadataType container",methods:[],displayName:"ClickableCard",props:{disabled:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:"If true, Card component is disabled"},id:{type:{name:"string"},required:!1,description:"A unique ID of this component"},className:{type:{name:"string"},required:!1,description:"CSS class name for this component"},children:{type:{name:"node"},required:!1,description:"Card's content"},onClick:{type:{name:"func"},required:!1,description:"Card's click handler"}}},ClickableCard.__docgenInfo={componentName:"ClickableCard",packageName:"@jutro/components",description:"ClickableCard",displayName:"ClickableCard",methods:[],actualName:"ClickableCard",metadataType:"container",props:{id:{type:{name:"string"},required:!1,description:"A unique ID of this component"},className:{type:{name:"string"},required:!1,description:"CSS class name for this component"},children:{type:{name:"node"},required:!1,description:"Card's content"},onClick:{type:{name:"func"},required:!1,description:"Card's click handler"},disabled:{type:{name:"bool"},required:!1,description:"If true, Card component is disabled",defaultValue:{value:"false",computed:!1}}}};