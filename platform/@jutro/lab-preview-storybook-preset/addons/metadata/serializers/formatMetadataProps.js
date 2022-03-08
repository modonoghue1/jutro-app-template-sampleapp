"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intlMessage = intlMessage;
exports.isIntlMessageObject = isIntlMessageObject;
exports.formatMetadataProps = formatMetadataProps;
exports.TRANSLATION_ID_PREFIX = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _omitBy = _interopRequireDefault(require("lodash/omitBy"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _isString = _interopRequireDefault(require("lodash/isString"));

const EXCLUDED_PROPS = new Set(['theme', 'intl', 'children', 'id', 'component', 'value', 'onGoogleMapsApiKey']);
const INTL_MESSAGE_SHAPE_PROP_TYPE = 'intlMessageShape';
const AVAILABLE_VALUE_OBJECT_SHAPE_PROP_TYPE = 'availableValueObjectShape';
const HASHED_CLASSNAME_REGEX = /\w+-module__(\w+)__[a-z0-9]+/i;
const INTL_PROPS = ['label', 'placeholder', 'header', 'title'];
const TRANSLATION_ID_PREFIX = 'translation';
exports.TRANSLATION_ID_PREFIX = TRANSLATION_ID_PREFIX;

function deepMapValues(input, fn) {
  if (!(0, _isPlainObject.default)(input)) {
    return input;
  }

  return (0, _mapValues.default)(input, (value, key) => (0, _isPlainObject.default)(value) ? deepMapValues(value, fn) : fn(key, value));
}

function deepCleanupObject(input) {
  return Object.entries(input).reduce((acc, [key, value]) => {
    if ((0, _isUndefined.default)(value)) {
      return acc;
    }

    if ((0, _isPlainObject.default)(value)) {
      const filteredChild = deepCleanupObject(value);

      if ((0, _isEmpty.default)(filteredChild)) {
        return acc;
      }

      return { ...acc,
        [key]: filteredChild
      };
    }

    return { ...acc,
      [key]: value
    };
  }, {});
}

function formatIntlProp(propName, propValue, id) {
  if ((0, _isObject.default)(propValue)) {
    return propValue;
  }

  return intlMessage(propValue, id, propName);
}

function formatFunctionProp(prop) {
  let callbackProp = prop;

  if (prop.startsWith('on')) {
    callbackProp = prop.replace('on', '').replace(/^\w/, c => c.toLowerCase());
  }

  return `${callbackProp}Fn`;
}

function formatCustomShapeProp(customShape) {
  return (prop, val) => {
    const type = customShape[prop].raw;
    return type === INTL_MESSAGE_SHAPE_PROP_TYPE ? formatIntlProp(prop, val) : val;
  };
}

function formatAvailableValueProp(propValue) {
  return propValue.map(value => {
    let result = {};

    if ('id' in value) {
      result = {
        id: value.id,
        displayName: value.displayName && formatIntlProp(`${value.id || 'id'}`, value.displayName),
        subtitle: value.subtitle && formatIntlProp(`${value.id || 'id'}`, value.subtitle),
        secondaryLabel: value.secondaryLabel && formatIntlProp(`${value.id || 'id'}`, value.secondaryLabel)
      };
    } else if ('code' in value) {
      result = {
        code: value.code,
        name: value.name && formatIntlProp(`${value.code || 'code'}`, value.name),
        subtitle: value.subtitle && formatIntlProp(`${value.code || 'code'}`, value.subtitle),
        secondaryLabel: value.secondaryLabel && formatIntlProp(`${value.code || 'code'}`, value.secondaryLabel)
      };
    } else {
      result = value;
    }

    return (0, _omitBy.default)(result, _isUndefined.default);
  });
}

function intlMessage(value, id, propName) {
  return {
    id: `${TRANSLATION_ID_PREFIX}${id ? `.${id}` : ''}${propName ? `.${propName}` : ''}`,
    defaultMessage: value
  };
}

function isIntlMessageObject(value) {
  return (value === null || value === void 0 ? void 0 : value.id) && (value === null || value === void 0 ? void 0 : value.defaultMessage);
}

function filterDefaultValues(props, defaultProps) {
  return (0, _omitBy.default)(props, (propValue, propName) => !(0, _isUndefined.default)(defaultProps[propName]) && (0, _isEqual.default)(defaultProps[propName], propValue));
}

function filterExcludedProps(props) {
  return Object.entries(props).reduce((result, [propName, storyPropValue]) => {
    if (EXCLUDED_PROPS.has(propName) || (0, _isUndefined.default)(storyPropValue)) {
      return result;
    }

    return { ...result,
      [propName]: storyPropValue
    };
  }, {});
}

function formatBasedOnDocgenInfo(propName, propValue, info, id) {
  const type = info.type;

  if (!type) {
    return propValue;
  }

  const typeName = type.name,
        typeRaw = type.raw,
        typeValue = type.value;

  if (typeRaw !== null && typeRaw !== void 0 && typeRaw.includes(INTL_MESSAGE_SHAPE_PROP_TYPE)) {
    return formatIntlProp(propName, propValue, id);
  }

  if (typeName === 'func') {
    return formatFunctionProp(propName);
  }

  if (typeName === 'shape' && typeValue !== null && typeValue !== void 0 && typeValue.raw) {
    return deepMapValues(propValue, formatCustomShapeProp(typeValue));
  }

  if (typeName === 'custom' && (0, _isPlainObject.default)(propValue)) {
    return deepMapValues(propValue, valuesMapper(id));
  }

  if ((typeValue === null || typeValue === void 0 ? void 0 : typeValue.raw) === AVAILABLE_VALUE_OBJECT_SHAPE_PROP_TYPE) {
    return formatAvailableValueProp(propValue);
  }

  if (typeName === 'arrayOf' && (0, _isArray.default)(propValue)) {
    const entryTypes = (typeValue === null || typeValue === void 0 ? void 0 : typeValue.value) || {};
    return propValue.map(entry => deepMapValues(mapObjectValuesToIntlMessages(entry, entryTypes, id), valuesMapper(id)));
  }

  return propValue;
}

const mapObjectValuesToIntlMessages = (entry, entryTypes, id) => Object.entries(entry).reduce((result, [key, value]) => {
  var _entryTypes$key, _entryTypes$key$raw;

  return (_entryTypes$key = entryTypes[key]) !== null && _entryTypes$key !== void 0 && (_entryTypes$key$raw = _entryTypes$key.raw) !== null && _entryTypes$key$raw !== void 0 && _entryTypes$key$raw.includes(INTL_MESSAGE_SHAPE_PROP_TYPE) && (0, _isString.default)(value) ? { ...result,
    [key]: intlMessage(value, id, key)
  } : { ...result,
    [key]: value
  };
}, {});

const valuesMapper = id => (propName, value) => {
  if (value instanceof Date) {
    return value.toJSON();
  }

  if (propName.toLowerCase().includes('classname') && value) {
    const hashedClassName = HASHED_CLASSNAME_REGEX.exec(value);

    if (hashedClassName) {
      const _hashedClassName = (0, _slicedToArray2.default)(hashedClassName, 2),
            cssClass = _hashedClassName[1];

      return cssClass;
    }

    return value;
  }

  if (propName.startsWith('on') || propName.startsWith('render') || typeof value === 'function') {
    return formatFunctionProp(propName);
  }

  if (INTL_PROPS.includes(propName) && (0, _isString.default)(value)) {
    return intlMessage(value, id, propName);
  }

  return value;
};

function formatMetadataProps(storyProps, defaultProps, docgenProps = {}, id) {
  const props = Object.entries(filterDefaultValues(filterExcludedProps(storyProps), defaultProps)).reduce((result, [propName, value]) => {
    const docgenInfo = docgenProps[propName];
    return { ...result,
      [propName]: docgenInfo ? formatBasedOnDocgenInfo(propName, value, docgenInfo, id) : value
    };
  }, {});
  return deepCleanupObject(deepMapValues(props, valuesMapper(id)));
}
//# sourceMappingURL=formatMetadataProps.js.map