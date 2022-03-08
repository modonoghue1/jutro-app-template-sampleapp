import _slicedToArray from"@babel/runtime-corejs3/helpers/slicedToArray";import React,{useContext,useState,useEffect,useCallback,useRef}from"react";import cx from"classnames";import PropTypes from"prop-types";import{useBreakpoint}from"@jutro/layout";import{Collapse,IconButton}from"@jutro/components";import{TranslatorContext}from"@jutro/locale";import{contextSwitcherShape,routesShape}from"@jutro/prop-types";import{shouldShowIcons,removeNavLinkIcon}from"../navBarHelper";import styles from"./SideNavigation.module.css";import{messages}from"./SideNavigation.messages";import{NavigationContent}from"../NavigationContent";import{NavigationContext}from"../NavigationContext";import{NavBarAccordion}from"./NavBarAccordion/NavBarAccordion";export const SideNavigation=({className:className,routes:routes,contextSwitcher:contextSwitcher,collapsible:collapsibleProp,collapsed:collapsed,expandOverContent:expandOverContent})=>{const wrapperRef=useRef(),_useState=useState(""),_useState2=_slicedToArray(_useState,2),activeRoute=_useState2[0],setActiveRoute=_useState2[1],_useState3=useState(collapsed),_useState4=_slicedToArray(_useState3,2),isCollapsed=_useState4[0],setIsCollapsed=_useState4[1],_useState5=useState(""),_useState6=_slicedToArray(_useState5,2),collapsedWidth=_useState6[0],setCollapsedWidth=_useState6[1],breakpoint=useBreakpoint().breakpoint,isCollapsible=!contextSwitcher&&collapsibleProp;useEffect((()=>{setIsCollapsed(collapsed)}),[collapsed]),useEffect((()=>{setCollapsedWidth(getComputedStyle(wrapperRef.current).getPropertyValue("--GW-SIDE-NAV-COLLAPSED-WIDTH"))}),[]);const classes=cx(styles.sideNavigation,{[styles.collapsed]:isCollapsible&&isCollapsed}),addSideNavStyles=useCallback((({navLink:navLink,...rest})=>({...rest,navLink:{...navLink,className:cx(navLink&&navLink.className,styles.navBarLink)}})),[styles.navBarLink]),sideRoutes=shouldShowIcons(routes)?routes:routes.map(removeNavLinkIcon),translator=useContext(TranslatorContext),footer=isCollapsible&&React.createElement("div",{className:styles.footer},React.createElement(IconButton,{icon:isCollapsed?"gw-chevron-right":"gw-chevron-left",className:styles.chevronWrapper,iconClassName:styles.chevronIcon,onClick:()=>{setIsCollapsed(!isCollapsed)},ariaLabel:translator(isCollapsed?messages.collapsedButtonLabel:messages.expandedButtonLabel)})),showContextSwitcher=contextSwitcher&&"phone"!==breakpoint;return React.createElement("div",{className:classes,ref:wrapperRef},React.createElement(Collapse,{isOpen:!isCollapsed,timeout:250,isHorizontal:!0,expandOverContent:expandOverContent,collapsedSize:collapsedWidth,outerContentWrapperClassName:cx(styles.collapseInnerWrapper,className)},React.createElement("div",{className:styles.content},React.createElement("div",{className:styles.layout},React.createElement(NavigationContext.Provider,{value:{activeRoute:activeRoute,setActiveRoute:setActiveRoute,isCollapsed:isCollapsed,expand:()=>setIsCollapsed(!1),collapse:()=>setIsCollapsed(!0)}},React.createElement(NavigationContent,{routes:sideRoutes.map(addSideNavStyles),contextSwitcher:showContextSwitcher?contextSwitcher:void 0,alignment:"left",className:styles.navigationContent,nestedRoutesComponent:NavBarAccordion})),footer))))};SideNavigation.propTypes={className:PropTypes.string,routes:routesShape.isRequired,contextSwitcher:contextSwitcherShape,collapsible:PropTypes.bool,collapsed:PropTypes.bool,expandOverContent:PropTypes.bool},SideNavigation.defaultProps={collapsible:!1,collapsed:!1},SideNavigation.__docgenInfo={description:"The `SideNavigation` component is designed as a container for navigation links and dropdowns\n\n@param {object} props properties for SideNavigation component\n@returns {React.ReactElement}\n\n@metadataType container",methods:[],displayName:"SideNavigation",props:{collapsible:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:"Defines whether component can be collapsed"},collapsed:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:"Default state for SideNavigation"},className:{type:{name:"string"},required:!1,description:"Additional class names for component."},routes:{type:{name:"custom",raw:"routesShape.isRequired"},required:!1,description:"Routing metadata object"},contextSwitcher:{type:{name:"custom",raw:"contextSwitcherShape"},required:!1,description:"Context switcher object"},expandOverContent:{type:{name:"bool"},required:!1,description:"If true, menu will expand over content. If false, content will be squeezed"}}},SideNavigation.__docgenInfo={componentName:"SideNavigation",packageName:"@jutro/router",description:"The `SideNavigation` component is designed as a container for navigation links and dropdowns",displayName:"SideNavigation",methods:[],actualName:"SideNavigation",metadataType:"container",props:{className:{type:{name:"string"},required:!1,description:"Additional class names for component."},routes:{type:{name:"arrayOf",value:{name:"custom",raw:"routeShape"}},required:!0,description:"Routing metadata object"},contextSwitcher:{type:{name:"shape",value:{defaultLabel:{name:"custom",raw:"intlMessageShape",description:"Default button label when no context is active",required:!1},values:{name:"arrayOf",value:{name:"custom",raw:"contextShape.isRequired"},description:"Array of values for the contexts",required:!0}}},required:!1,description:"Context switcher object"},collapsible:{type:{name:"bool"},required:!1,description:"Defines whether component can be collapsed",defaultValue:{value:"false",computed:!1}},collapsed:{type:{name:"bool"},required:!1,description:"Default state for SideNavigation",defaultValue:{value:"false",computed:!1}},expandOverContent:{type:{name:"bool"},required:!1,description:"If true, menu will expand over content. If false, content will be squeezed"}}};