import React,{useContext}from"react";import PropTypes from"prop-types";import cx from"classnames";import{TranslatorContext}from"@jutro/locale";import styles from"./AppFloorPlan.module.css";import{messages}from"./AppFloorPlan.messages";PropTypes.node,PropTypes.string,PropTypes.node,PropTypes.node,PropTypes.node,PropTypes.node,PropTypes.bool;const AppFloorPlanLayout=props=>{const translator=useContext(TranslatorContext),rightSide=props.rightSide,children=props.children,className=props.className,footer=props.footer,header=props.header,subHeader=props.subHeader,leftSide=props.leftSide,scrollContent=props.scrollContent,floorPlanClasses=cx(styles.appFloorPlan,{[styles.scrollContent]:scrollContent},className);return React.createElement("div",{className:floorPlanClasses,"data-testid":"floorplan-layout"},header,subHeader,leftSide&&React.createElement("nav",{className:styles.leftSide,title:translator(messages.sideNavTitle)},leftSide),React.createElement("main",{className:styles.main,tabIndex:scrollContent?0:-1},children),rightSide&&React.createElement("aside",{className:styles.rightSide},rightSide),footer)};AppFloorPlanLayout.__docgenInfo={description:"",methods:[],displayName:"AppFloorPlanLayout"};export default AppFloorPlanLayout;AppFloorPlanLayout.__docgenInfo={componentName:"AppFloorPlanLayout",packageName:"@jutro/floorplan",description:"",displayName:"AppFloorPlanLayout",methods:[],actualName:"AppFloorPlanLayout"};