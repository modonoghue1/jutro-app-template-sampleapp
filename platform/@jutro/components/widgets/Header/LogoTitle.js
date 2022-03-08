import React,{useContext}from"react";import PropTypes from"prop-types";import cx from"classnames";import isFunction from"lodash/isFunction";import{TranslatorContext}from"@jutro/locale";import{intlMessageShape}from"@jutro/prop-types";import styles from"./LogoTitle.module.css";export const translateTitle=(title,translator)=>isFunction(title)?title(translator):translator?translator(title):title;const logoTitlePropTypes={src:PropTypes.string,alt:PropTypes.string,title:PropTypes.oneOfType([PropTypes.string,intlMessageShape,PropTypes.func]),renderTitle:PropTypes.func,className:PropTypes.string,logoClassName:PropTypes.string,titleClassName:PropTypes.string};export const LogoTitle=({src:src,title:titleText,renderTitle:renderTitle,alt:alt,className:className,titleClassName:titleClassName,logoClassName:logoClassName})=>{const translator=useContext(TranslatorContext),classes=cx(styles.logoTitle,className),logoClasses=cx(styles.logo,logoClassName),titleClasses=cx(styles.title,titleClassName),title=titleText||renderTitle;return React.createElement("span",{className:classes},src&&React.createElement("img",{className:logoClasses,src:src,alt:alt}),title&&React.createElement("span",{className:titleClasses},translateTitle(title,translator)))};LogoTitle.propTypes=logoTitlePropTypes,LogoTitle.__docgenInfo={description:"LogoTitle\n@type {React.FC<PropTypes.InferProps<typeof logoTitlePropTypes>>}\n\n@metadataType element",methods:[],displayName:"LogoTitle",props:{src:{type:{name:"string"},required:!1,description:"Src for logo image."},alt:{type:{name:"string"},required:!1,description:"Alternative text for logo if image is not exists."},title:{type:{name:"union",value:[{name:"string"},{name:"custom",raw:"intlMessageShape"},{name:"func"}]},required:!1,description:"Title as string, intl message or func."},renderTitle:{type:{name:"func"},required:!1,description:"Title rendered by a callback"},className:{type:{name:"string"},required:!1,description:"Custom class names."},logoClassName:{type:{name:"string"},required:!1,description:"Custom class name for the logo"},titleClassName:{type:{name:"string"},required:!1,description:"Custom class name for the title"}}},LogoTitle.__docgenInfo={componentName:"LogoTitle",packageName:"@jutro/components",description:"LogoTitle",displayName:"LogoTitle",methods:[],actualName:"LogoTitle",metadataType:"element",props:{src:{type:{name:"string"},required:!1,description:"Src for logo image."},alt:{type:{name:"string"},required:!1,description:"Alternative text for logo if image is not exists."},title:{type:{name:"union",value:[{name:"string"},{name:"union",value:[{name:"string"},{name:"shape",value:{id:{name:"string",required:!1},defaultMessage:{name:"string",required:!1},args:{name:"shape",value:{},required:!1}}}]},{name:"func"}]},required:!1,description:"Title as string, intl message or func."},renderTitle:{type:{name:"func"},required:!1,description:"Title rendered by a callback"},className:{type:{name:"string"},required:!1,description:"Custom class names."},logoClassName:{type:{name:"string"},required:!1,description:"Custom class name for the logo"},titleClassName:{type:{name:"string"},required:!1,description:"Custom class name for the title"}}};