import React,{useCallback,useContext}from"react";import{useKeyPress,useAccessibleRef,combineRefs}from"@jutro/platform";import{IconButton}from"@jutro/components";import{TranslatorContext}from"@jutro/locale";import{messages}from"./AppSwitcher.messages";export const availableIconColors=["light","neutral","dark"];export const AppSwitcherButton=React.forwardRef((({id:id,togglePopover:togglePopover,hasShownPopover:hasShownPopover,iconColor:iconColor,iconClassName:iconClassName,isFocused:isFocused,onIndexFocusChange:onIndexFocusChange},ref)=>{const iconRef=useAccessibleRef(isFocused),translator=useContext(TranslatorContext),showPopover=useCallback((()=>{!hasShownPopover&&togglePopover&&togglePopover()}),[hasShownPopover,togglePopover]),handleArrowUpPress=useCallback(((event,isDownKeyPress)=>{isDownKeyPress&&(onIndexFocusChange&&onIndexFocusChange(-1),showPopover()),event.preventDefault()}),[onIndexFocusChange,showPopover]),handleArrowDownPress=useCallback(((event,isDownKeyPress)=>{isDownKeyPress&&(onIndexFocusChange&&onIndexFocusChange(0),showPopover()),event.preventDefault()}),[onIndexFocusChange,showPopover]);return useKeyPress(iconRef,["ArrowUp"],handleArrowUpPress),useKeyPress(iconRef,["ArrowDown"],handleArrowDownPress),React.createElement(IconButton,{id:id,icon:"gw-apps",ref:combineRefs(ref,iconRef),onClick:togglePopover,iconColor:iconColor,className:iconClassName,"aria-haspopup":"menu","aria-expanded":hasShownPopover,"aria-label":translator(messages.appSwitcher)})}));AppSwitcherButton.displayName="AppSwitcherButton",AppSwitcherButton.__docgenInfo={description:"",methods:[],displayName:"AppSwitcherButton"},AppSwitcherButton.__docgenInfo={componentName:"AppSwitcherButton",packageName:"@jutro/router",description:"",displayName:"AppSwitcherButton",methods:[],actualName:"AppSwitcherButton"};