import React from"react";import{Badge}from"@jutro/components";import styles from"./SideNavigation.module.css";export const renderBadge=(notifications,id)=>notifications?React.createElement("span",{className:styles.notificationWrapper},React.createElement(Badge,{id:id,type:"primary",value:notifications,maxValue:9,className:styles.notifications})):null;renderBadge.__docgenInfo={description:"",methods:[],displayName:"renderBadge"},renderBadge.__docgenInfo={componentName:"renderBadge",packageName:"@jutro/router",description:"",displayName:"renderBadge",methods:[],actualName:"renderBadge"};