import _slicedToArray from"@babel/runtime-corejs3/helpers/slicedToArray";import React,{useState,useRef,useCallback,useMemo,useEffect}from"react";import PropTypes from"prop-types";import{Manager,Popper}from"react-popper";import{OutsideClickDetector}from"./OutsideClickDetector";export const availableAlignments=["auto","top","right","bottom","left"].flatMap((align=>["","-start","-end"].map((modificator=>`${align}${modificator}`))));const popoverPropTypes={id:PropTypes.string.isRequired,className:PropTypes.string,children:PropTypes.oneOfType([PropTypes.node,PropTypes.func]),renderTrigger:PropTypes.func.isRequired,align:PropTypes.oneOf(availableAlignments),isFlipEnabled:PropTypes.bool,onClosed:PropTypes.func};export const Popover=({renderTrigger:renderTrigger,align:align,children:children,className:className,id:id,isFlipEnabled:isFlipEnabled,onClosed:onClosed})=>{const _useState=useState(!1),_useState2=_slicedToArray(_useState,2),isShown=_useState2[0],setShown=_useState2[1],hasBeenShown=useRef(!1),triggerRef=useRef(),outsideClickHandler=useCallback((({target:target})=>{triggerRef.current.contains(target)||setShown(!1)}),[triggerRef]),close=useCallback((()=>setShown(!1)),[]),toggle=useCallback((()=>setShown(!isShown)),[isShown]),content=useMemo((()=>"function"==typeof children?children(close):children),[children,close]);if(useEffect((()=>{hasBeenShown.current?!isShown&&onClosed&&onClosed():hasBeenShown.current=!0}),[isShown]),!renderTrigger)return null;const placement=availableAlignments.includes(align)?align:"bottom-end",modifiers=[{name:"offset",options:{offset:[4,4]}},{name:"flip",enabled:isFlipEnabled}];return React.createElement(Manager,null,renderTrigger(toggle,triggerRef,isShown),isShown&&React.createElement(Popper,{referenceElement:triggerRef.current,placement:placement,modifiers:modifiers},(({ref:popperRef,style:style})=>React.createElement(OutsideClickDetector,{onClickOutside:outsideClickHandler,onWindowBlur:close},(detectorRef=>React.createElement("div",{ref:ref=>{popperRef(ref),detectorRef(ref)},style:style,className:className,role:"menu","aria-labelledby":id},content))))))};Popover.propTypes=popoverPropTypes,Popover.defaultProps={align:"bottom-end",isFlipEnabled:!0},Popover.__docgenInfo={description:"Popover\n@type {React.FC<PropTypes.InferProps<typeof popoverPropTypes>>}",methods:[],displayName:"Popover",props:{align:{defaultValue:{value:"'bottom-end'",computed:!1},type:{name:"enum",computed:!0,value:"availableAlignments"},required:!1,description:"Popover alignment (relative to trigger element)"},isFlipEnabled:{defaultValue:{value:"true",computed:!1},type:{name:"bool"},required:!1,description:"Should popover flip when it is about to overflow the visible area"},id:{type:{name:"string"},required:!0,description:"Used to identify this component."},className:{type:{name:"string"},required:!1,description:"CSS class name for this component"},children:{type:{name:"union",value:[{name:"node"},{name:"func"}]},required:!1,description:"Notification popover content or renderProp to render this content"},renderTrigger:{type:{name:"func"},required:!0,description:"Function to render trigger element"},onClosed:{type:{name:"func"},required:!1,description:"Function called when the notification disappear"}}},Popover.__docgenInfo={componentName:"Popover",packageName:"@jutro/components",description:"Popover",displayName:"Popover",methods:[],actualName:"Popover",props:{id:{type:{name:"string"},required:!0,description:"Used to identify this component."},className:{type:{name:"string"},required:!1,description:"CSS class name for this component"},children:{type:{name:"union",value:[{name:"node"},{name:"func"}]},required:!1,description:"Notification popover content or renderProp to render this content"},renderTrigger:{type:{name:"func"},required:!0,description:"Function to render trigger element"},align:{type:{name:"enum",computed:!0,value:"availableAlignments"},required:!1,description:"Popover alignment (relative to trigger element)",defaultValue:{value:"'bottom-end'",computed:!1}},isFlipEnabled:{type:{name:"bool"},required:!1,description:"Should popover flip when it is about to overflow the visible area",defaultValue:{value:"true",computed:!1}},onClosed:{type:{name:"func"},required:!1,description:"Function called when the notification disappear"}}};