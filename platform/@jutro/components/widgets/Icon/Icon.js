import _extends from"@babel/runtime-corejs3/helpers/extends";import _slicedToArray from"@babel/runtime-corejs3/helpers/slicedToArray";import React,{memo,useRef,useLayoutEffect,useState,useImperativeHandle}from"react";import PropTypes from"prop-types";import cx from"classnames";import{deprecated}from"@jutro/prop-types";import{warning}from"@jutro/logger";import styles from"./Icon.module.css";import{getIconClasses,isGwIcon,isHexColor}from"../../iconUtils.js";import{IconSVG}from"./IconSVG";export const iconSizes=["small","medium","large"];const iconPropTypes={className:PropTypes.string,icon:PropTypes.string.isRequired,size:PropTypes.oneOf(["small","medium","large"]),color:PropTypes.string,isFixedWidth:deprecated(PropTypes.bool,"7.0.0"),tag:deprecated(PropTypes.string,"7.0.0"),_rest:PropTypes.any},IconInternal=React.forwardRef((({icon:icon,isFixedWidth:isFixedWidth,size:size,color:color,className:className,tag:tag,noDeprecationWarnings:noDeprecationWarnings,dangerouslySetInnerHTML:dangerouslySetInnerHTML,...rest},ref)=>{const Tag=tag||"i",iconRef=useRef(void 0),_useState=useState(!1),_useState2=_slicedToArray(_useState,2),emptyIcon=_useState2[0],setEmptyIcon=_useState2[1],gwIconCheck=isGwIcon(icon),isValidHexColor=!isHexColor(color);if(useImperativeHandle(ref,(()=>iconRef.current)),useLayoutEffect((()=>{const isEmptyIcon=!iconRef.current||!gwIconCheck&&"none"===window.getComputedStyle(iconRef.current,":before").content;setEmptyIcon(isEmptyIcon),color&&isValidHexColor&&warning(`Incorrect HEX string: ${color} provided in color prop for Icon.`)}),[icon,iconRef,color]),!icon)return null;const classes=cx(getIconClasses(icon,Boolean(isFixedWidth)),{[styles.empty]:emptyIcon},{[styles.iconSize1]:"small"===size,[styles.iconSize2]:"medium"===size,[styles.iconSize3]:"large"===size},className);return gwIconCheck?React.createElement(IconSVG,{ref:iconRef,icon:icon,color:isValidHexColor?void 0:color,className:classes,svgProps:rest}):React.createElement(Tag,_extends({ref:iconRef,style:color&&(isValidHexColor?void 0:{color:color}),className:classes},rest))}));IconInternal.displayName="Icon",IconInternal.propTypes=iconPropTypes;export const Icon=memo(IconInternal);Icon.displayName="Icon",Icon.__docgenInfo={componentName:"Icon",packageName:"@jutro/components",description:"",displayName:"Icon",methods:[],actualName:"Icon",metadataType:"element",props:{className:{type:{name:"string"},required:!1,description:"CSS class name for this component"},icon:{type:{name:"string"},required:!0,description:"icon name to be used"},size:{type:{name:"enum",value:[{value:"'small'",computed:!1},{value:"'medium'",computed:!1},{value:"'large'",computed:!1}]},required:!1,description:"Determines the size of icon"},color:{type:{name:"string"},required:!1,description:"Determines the color (HEX code) of icon"},isFixedWidth:{type:{name:"bool"},required:!1,description:"Flag for fixed width icons\n@deprecated it was used only for font-awesome icons and has no effect now",deprecationInfo:{version:"7.0.0",mapTo:null}},tag:{type:{name:"string"},required:!1,description:"Tag used to render icon\n@deprecated tag will be selected internally based on icon type/a11y etc, it's not safe to pass it it from outside",deprecationInfo:{version:"7.0.0",mapTo:null}},_rest:{type:{name:"any"},required:!1,description:"Set of custom props, specific to a particular tag being used"}}};