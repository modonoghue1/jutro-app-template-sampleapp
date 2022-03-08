import _extends from"@babel/runtime-corejs3/helpers/extends";import _classCallCheck from"@babel/runtime-corejs3/helpers/classCallCheck";import _createClass from"@babel/runtime-corejs3/helpers/createClass";import _assertThisInitialized from"@babel/runtime-corejs3/helpers/assertThisInitialized";import _get from"@babel/runtime-corejs3/helpers/get";import _inherits from"@babel/runtime-corejs3/helpers/inherits";import _possibleConstructorReturn from"@babel/runtime-corejs3/helpers/possibleConstructorReturn";import _getPrototypeOf from"@babel/runtime-corejs3/helpers/getPrototypeOf";import _defineProperty from"@babel/runtime-corejs3/helpers/defineProperty";function _createSuper(Derived){var hasNativeReflectConstruct=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var result,Super=_getPrototypeOf(Derived);if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return _possibleConstructorReturn(this,result)}}import React from"react";import PropTypes from"prop-types";import InputMask from"react-input-mask";import cx from"classnames";import{mappingDelta,mergeStyles}from"@jutro/platform";import{intlMessageShape}from"@jutro/prop-types";import get from"lodash/get";import isUndefined from"lodash/isUndefined";import{FieldComponent}from"../FieldComponent/FieldComponent";import styles from"./InputMaskField.module.css";import inputStyles from"../InputField/InputField.module.css";import{FieldIcon}from"../FieldComponent/FieldIcon";import{applyInsertMode}from"./inputMaskUtils";import{InputMaskFieldValidationImplementation}from"./InputMaskFieldValidationImplementation";import{OldInputMaskFieldValidationImplementation}from"./OldInputMaskFieldValidationImplementation";export let InputMaskField=function(_FieldComponent){_inherits(InputMaskField,FieldComponent);var _super=_createSuper(InputMaskField);function InputMaskField(props){var _this;_classCallCheck(this,InputMaskField),_this=_super.call(this,props),_defineProperty(_assertThisInitialized(_this),"state",{}),_defineProperty(_assertThisInitialized(_this),"customHandleChange",(event=>{event.target.value!==_this.getValue()&&(_this.pristine&&event.target.value===_this.state.parsedMask||(event.target.value===_this.state.parsedMask&&(event.target.value=null),_this.handleChange(event)))})),_defineProperty(_assertThisInitialized(_this),"beforeMaskedValueChange",((newState,oldState,userInput,maskOptions)=>userInput===_this.props.maskChar?oldState:applyInsertMode(newState,oldState,userInput,maskOptions,_this.customHandleChange))),_defineProperty(_assertThisInitialized(_this),"preventUnnecessaryCursorMovement",((newState,oldState,userInput)=>userInput===_this.props.maskChar?oldState:newState));const ValidationImplementation=props.registerValidation?new InputMaskFieldValidationImplementation:new OldInputMaskFieldValidationImplementation;return _this.validationImplementation=ValidationImplementation.bind(_assertThisInitialized(_this)),_this}return _createClass(InputMaskField,[{key:"render",value:function(){return _get(_getPrototypeOf(InputMaskField.prototype),"render",this).call(this)}},{key:"componentDidUpdate",value:function(...args){return this.validationImplementation.componentDidUpdate(...args)}},{key:"applyMaskOnValue",value:function(value){if(!value)return value;const _this$state=this.state,maskChar=_this$state.maskChar,parsedMask=_this$state.parsedMask,patternMap=_this$state.patternMap,valueArray=value.split("");return parsedMask.split("").map(((char,i)=>char===maskChar||!patternMap[i]&&char===valueArray[0]?valueArray.shift():char)).join("")}},{key:"isComplete",value:function(value){const mask=this.props.mask,_this$state2=this.state,parsedMask=_this$state2.parsedMask,patternMap=_this$state2.patternMap;return!mask||!(!value||value.length<parsedMask.length)&&value.split("").every(((char,index)=>{const pattern=patternMap[index];return!pattern||char.match(pattern)}))}},{key:"getValidationConfig",value:function(rulesConfig){const validationConfig=_get(_getPrototypeOf(InputMaskField.prototype),"getValidationConfig",this).call(this,rulesConfig);return{...validationConfig,propsList:["required","mask","countryCode",...get(validationConfig,"propsList",[])]}}},{key:"getValidationMessages",value:function(value=this.props.value){return this.validationImplementation.getValidationMessages(value)}},{key:"renderControlReadOnly",value:function(breakpointProps){const id=breakpointProps.id,value=breakpointProps.value,classes=cx(styles.inputMask,styles.inputMaskReadOnly),formattedValue=this.applyMaskOnValue(value),readonlyValue=this.isComplete(formattedValue)?formattedValue:FieldComponent.defaultROEmptyValue;return React.createElement("div",{id:id,"data-read-only":!0,className:classes},readonlyValue)}},{key:"isEmpty",value:function(){const value=this.props.value;return _get(_getPrototypeOf(InputMaskField.prototype),"isEmpty",this).call(this,value)||this.state.parsedMask===value}},{key:"generateAccessibilityProperties",value:function(){const placeholder=this.state.placeholder,realPlaceholder=this.props.alwaysShowMask?placeholder:this.translator(placeholder);return{..._get(_getPrototypeOf(InputMaskField.prototype),"generateAccessibilityProperties",this).call(this),"aria-placeholder":placeholder,placeholder:realPlaceholder}}},{key:"renderControl",value:function(breakpointProps,{isValid:isValid}){const combinedStyles=mergeStyles(inputStyles,styles),value=breakpointProps.value,disabled=breakpointProps.disabled,controlClassName=breakpointProps.controlClassName,required=breakpointProps.required,mask=breakpointProps.mask,inputType=breakpointProps.inputType,testId=breakpointProps.testId,id=breakpointProps.id,registerValidation=breakpointProps.registerValidation,fieldUniqueId=this.fieldUniqueId,focusHandlers=this.getInputFocusHandlers(),validationMessages=this.getValidationMessages(value),messageStyle=this.getValidationMessageStyle(validationMessages),classes=cx(combinedStyles.input,combinedStyles.inputMask,{[combinedStyles.empty]:this.isEmpty(),[messageStyle]:!isValid},controlClassName,!isUndefined(registerValidation)&&!isValid&&styles.labpreviewBorder),icon=breakpointProps.icon,iconPosition=breakpointProps.iconPosition;return React.createElement(FieldIcon,{icon:icon,iconPosition:iconPosition,disabled:disabled},React.createElement(InputMask,_extends({id:fieldUniqueId,mask:mask,maskChar:this.state.maskChar,type:inputType,className:classes,value:value,onChange:this.customHandleChange},focusHandlers,{disabled:disabled,required:required,formatChars:breakpointProps.formatChars,autoComplete:"off",beforeMaskedValueChange:breakpointProps.insertMode?this.beforeMaskedValueChange:this.preventUnnecessaryCursorMovement},this.generateDataPathProperty(),this.generateAccessibilityProperties(),{"data-testid":testId||id})))}}],[{key:"getDerivedStateFromProps",value:function(nextProps,prevState){const maskChar=nextProps.maskChar?nextProps.maskChar.charAt(0):"",_InputMaskField$parse=InputMaskField.parseMask(nextProps.mask,maskChar,nextProps.formatChars),parsedMask=_InputMaskField$parse.parsedMask,patternMap=_InputMaskField$parse.patternMap,placeholder=nextProps.alwaysShowMask?parsedMask:nextProps.placeholder;return mappingDelta({parsedMask:parsedMask,maskChar:maskChar,placeholder:placeholder,patternMap:patternMap},prevState)}},{key:"parseMask",value:function(mask,maskChar,formatChars){let escape=!1,parsedMask="";const patternMap=[];for(const char of mask)"\\"===char?(escape=!escape,escape||(parsedMask+=char,patternMap.push(null))):(parsedMask+=formatChars[char]&&!escape?maskChar:char,patternMap.push(escape?null:formatChars[char]),escape=!1);return{parsedMask:parsedMask,patternMap:patternMap}}}]),InputMaskField}();_defineProperty(InputMaskField,"propTypes",{...FieldComponent.propTypes,mask:PropTypes.string.isRequired,maskChar:PropTypes.string,alwaysShowMask:PropTypes.bool,formatChars:PropTypes.object,onGetValidationMessages:PropTypes.func,insertMode:PropTypes.bool,messageProps:PropTypes.shape({incompleteInput:intlMessageShape}),value:PropTypes.string}),_defineProperty(InputMaskField,"defaultProps",{...FieldComponent.defaultProps,maskChar:"_",formatChars:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"}}),_defineProperty(InputMaskField,"contextType",FieldComponent.contextType),InputMaskField.__docgenInfo={description:"Renders an input field with a mask that you can control through props.\n@typedef {typeof InputMaskField.propTypes} InputMaskFieldPropTypes\n@extends FieldComponent<PropTypes.InferProps<InputMaskFieldPropTypes>>\n\n@metadataType field",methods:[{name:"parseMask",docblock:"Obtain a parsed input mask as displayed on the input when value is empty and\na map of all the placeholder chars with validation patterns.\n\n@param {string} mask the mask string\n@param {string} maskChar the mask char\n@param {object} formatChars formatting characters and patterns\n@returns {object} parsed masked string and the pattern map",modifiers:["static"],params:[{name:"mask",description:"the mask string",type:{name:"string"},optional:!1},{name:"maskChar",description:"the mask char",type:{name:"string"},optional:!1},{name:"formatChars",description:"formatting characters and patterns",type:{name:"object"},optional:!1}],returns:{description:"parsed masked string and the pattern map",type:{name:"object"}},description:"Obtain a parsed input mask as displayed on the input when value is empty and\na map of all the placeholder chars with validation patterns."},{name:"applyMaskOnValue",docblock:null,modifiers:[],params:[{name:"value",type:null}],returns:null},{name:"isComplete",docblock:"Tests if input is complete (all mask chars are substituted with values)\nIf the maskChar itself is a valid value, positions with the maskChar are treated\nas populated.\n\n@param {string} value the value to be tested\n@returns {boolean}",modifiers:[],params:[{name:"value",description:"the value to be tested",type:{name:"string"},optional:!1}],returns:{description:null,type:{name:"boolean"}},description:"Tests if input is complete (all mask chars are substituted with values)\nIf the maskChar itself is a valid value, positions with the maskChar are treated\nas populated."},{name:"customHandleChange",docblock:"Saves initial value from input mask\n\n@param {event} event - onChange event",modifiers:[],params:[{name:"event",description:"onChange event",type:{name:"event"},optional:!1}],returns:null,description:"Saves initial value from input mask"},{name:"getValidationConfig",docblock:null,modifiers:[],params:[{name:"rulesConfig",type:null}],returns:null},{name:"getValidationMessages",docblock:null,modifiers:[],params:[{name:"value",type:null}],returns:null},{name:"renderControlReadOnly",docblock:"Should display default readOnly char?\n@override\n\n@param {object} breakpointProps - breakpoint-specific props\n@returns {React.ReactElement} JSX for the control",modifiers:[],params:[{name:"breakpointProps",description:"breakpoint-specific props",type:{name:"object"},optional:!1}],returns:{description:"JSX for the control",type:{name:"React.ReactElement"}},description:"Should display default readOnly char?"},{name:"isEmpty",docblock:"Tests if component is empty\n@override\n\n@returns {boolean}",modifiers:[],params:[],returns:{description:null,type:{name:"boolean"}},description:"Tests if component is empty"},{name:"generateAccessibilityProperties",docblock:"generates accessibility properties for the field component\n@returns {object} set of applicable wai-aria tags",modifiers:[],params:[],returns:{description:"set of applicable wai-aria tags",type:{name:"object"}},description:"generates accessibility properties for the field component"},{name:"beforeMaskedValueChange",docblock:"Custom beforeMaskedValueChange (see react-input-mask documentation for details) allowing for notifying value after initialization.\nThis newState parameter contains the formatted value even if the value in props was not formatted.\n\n@param {object} newState - New input state\n@param {object} oldState - Input state before change\n@param {string} userInput - Raw entered or pasted string\n@param {object} maskOptions - Mask options\n\n@returns {object} formatted value along with selection",modifiers:[],params:[{name:"newState",description:"New input state",type:{name:"object"},optional:!1},{name:"oldState",description:"Input state before change",type:{name:"object"},optional:!1},{name:"userInput",description:"Raw entered or pasted string",type:{name:"string"},optional:!1},{name:"maskOptions",description:"Mask options",type:{name:"object"},optional:!1}],returns:{description:"formatted value along with selection",type:{name:"object"}},description:"Custom beforeMaskedValueChange (see react-input-mask documentation for details) allowing for notifying value after initialization.\nThis newState parameter contains the formatted value even if the value in props was not formatted."},{name:"preventUnnecessaryCursorMovement",docblock:"Prevents moving cursor when userInput equals the maskChar\n\n@param {object} newState - New input state\n@param {object} oldState - Input state before change\n@param {string} userInput - Raw entered or pasted string\n\n@returns {object} old or new state depending on the userInput",modifiers:[],params:[{name:"newState",description:"New input state",type:{name:"object"},optional:!1},{name:"oldState",description:"Input state before change",type:{name:"object"},optional:!1},{name:"userInput",description:"Raw entered or pasted string",type:{name:"string"},optional:!1}],returns:{description:"old or new state depending on the userInput",type:{name:"object"}},description:"Prevents moving cursor when userInput equals the maskChar"},{name:"renderControl",docblock:"Render control for this component.\n\n@param {object} breakpointProps - breakpoint-specific props\n\n@returns {React.ReactElement} JSX for the control",modifiers:[],params:[{name:"breakpointProps",description:"breakpoint-specific props",type:{name:"object"},optional:!1},{name:"{ isValid }"}],returns:{description:"JSX for the control",type:{name:"React.ReactElement"}},description:"Render control for this component."}],displayName:"InputMaskField",props:{maskChar:{defaultValue:{value:"'_'",computed:!1},type:{name:"string"},required:!1,description:"The character used in the mask, for example `x` combined with `mask=99-99` displays `xx-xx`. If empty\nthe mask restrictions are still being enforced, but the mask is not visible.\nNOTE: Mask char should not be the same as one of possible input characters because this can generate unintended incorrect values."},formatChars:{defaultValue:{value:"{\n    9: '[0-9]',\n    a: '[A-Za-z]',\n    '*': '[A-Za-z0-9]',\n}",computed:!1},type:{name:"object"},required:!1,description:"A map of special mask formatting characters and the corresponding regular expressions the input must satisfy"},mask:{type:{name:"string"},required:!0,description:"The string that formats the mask to display, for example 999-999-9999. By default '9' indicates a number,\n'a' a letter and '*' a number or a letter. You can escape the special characters with a backslash."},alwaysShowMask:{type:{name:"bool"},required:!1,description:"If true, the mask is always visible, if false the field will display the placeholder if not focused and empty."},onGetValidationMessages:{type:{name:"func"},required:!1,description:"A callback invoked from getValidationMessges, should return an array of error messages.\nNOTE: This prop is likely to be removed in the future and replaced by a more generic solution."},insertMode:{type:{name:"bool"},required:!1,description:"If set to true, the mask input will work in insert mode instead of overwrite mode.\nIf maskChar is empty, the input always works in insert mode"},messageProps:{type:{name:"shape",value:{incompleteInput:{name:"custom",raw:"intlMessageShape",description:"Validation message for incomplete input field",required:!1}}},required:!1,description:"Message props(error message/aria-label)"},value:{type:{name:"string"},required:!1,description:"Value to display in control"}},composes:["../FieldComponent/FieldComponent"]},InputMaskField.__docgenInfo={componentName:"InputMaskField",packageName:"@jutro/components",description:"Renders an input field with a mask that you can control through props.",displayName:"InputMaskField",methods:[{name:"parseMask",docblock:"Obtain a parsed input mask as displayed on the input when value is empty and\na map of all the placeholder chars with validation patterns.\n\n@param {string} mask the mask string\n@param {string} maskChar the mask char\n@param {object} formatChars formatting characters and patterns\n@returns {object} parsed masked string and the pattern map",modifiers:["static"],params:[{name:"mask",description:"the mask string",type:{name:"string"},optional:!1},{name:"maskChar",description:"the mask char",type:{name:"string"},optional:!1},{name:"formatChars",description:"formatting characters and patterns",type:{name:"object"},optional:!1}],returns:{description:"parsed masked string and the pattern map",type:{name:"object"}},description:"Obtain a parsed input mask as displayed on the input when value is empty and\na map of all the placeholder chars with validation patterns."},{name:"applyMaskOnValue",docblock:null,modifiers:[],params:[{name:"value",optional:void 0,type:null}],returns:null},{name:"isComplete",docblock:"Tests if input is complete (all mask chars are substituted with values)\nIf the maskChar itself is a valid value, positions with the maskChar are treated\nas populated.\n\n@param {string} value the value to be tested\n@returns {boolean}",modifiers:[],params:[{name:"value",description:"the value to be tested",type:{name:"string"},optional:!1}],returns:{description:null,type:{name:"boolean"}},description:"Tests if input is complete (all mask chars are substituted with values)\nIf the maskChar itself is a valid value, positions with the maskChar are treated\nas populated."},{name:"customHandleChange",docblock:"Saves initial value from input mask\n\n@param {event} event - onChange event",modifiers:[],params:[{name:"event",description:"onChange event",type:{name:"event"},optional:!1}],returns:null,description:"Saves initial value from input mask"},{name:"getValidationConfig",docblock:null,modifiers:[],params:[{name:"rulesConfig",optional:void 0,type:null}],returns:null},{name:"getValidationMessages",docblock:null,modifiers:[],params:[{name:"value",optional:void 0,type:null}],returns:null},{name:"renderControlReadOnly",docblock:"Should display default readOnly char?\n@override\n\n@param {object} breakpointProps - breakpoint-specific props\n@returns {React.ReactElement} JSX for the control",modifiers:[],params:[{name:"breakpointProps",description:"breakpoint-specific props",type:{name:"object"},optional:!1}],returns:{description:"JSX for the control",type:{name:"React.ReactElement"}},description:"Should display default readOnly char?"},{name:"isEmpty",docblock:"Tests if component is empty\n@override\n\n@returns {boolean}",modifiers:[],params:[],returns:{description:null,type:{name:"boolean"}},description:"Tests if component is empty"},{name:"generateAccessibilityProperties",docblock:"generates accessibility properties for the field component\n@returns {object} set of applicable wai-aria tags",modifiers:[],params:[],returns:{description:"set of applicable wai-aria tags",type:{name:"object"}},description:"generates accessibility properties for the field component"},{name:"beforeMaskedValueChange",docblock:"Custom beforeMaskedValueChange (see react-input-mask documentation for details) allowing for notifying value after initialization.\nThis newState parameter contains the formatted value even if the value in props was not formatted.\n\n@param {object} newState - New input state\n@param {object} oldState - Input state before change\n@param {string} userInput - Raw entered or pasted string\n@param {object} maskOptions - Mask options\n\n@returns {object} formatted value along with selection",modifiers:[],params:[{name:"newState",description:"New input state",type:{name:"object"},optional:!1},{name:"oldState",description:"Input state before change",type:{name:"object"},optional:!1},{name:"userInput",description:"Raw entered or pasted string",type:{name:"string"},optional:!1},{name:"maskOptions",description:"Mask options",type:{name:"object"},optional:!1}],returns:{description:"formatted value along with selection",type:{name:"object"}},description:"Custom beforeMaskedValueChange (see react-input-mask documentation for details) allowing for notifying value after initialization.\nThis newState parameter contains the formatted value even if the value in props was not formatted."},{name:"preventUnnecessaryCursorMovement",docblock:"Prevents moving cursor when userInput equals the maskChar\n\n@param {object} newState - New input state\n@param {object} oldState - Input state before change\n@param {string} userInput - Raw entered or pasted string\n\n@returns {object} old or new state depending on the userInput",modifiers:[],params:[{name:"newState",description:"New input state",type:{name:"object"},optional:!1},{name:"oldState",description:"Input state before change",type:{name:"object"},optional:!1},{name:"userInput",description:"Raw entered or pasted string",type:{name:"string"},optional:!1}],returns:{description:"old or new state depending on the userInput",type:{name:"object"}},description:"Prevents moving cursor when userInput equals the maskChar"},{name:"renderControl",docblock:"Render control for this component.\n\n@param {object} breakpointProps - breakpoint-specific props\n\n@returns {React.ReactElement} JSX for the control",modifiers:[],params:[{name:"breakpointProps",description:"breakpoint-specific props",type:{name:"object"},optional:!1},{name:"{ isValid }"}],returns:{description:"JSX for the control",type:{name:"React.ReactElement"}},description:"Render control for this component."}],actualName:"InputMaskField",metadataType:"field",props:{mask:{type:{name:"string"},required:!0,description:"The string that formats the mask to display, for example 999-999-9999. By default '9' indicates a number,\n'a' a letter and '*' a number or a letter. You can escape the special characters with a backslash."},maskChar:{type:{name:"string"},required:!1,description:"The character used in the mask, for example `x` combined with `mask=99-99` displays `xx-xx`. If empty\nthe mask restrictions are still being enforced, but the mask is not visible.\nNOTE: Mask char should not be the same as one of possible input characters because this can generate unintended incorrect values.",defaultValue:{value:"'_'",computed:!1}},alwaysShowMask:{type:{name:"bool"},required:!1,description:"If true, the mask is always visible, if false the field will display the placeholder if not focused and empty."},formatChars:{type:{name:"object"},required:!1,description:"A map of special mask formatting characters and the corresponding regular expressions the input must satisfy",defaultValue:{value:"{\n    9: '[0-9]',\n    a: '[A-Za-z]',\n    '*': '[A-Za-z0-9]',\n}",computed:!1}},onGetValidationMessages:{type:{name:"func"},required:!1,description:"A callback invoked from getValidationMessges, should return an array of error messages.\nNOTE: This prop is likely to be removed in the future and replaced by a more generic solution."},insertMode:{type:{name:"bool"},required:!1,description:"If set to true, the mask input will work in insert mode instead of overwrite mode.\nIf maskChar is empty, the input always works in insert mode"},messageProps:{type:{name:"shape",value:{incompleteInput:{name:"union",description:"Validation message for incomplete input field",required:!1,value:[{name:"string"},{name:"shape",value:{id:{name:"string",required:!1},defaultMessage:{name:"string",required:!1},args:{name:"shape",value:{},required:!1}}}]}}},required:!1,description:"Message props(error message/aria-label)"},value:{type:{name:"string"},required:!1,description:"Value to display in control"}},composes:["../FieldComponent/FieldComponent"]};