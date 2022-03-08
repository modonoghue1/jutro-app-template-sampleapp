"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeReactNodeToMetadata = serializeReactNodeToMetadata;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _react = require("react");

var _uuid = require("uuid");

var _propTypes = require("@jutro/prop-types");

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _isBoolean = _interopRequireDefault(require("lodash/isBoolean"));

var _isNumber = _interopRequireDefault(require("lodash/isNumber"));

var _isNull = _interopRequireDefault(require("lodash/isNull"));

var _uimetadata = require("@jutro/uimetadata");

var _formatMetadataProps = require("./formatMetadataProps");

var _resolveComponent = require("./resolveComponent");

const LAYOUT_COMPONENTS = new Set(['Grid', 'Flex']);
const SELF_LAYOUT_COMPONENTS = new Set(['GridItem', 'FlexItem']);

function getDocgenDisplayName(componentType) {
  var _componentType$__docg;

  return (_componentType$__docg = componentType.__docgenInfo) === null || _componentType$__docg === void 0 ? void 0 : _componentType$__docg.displayName;
}

function getComponentDisplayName(component) {
  const displayName = (0, _propTypes.getDisplayName)(component);

  if (!displayName) {
    return 'Unknown';
  }

  return displayName !== 'Function' ? displayName : getDocgenDisplayName(component) || 'Unknown';
}

function getReactElementMeta(node) {
  const componentType = (0, _resolveComponent.unboxComponentType)(node.type);

  if (!(0, _isString.default)(componentType) && componentType._context) {
    return {
      componentType: 'div',
      componentName: 'div',
      props: node.props
    };
  }

  const displayName = (0, _isString.default)(componentType) ? componentType : getComponentDisplayName(componentType);
  const componentName = displayName.endsWith('Field') ? displayName.substr(0, displayName.length - 5) : displayName;
  return {
    componentName,
    componentType,
    props: node.props
  };
}

function resolveLayoutMetadata(componentName, componentProps) {
  let layoutName;

  if (SELF_LAYOUT_COMPONENTS.has(componentName)) {
    layoutName = 'selfLayout';
  } else if (LAYOUT_COMPONENTS.has(componentName)) {
    layoutName = 'contentLayout';
  } else {
    return {};
  }

  const layoutProps = {
    component: componentName
  };

  if (!(0, _isEmpty.default)(componentProps)) {
    layoutProps.componentProps = componentProps;
  }

  return {
    component: 'div',
    [layoutName]: layoutProps
  };
}

function serializeChildrenToMetadata(node, id) {
  const metadata = serializeReactNodeToMetadata(node, id);

  if ((0, _isNull.default)(metadata)) {
    return {};
  }

  if (Array.isArray(metadata)) {
    return {
      content: metadata
    };
  }

  if ((0, _isString.default)(metadata) || (0, _formatMetadataProps.isIntlMessageObject)(metadata)) {
    return {
      content: metadata
    };
  }

  if ('contentLayout' in metadata) {
    return metadata;
  }

  return {
    content: metadata
  };
}

function serializeReactNodeToMetadata(node, parentId) {
  var _componentType$__docg2;

  if ((0, _isNil.default)(node) || (0, _isBoolean.default)(node)) {
    return null;
  }

  if ((0, _isNumber.default)(node) || (0, _isString.default)(node)) {
    return (0, _formatMetadataProps.intlMessage)(node.toString(), parentId, 'content');
  }

  if (Array.isArray(node)) {
    return node.map(el => serializeReactNodeToMetadata(el, parentId)).filter(el => el !== null).flat();
  }

  if (!(0, _react.isValidElement)(node)) {
    return null;
  }

  const _getReactElementMeta = getReactElementMeta(node),
        componentName = _getReactElementMeta.componentName,
        componentType = _getReactElementMeta.componentType,
        props = _getReactElementMeta.props;

  const _props$id = props.id,
        id = _props$id === void 0 ? `generated-${(0, _uuid.v1)()}` : _props$id,
        children = props.children,
        otherProps = (0, _objectWithoutProperties2.default)(props, ["id", "children"]);
  const defaultProps = (0, _isString.default)(componentType) ? {} : componentType.defaultProps || {};
  const componentProps = (0, _formatMetadataProps.formatMetadataProps)(otherProps, defaultProps, (_componentType$__docg2 = componentType.__docgenInfo) === null || _componentType$__docg2 === void 0 ? void 0 : _componentType$__docg2.props, id);
  const layoutMetadata = resolveLayoutMetadata(componentName, componentProps);
  const isWrappedWithLayout = !!layoutMetadata.component;
  const type = (0, _uimetadata.getComponentMetadataType)((0, _resolveComponent.resolveComponent)(layoutMetadata.component || componentName), children && !(0, _isString.default)(children) ? [] : undefined) || 'element';
  const childrenMetadata = children ? serializeChildrenToMetadata(children, id) : {};

  if (node.type === _react.Fragment) {
    const content = childrenMetadata.content;
    return Array.isArray(content) ? content : null;
  }

  const metadata = {
    id,
    type,
    component: componentName,
    ...layoutMetadata,
    ...childrenMetadata
  };

  if (!isWrappedWithLayout && !(0, _isEmpty.default)(componentProps)) {
    metadata.componentProps = componentProps;
  }

  return metadata;
}
//# sourceMappingURL=serializeReactNodeToMetadata.js.map