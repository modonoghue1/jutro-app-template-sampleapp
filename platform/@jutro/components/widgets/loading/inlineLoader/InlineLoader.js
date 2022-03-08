import _slicedToArray from"@babel/runtime-corejs3/helpers/slicedToArray";import React,{useContext,useEffect,useState}from"react";import PropTypes from"prop-types";import isArray from"lodash/isArray";import cx from"classnames";import{isPromise,uniqueInnerId}from"@jutro/platform";import{TranslatorContext}from"@jutro/locale";import{intlMessageShape}from"@jutro/prop-types";import{LoadingIcon}from"../loadingIcon/LoadingIcon";import{Icon}from"../../Icon/Icon";import styles from"./InlineLoader.module.css";import{messages}from"./InlineLoader.messages";export const inlineLoaderPropTypes={className:PropTypes.string,loading:PropTypes.oneOfType([PropTypes.bool,PropTypes.arrayOf(PropTypes.instanceOf(Promise)),PropTypes.instanceOf(Promise)]),loadingIcon:PropTypes.string,loadingMessage:intlMessageShape,successIcon:PropTypes.string,successMessage:intlMessageShape};export const InlineLoader=({className:className,loading:loading,loadingIcon:loadingIcon,loadingMessage:loadingMessage,successIcon:successIcon,successMessage:successMessage})=>{const translator=useContext(TranslatorContext),_useState=useState(!!loading),_useState2=_slicedToArray(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1];useEffect((()=>{if(isPromise(loading)||isArray(loading)){const loaderPromise=isArray(loading)?Promise.all(loading):loading;return setIsLoading(!0),void loaderPromise.then((()=>setIsLoading(!1)))}setIsLoading(loading)}),[loading]);const loaderStyle=cx(className,styles.inlineLoader),iconLabelId=uniqueInnerId("InlineLoader","iconLabelId").iconLabelId;return React.createElement("div",{className:loaderStyle,role:"alert"},isLoading?(()=>{const loaderMessageStyle=cx({[styles.withLoadingMessage]:loadingMessage},styles.loaderIcon);return React.createElement(React.Fragment,null,React.createElement(LoadingIcon,{className:loaderMessageStyle,icon:loadingIcon,"aria-labelledby":iconLabelId}),React.createElement("div",{id:iconLabelId,className:styles.screenReaderOnly},translator(messages.loading)),loadingMessage&&React.createElement("div",{className:styles.withMessage},translator(loadingMessage)))})():successMessage&&React.createElement(React.Fragment,null,React.createElement(Icon,{className:cx(styles.withSuccessMessage,styles.loaderIcon),icon:successIcon}),React.createElement("div",{className:styles.withMessage},translator(successMessage))))};InlineLoader.propTypes=inlineLoaderPropTypes,InlineLoader.defaultProps={successIcon:"check"},InlineLoader.__docgenInfo={description:"InlineLoader\n@type {React.FC<PropTypes.InferProps<typeof inlineLoaderPropTypes>>}\n\n@metadataType element",methods:[],displayName:"InlineLoader",props:{successIcon:{defaultValue:{value:"'check'",computed:!1},type:{name:"string"},required:!1,description:"icon name to be shown when execution trigger/promise is successfully resolved"},className:{type:{name:"string"},required:!1,description:"CSS class name for this component"},loading:{type:{name:"union",value:[{name:"bool"},{name:"arrayOf",value:{name:"instanceOf",value:"Promise"}},{name:"instanceOf",value:"Promise"}]},required:!1,description:"Controls whether the Inline Loader is shown;\nFor boolean values, if `true` is passed then the Inline Loader is shown;\nFor Promise value(s), the Inline Loader will be shown until the promise has completed."},loadingIcon:{type:{name:"string"},required:!1,description:"icon name to be used when executing trigger/promise"},loadingMessage:{type:{name:"custom",raw:"intlMessageShape"},required:!1,description:"The message shown when executing trigger/promise"},successMessage:{type:{name:"custom",raw:"intlMessageShape"},required:!1,description:"The message shown when execution trigger/promise is succesfully done"}}},InlineLoader.__docgenInfo={componentName:"InlineLoader",packageName:"@jutro/components",description:"InlineLoader",displayName:"InlineLoader",methods:[],actualName:"InlineLoader",metadataType:"element",props:{className:{type:{name:"string"},required:!1,description:"CSS class name for this component"},loading:{type:{name:"union",value:[{name:"bool"},{name:"arrayOf",value:{name:"instanceOf",value:"Promise"}},{name:"instanceOf",value:"Promise"}]},required:!1,description:"Controls whether the Inline Loader is shown;\nFor boolean values, if `true` is passed then the Inline Loader is shown;\nFor Promise value(s), the Inline Loader will be shown until the promise has completed."},loadingIcon:{type:{name:"string"},required:!1,description:"icon name to be used when executing trigger/promise"},loadingMessage:{type:{name:"union",value:[{name:"string"},{name:"shape",value:{id:{name:"string",required:!1},defaultMessage:{name:"string",required:!1},args:{name:"shape",value:{},required:!1}}}]},required:!1,description:"The message shown when executing trigger/promise"},successIcon:{type:{name:"string"},required:!1,description:"icon name to be shown when execution trigger/promise is successfully resolved",defaultValue:{value:"'check'",computed:!1}},successMessage:{type:{name:"union",value:[{name:"string"},{name:"shape",value:{id:{name:"string",required:!1},defaultMessage:{name:"string",required:!1},args:{name:"shape",value:{},required:!1}}}]},required:!1,description:"The message shown when execution trigger/promise is succesfully done"}}};