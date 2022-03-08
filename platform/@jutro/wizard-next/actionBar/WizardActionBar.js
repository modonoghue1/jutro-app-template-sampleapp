import _extends from"@babel/runtime-corejs3/helpers/extends";import _objectWithoutProperties from"@babel/runtime-corejs3/helpers/objectWithoutProperties";import React,{memo,useCallback}from"react";import PropTypes from"prop-types";import cx from"classnames";import{Grid,GridItem}from"@jutro/layout";import{WizardButton}from"../button/WizardButton";import styles from"./WizardActionBarNext.module.css";import{messages}from"./WizardActionBar.messages";function WizardActionBarInternal({actions:actions,className:className,layout:layout}){const layOutButtons=useCallback(((buttons,gridColumns)=>{if("default"===layout){const fillerLength=gridColumns-buttons.length;return buttons.map(((button,index)=>{const colStart=0===index&&buttons.length>1?index:fillerLength+index;return React.createElement(GridItem,{key:button.key,colStart:colStart+1},button)}))}return"spaceEvenly"===layout?buttons.length>1?buttons:buttons.map((button=>React.createElement(GridItem,{key:button.key,colStart:"2"},button))):buttons}),[layout]);return(()=>{const classes=cx(styles.wizardActionBar,className);let buttons=actions.filter((action=>action.to&&!1!==action.visible)).map((action=>{const defaultProps=getDefaultButtonProps(action.name),propsChildren=defaultProps.children,propsClassName=defaultProps.className,otherProps=_objectWithoutProperties(defaultProps,["children","className"]),label=action.label,actionChildren=(action.visible,action.children),actionClassName=action.className,otherActionProps=_objectWithoutProperties(action,["label","visible","children","className"]),classNames=cx(propsClassName,actionClassName),content=label||actionChildren||propsChildren;return React.createElement(WizardButton,_extends({key:action.name,className:classNames},otherProps,otherActionProps),content)}));if(0===buttons.length)return null;const gridColumns=(buttons=>{switch(layout){case"spaceEvenly":return 1===buttons.length?2:buttons.length;case"center":return 1;default:return 4}})(buttons);return buttons=layOutButtons(buttons,gridColumns),React.createElement("div",{className:classes},React.createElement("div",{className:styles.separator}),React.createElement(Grid,{columns:["1fr"],repeat:gridColumns.toString(),gap:"large",tablet:{gap:"medium"},phoneWide:{gap:"medium"},phone:{gap:"medium"}},buttons))})()}const defaultButtonProps={defaults:{className:styles.buttonItem,size:"medium",fullWidth:!0},cancel:{children:messages.cancel,message:messages.cancelling,type:"text",id:"cancelBtn"},previous:{children:messages.previous,message:messages.reverting,type:"text",id:"prevBtn"},next:{children:messages.next,message:messages.saving,type:"filled",id:"nextBtn"},finish:{children:messages.finish,message:messages.finishing,type:"filled",id:"finishBtn"}},getDefaultButtonProps=name=>({...defaultButtonProps.defaults,...defaultButtonProps[name]}),wizardActionBarPropTypes={actions:PropTypes.array.isRequired,className:PropTypes.string,layout:PropTypes.oneOf(["default","spaceEvenly","center"])};WizardActionBarInternal.propTypes=wizardActionBarPropTypes,WizardActionBarInternal.defaultProps={layout:"spaceEvenly"},WizardActionBarInternal.displayName="WizardActionBar";export const WizardActionBar=memo(WizardActionBarInternal);WizardActionBarInternal.__docgenInfo={description:"WizardActionBar is an Jutro component\nThe WizardActionBar generate and renders the <WizardButton> from actions passed via props.\nIt combines the action with default properties for each button; the default properties are overwrited\nwhen provided in actions.\n\n@example\nconst actions = [{\n name: 'cancel'\n to: '/'\n},{\n name: 'next',\n to: '/wizard/test/step2'\n}]\n\n<WizardActionBar actions={actions} className='gw-custom-wizard-action-bar' />\n\n@type {React.FC<PropTypes.InferProps<typeof wizardActionBarPropTypes>>}",methods:[],displayName:"WizardActionBar",props:{layout:{defaultValue:{value:"'spaceEvenly'",computed:!1},type:{name:"enum",value:[{value:"'default'",computed:!1},{value:"'spaceEvenly'",computed:!1},{value:"'center'",computed:!1}]},required:!1,description:"type of layout applied to action bar items: `default` - keeps items with visual separation,\n`spaceEvenly` - distributes items evenly in available grid space,\n`center` - center button horizontally, will vertically stack multiple buttons"},actions:{type:{name:"array"},required:!0,description:"The list of actions to be rendered in the <WizardActionBar>"},className:{type:{name:"string"},required:!1,description:"CSS class name for this component"}}},WizardActionBarInternal.__docgenInfo={componentName:"WizardActionBar",packageName:"@jutro/wizard-next",description:"WizardActionBar is an Jutro component\nThe WizardActionBar generate and renders the <WizardButton> from actions passed via props.\nIt combines the action with default properties for each button; the default properties are overwrited\nwhen provided in actions.",displayName:"WizardActionBar",methods:[],actualName:"WizardActionBarInternal",props:{actions:{type:{name:"array"},required:!0,description:"The list of actions to be rendered in the <WizardActionBar>"},className:{type:{name:"string"},required:!1,description:"CSS class name for this component"},layout:{type:{name:"enum",value:[{value:"'default'",computed:!1},{value:"'spaceEvenly'",computed:!1},{value:"'center'",computed:!1}]},required:!1,description:"type of layout applied to action bar items: `default` - keeps items with visual separation,\n`spaceEvenly` - distributes items evenly in available grid space,\n`center` - center button horizontally, will vertically stack multiple buttons",defaultValue:{value:"'spaceEvenly'",computed:!1}}}};