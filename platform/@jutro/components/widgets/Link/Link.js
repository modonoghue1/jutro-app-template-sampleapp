import _objectWithoutProperties from"@babel/runtime-corejs3/helpers/objectWithoutProperties";import React,{useContext,memo}from"react";import{NavLink}from"react-router-dom";import PropTypes from"prop-types";import cx from"classnames";import isString from"lodash/isString";import{JUTRO_TOPICS}from"@jutro/events";import{historyPropTypes,intlMessageShape,intlToShape}from"@jutro/prop-types";import{TranslatorContext,useSafeTranslatedUrls}from"@jutro/locale";import{Router}from"react-router";import{trackMethod}from"../../helpers";import{getKeyPressHandler}from"../../accessibility/getKeyPressHandler";import styles from"./Link.module.css";import{Icon}from"../Icon/Icon";import{InlineLabel}from"../InlineLabel/InlineLabel";const linkPropTypes={children:PropTypes.oneOfType([PropTypes.node,intlMessageShape]),className:PropTypes.string,disabled:PropTypes.bool,icon:PropTypes.string,inline:PropTypes.bool,iconPosition:PropTypes.oneOf(["left","right"]),onClick:PropTypes.func,to:intlToShape,href:intlMessageShape,target:PropTypes.string,rel:PropTypes.string,textClassName:PropTypes.string,activeClassName:PropTypes.string,exact:PropTypes.bool,history:historyPropTypes},LinkInternal=React.forwardRef(((props,ref)=>{const children=props.children,className=props.className,disabled=props.disabled,icon=props.icon,iconPosition=props.iconPosition,inline=props.inline,onClick=props.onClick,to=props.to,href=props.href,target=props.target,relProp=props.rel,textClassName=props.textClassName,exact=(props.dangerouslySetInnerHTML,props.exact),activeClassName=props.activeClassName,history=props.history,rest=_objectWithoutProperties(props,["children","className","disabled","icon","iconPosition","inline","onClick","to","href","target","rel","textClassName","dangerouslySetInnerHTML","exact","activeClassName","history"]),translator=useContext(TranslatorContext),classes=cx(styles.link,{[styles.disabled]:disabled,[styles.inline]:inline},className),textClasses=cx(styles.text,textClassName),isRight="right"===iconPosition,isLeft=!isRight,iconClasses=cx(styles.icon,{[styles.left]:isLeft,[styles.right]:isRight}),iconComponent=icon&&React.createElement(Icon,{icon:icon,className:iconClasses}),trackingProps={...props};isString(children)&&(trackingProps.label=children);const trackedOnClick=trackMethod(onClick,JUTRO_TOPICS.LINK_CLICKED,trackingProps),content=React.createElement("span",{className:textClasses},translator(children)),urlTranslatorAndSanitizer=useSafeTranslatedUrls(),linkProps=to?{tag:NavLink,to:disabled?"":urlTranslatorAndSanitizer(to),exact:exact,activeClassName:activeClassName}:{tag:"a",href:disabled?void 0:urlTranslatorAndSanitizer(href),target:target,rel:"_blank"===target?"noreferrer":relProp},labelProps={className:classes,onClick:disabled?void 0:trackedOnClick,onKeyPress:getKeyPressHandler(onClick),ref:ref,icon:iconComponent,iconPosition:iconPosition,tabIndex:"0","aria-disabled":disabled,...linkProps,...rest},LinkComponent=React.createElement(InlineLabel,labelProps,content);return history?React.createElement(Router,{history:history},LinkComponent):LinkComponent}));export const Link=memo(LinkInternal);LinkInternal.propTypes=linkPropTypes,LinkInternal.defaultProps={disabled:!1,iconPosition:"left",inline:!1},LinkInternal.displayName="Link",Link.displayName="Link",LinkInternal.__docgenInfo={description:"@type {React.ForwardRefExoticComponent<PropTypes.InferProps<typeof linkPropTypes>>}\n\n@metadataType action",methods:[],displayName:"Link",props:{disabled:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:"If `true`, this link is disabled"},iconPosition:{defaultValue:{value:"'left'",computed:!1},type:{name:"enum",value:[{value:"'left'",computed:!1},{value:"'right'",computed:!1}]},required:!1,description:"Where the icon is placed relative to the text"},inline:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:"Indicates whether link located inside of paragraph"},children:{type:{name:"union",value:[{name:"node"},{name:"custom",raw:"intlMessageShape"}]},required:!1,description:"The children elements to render inside of the Link"},className:{type:{name:"string"},required:!1,description:"CSS class name for this component"},icon:{type:{name:"string"},required:!1,description:"Optional icon name"},onClick:{type:{name:"func"},required:!1,description:"Callback when link is clicked"},to:{type:{name:"custom",raw:"intlToShape"},required:!1,description:"The destination path when link is clicked.\nUse this for paths internal to the application."},href:{type:{name:"custom",raw:"intlMessageShape"},required:!1,description:"The destination path when link is clicked.\nUse this for paths external to the application."},target:{type:{name:"string"},required:!1,description:"Where to display linked URL. Used only for external paths."},rel:{type:{name:"string"},required:!1,description:"Relationship of the linked URL. Used only for external paths."},textClassName:{type:{name:"string"},required:!1,description:"CSS class name for the link text"},activeClassName:{type:{name:"string"},required:!1,description:"CSS class name for element when it is active"},exact:{type:{name:"bool"},required:!1,description:"When true, the activeClassName will only be applied if location is matched exactly"},history:{type:{name:"custom",raw:"historyPropTypes"},required:!1,description:"Specific router history to use for navigation"}}},Link.__docgenInfo={componentName:"Link",packageName:"@jutro/components",description:"",displayName:"Link",methods:[],actualName:"Link",metadataType:"action",props:{children:{type:{name:"union",value:[{name:"node"},{name:"union",value:[{name:"string"},{name:"shape",value:{id:{name:"string",required:!1},defaultMessage:{name:"string",required:!1},args:{name:"shape",value:{},required:!1}}}]}]},required:!1,description:"The children elements to render inside of the Link"},className:{type:{name:"string"},required:!1,description:"CSS class name for this component"},disabled:{type:{name:"bool"},required:!1,description:"If `true`, this link is disabled",defaultValue:{value:"false",computed:!1}},icon:{type:{name:"string"},required:!1,description:"Optional icon name"},inline:{type:{name:"bool"},required:!1,description:"Indicates whether link located inside of paragraph",defaultValue:{value:"false",computed:!1}},iconPosition:{type:{name:"enum",value:[{value:"'left'",computed:!1},{value:"'right'",computed:!1}]},required:!1,description:"Where the icon is placed relative to the text",defaultValue:{value:"'left'",computed:!1}},onClick:{type:{name:"func"},required:!1,description:"Callback when link is clicked"},to:{type:{name:"custom",raw:"intlToShape"},required:!1,description:"The destination path when link is clicked.\nUse this for paths internal to the application."},href:{type:{name:"union",value:[{name:"string"},{name:"shape",value:{id:{name:"string",required:!1},defaultMessage:{name:"string",required:!1},args:{name:"shape",value:{},required:!1}}}]},required:!1,description:"The destination path when link is clicked.\nUse this for paths external to the application."},target:{type:{name:"string"},required:!1,description:"Where to display linked URL. Used only for external paths."},rel:{type:{name:"string"},required:!1,description:"Relationship of the linked URL. Used only for external paths."},textClassName:{type:{name:"string"},required:!1,description:"CSS class name for the link text"},activeClassName:{type:{name:"string"},required:!1,description:"CSS class name for element when it is active"},exact:{type:{name:"bool"},required:!1,description:"When true, the activeClassName will only be applied if location is matched exactly"},history:{type:{name:"custom",raw:"historyPropTypes"},required:!1,description:"Specific router history to use for navigation"}}};