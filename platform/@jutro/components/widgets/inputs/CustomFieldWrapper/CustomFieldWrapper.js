import _classCallCheck from"@babel/runtime-corejs3/helpers/classCallCheck";import _createClass from"@babel/runtime-corejs3/helpers/createClass";import _assertThisInitialized from"@babel/runtime-corejs3/helpers/assertThisInitialized";import _get from"@babel/runtime-corejs3/helpers/get";import _inherits from"@babel/runtime-corejs3/helpers/inherits";import _possibleConstructorReturn from"@babel/runtime-corejs3/helpers/possibleConstructorReturn";import _getPrototypeOf from"@babel/runtime-corejs3/helpers/getPrototypeOf";import _defineProperty from"@babel/runtime-corejs3/helpers/defineProperty";function _createSuper(Derived){var hasNativeReflectConstruct=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var result,Super=_getPrototypeOf(Derived);if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return _possibleConstructorReturn(this,result)}}import PropTypes from"prop-types";import{FieldComponent}from"../FieldComponent/FieldComponent";export let CustomFieldWrapper=function(_FieldComponent){_inherits(CustomFieldWrapper,FieldComponent);var _super=_createSuper(CustomFieldWrapper);function CustomFieldWrapper(...args){var _this;return _classCallCheck(this,CustomFieldWrapper),_this=_super.call(this,...args),_defineProperty(_assertThisInitialized(_this),"notifyChangeBound",(value=>{_this.notifyChange(value)})),_this}return _createClass(CustomFieldWrapper,[{key:"renderControl",value:function(breakpointProps,options){const renderProp=breakpointProps.children;return renderProp&&renderProp(this.notifyChangeBound,options)}},{key:"render",value:function(){return _get(_getPrototypeOf(CustomFieldWrapper.prototype),"render",this).call(this)}}]),CustomFieldWrapper}();_defineProperty(CustomFieldWrapper,"propTypes",{...FieldComponent.propTypes,children:PropTypes.func}),_defineProperty(CustomFieldWrapper,"defaultProps",{...FieldComponent.defaultProps}),CustomFieldWrapper.__docgenInfo={description:"@typedef {typeof CustomFieldWrapper.propTypes} CustomFieldWrapperPropTypes\n@extends FieldComponent<PropTypes.InferProps<CustomFieldWrapperPropTypes>>\n\n@metadataType field",methods:[{name:"notifyChangeBound",docblock:"notifyChangeBound\n@param {object} value",modifiers:[],params:[{name:"value",description:null,type:{name:"object"},optional:!1}],returns:null,description:"notifyChangeBound"},{name:"renderControl",docblock:null,modifiers:[],params:[{name:"breakpointProps",type:null},{name:"options",type:null}],returns:null}],displayName:"CustomFieldWrapper",props:{children:{type:{name:"func"},required:!1,description:"Render prop"}},composes:["../FieldComponent/FieldComponent"]},CustomFieldWrapper.__docgenInfo={componentName:"CustomFieldWrapper",packageName:"@jutro/components",description:"",displayName:"CustomFieldWrapper",methods:[{name:"notifyChangeBound",docblock:"notifyChangeBound\n@param {object} value",modifiers:[],params:[{name:"value",description:null,type:{name:"object"},optional:!1}],returns:null,description:"notifyChangeBound"},{name:"renderControl",docblock:null,modifiers:[],params:[{name:"breakpointProps",optional:void 0,type:null},{name:"options",optional:void 0,type:null}],returns:null}],actualName:"CustomFieldWrapper",metadataType:"field",props:{children:{type:{name:"func"},required:!1,description:"Render prop"}},composes:["../FieldComponent/FieldComponent"]};